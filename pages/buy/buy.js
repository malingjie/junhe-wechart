// pages/buy/buy.js
var http = require('../../utils/httpRequest.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    minusStatus: 'disable',
  },

  //事件处理函数
  /*点击减号*/
  bindMinus: function() {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
      allgoodsPrice: num * this.data.goodsPrice
    })
  },
  /*点击加号*/
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
      allgoodsPrice: num * this.data.goodsPrice
    })
  },
  /*输入框事件*/
  bindManual: function(e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
      allgoodsPrice: num * this.data.goodsPrice
    })
  },

  //获取用户输入单位名称
  getBuyerName: function (e) {
    this.setData({
      buyerName: e.detail.value
    })
  },
  //获取用户输入的收货人姓名
  getCompany: function(e) {
    this.setData({
      company: e.detail.value
    })
  },

  //获取用户输入的收货人手机号
  getBuyerNumber: function(e) {
    this.setData({
      buyerNumber: e.detail.value
    })
  },

  //获取用户输入的收货地址
  getBuyerAddress: function(e) {
    this.setData({
      buyerAddress: e.detail.value
    })
  },

  //微信支付
  goWechart: function(e) {
    let that = this
    if (that.data.buyerName && that.data.company && that.data.buyerNumber && that.data.buyerAddress) {
      if (that.data.buyerNumber.length == 11) {
        wx.showModal({
          title: '微信支付',
          content: '确定要使用微信支付？',
          showCancel: true, //是否显示取消按钮
          cancelText: "否", //默认是“取消”
          cancelColor: '#ff5f19', //取消文字的颜色
          confirmText: "是", //默认是“确定”
          confirmColor: '#ff5f19', //确定文字的颜色
          success: function(res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              wx.showLoading({
                title: '支付发起中...',
              })
              wx.login({
                success: function(res) {
                  console.log(res)
                  if (res.code) {
                    //发起网络请求
                    wx.request({
                      url: 'https://shop.junhesoft.com.cn/pay/getopenid',
                      // url: 'http://localhost:443/pay/getopenid',
                      method: 'GET',
                      data: {
                        js_code: res.code,
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      success(res) {
                        console.log(res)
                        let payData = {
                          phoneNumber: that.data.phoneNumber,
                          goodsCode: that.data.goodsCode,
                          goodsName: that.data.goodsName,
                          goodsNum: that.data.num,
                          company: that.data.company,
                          buyerName: that.data.buyerName,
                          buyerNumber: that.data.buyerNumber,
                          buyerAddress: that.data.buyerAddress,
                          open: res.data.openid
                        }
                        http.publicRequest('GET', '/pay/createUnifiedOrder', payData, function(res) {
                          {
                            // console.log("后端返回的结果")
                            // console.log(res.data.obj)
                            wx.requestPayment({
                              timeStamp: res.data.obj.timeStamp,
                              nonceStr: res.data.obj.nonceStr,
                              package: res.data.obj.package,
                              signType: 'MD5',
                              paySign: res.data.obj.paySign,
                              success: function(res) {
                                // success
                                wx.hideLoading()

                                console.log("统一下单接口成功");
                              },
                              fail: function(res) {
                                // fail
                                wx.hideLoading()
                                console.log("统一下单接口失败");
                              },
                              complete: function(res) {
                                // complete
                                console.log(res);
                                wx.navigateBack({

                                })
                              }
                            })
                          }
                        })
                      }
                    })

                  } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                  }
                }
              })
            }
          }
        })


      } else {
        wx.showToast({
          title: '请检查手机号格式!',
          icon: "none",
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '信息请填写完整!',
        icon: "none",
        duration: 2000
      })
    }

  },

  //公对公转账
  goPublic: function(e) {
    let that = this
    if (that.data.buyerName && that.data.company && that.data.buyerNumber && that.data.buyerAddress) {
      if (that.data.buyerNumber.length == 11) {

        wx.showModal({
          title: '生成公对公转账订单',
          content: '确定要生成公对公转账订单？',
          showCancel: true, //是否显示取消按钮
          cancelText: "否", //默认是“取消”
          cancelColor: '#ff5f19', //取消文字的颜色
          confirmText: "是", //默认是“确定”
          confirmColor: '#ff5f19', //确定文字的颜色
          success: function(res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              var order = {
                phoneNumber: that.data.phoneNumber,
                goodsCode: that.data.goodsCode,
                goodsName: that.data.goodsName,
                buyNum: that.data.num,
                goodsPrice: that.data.goodsPrice,
                company: that.data.company,
                buyerName: that.data.buyerName,
                buyerNumber: that.data.buyerNumber,
                buyerAddress: that.data.buyerAddress,
                allgoodsPrice: that.data.allgoodsPrice
              }
              http.publicRequest('GET', '/order/addorder', order, function(res) {
                {
                  if (res.statusCode == "400") {
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 5000
                    })
                  } else {
                    wx.showToast({
                      title: '生成公对公转账订单成功，请去我的-公对公转账专区查看!',
                      icon: "none",
                      duration: 5000
                    })
                    setTimeout(function() {
                      let phone = that.data.phoneNumber
                      wx.navigateTo({
                        url: '/pages/business_to_business/business_to_business?phoneNumber=' + phone,
                        success: function(res) {},
                        fail: function(res) {},
                        complete: function(res) {},
                      })
                      // wx.navigateBack({
                      // })
                    }, 3000)

                  }
                }
              }, function(err) {
                wx.showToast({
                  title: "生成公对公转账订单失败,请检查网络情况!",
                  icon: 'none',
                  duration: 4000
                })
              })


            }
          }
        })
      } else {
        wx.showToast({
          title: '请检查手机号格式!',
          icon: "none",
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '信息请填写完整!',
        icon: "none",
        duration: 2000
      })
    }
  },




  getOrderCode: function(event) {
    this.setData({
      txtOrderCode: event.detail.value
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var phonenumber = wx.getStorageSync("user").phoneNumber
    this.setData({
      phoneNumber: phonenumber,
      goodsCode: options.goodsCode,
      goodsName: options.goodsName,
      goodsPrice: options.goodsPrice,
      allgoodsPrice: options.goodsPrice
    })
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
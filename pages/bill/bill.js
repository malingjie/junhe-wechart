// pages/bill/bill.js
var http = require('../../utils/httpRequest.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数--获取发票抬头
   */
  getCompName: function (e) {
    this.setData({
      compName: e.detail.value
    })
  },

  /**
 * 自定义函数--获取发票抬头
 */
  getRealComp: function (e) {
    this.setData({
      realComp: e.detail.value
    })
  },

  /**
 * 自定义函数--获取税号
 */
  getTaxeCode: function (e) {
    this.setData({
      taxeCode: e.detail.value
    })
  },

//获取单位地址
  getCompAddr:function(e){
    this.setData({
      compAddr: e.detail.value
    })
  },

  /**
   * 自定义函数--获取电话号码
   */
  getConnectPhone: function (e) {
    this.setData({
      connectPhone: e.detail.value
    })
  },
  //获取开户银行
  getBank: function (e) {
    this.setData({
      bank: e.detail.value
    })
  },
  //获取银行账户
  getBankCode: function (e) {
    this.setData({
      bankCode: e.detail.value
    })
  },

    /**
     * 自定义函数--获取发票发送地址
     */
    getAddr: function (e) {
        this.setData({
            addr: e.detail.value
        })
    },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //返回选定照片的本地文件路径列表
        let src = res.tempFilePaths[0]
        that.setData({
          src: src
        })
      },
    })
  },
  /**
   * 自定义函数--发起纸质发票请求
   */
  getPaper: function (e) {
    console.log(e.data)
    this.setData({
      bill:{}
    })
    this.data.bill.compName = this.data.compName
    this.data.bill.realComp = this.data.realComp
    this.data.bill.taxeCode = this.data.taxeCode
    this.data.bill.compAddr = this.data.compAddr
    this.data.bill.connectPhone = this.data.connectPhone
    this.data.bill.bank = this.data.bank
    this.data.bill.bankCode = this.data.bankCode
    this.data.bill.subscribe = this.data.subscribe
    this.data.bill.orderNum = this.data.orderNum
    this.data.bill.phoneNumber = this.data.phoneNumber
      this.data.bill.billAddr = this.data.addr
    this.data.bill.billType = "纸质发票"
    let bill = this.data.bill
    console.log(bill)
    if (bill.compName && bill.connectPhone  && bill.realComp && bill.taxeCode && bill.billAddr && bill.compAddr && bill.bank && bill.bankCode && this.data.src){
      var filePath = this.data.src
      var name = 'src'
      wx.showModal({
        title: '选择发票类型',
        content: '确定要选择纸质发票？',
        showCancel: true,//是否显示取消按钮
        cancelText: "否",//默认是“取消”
          cancelColor: '#ff5f19',//取消文字的颜色
        confirmText: "是",//默认是“确定”
          confirmColor: '#ff5f19',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            http.publicRequest('POST', '/bill/addbill', bill, function (res) {
              if (res.statusCode == "500") {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
              else if (res.statusCode == "400") {
                wx.showToast({
                  title: "填写信息格式有误",
                  icon: 'none',
                  duration: 2000
                })
              }
              else {
                var formData = {
                  'orderNum': res.data.orderNum,
                }
                http.publicuploadFile('/bill/uploadsubscribe', filePath, name, formData, function (suc) {
                  console.log(suc)
                }, function (fail) {
                  wx.hideLoading()
                  wx.showToast({
                    icon: 'none',
                    title: `上传图片失败`,
                  });
                })
                wx.hideLoading()
                wx.navigateBack({})
                wx.showToast({
                  icon: 'none',
                  title: `请求申请成功`,
                });
              }
            },function(err){
              wx.showToast({
                title: "请求发票失败,请检查网络情况!",
                icon: 'none',
                duration: 4000
              })
            })
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
 

  }else{
      wx.showToast({
        title: '信息请填写完整!',
        icon: "none",
        duration: 2000
      }) 
  }
  },

  /**
   * 自定义函数--发起电子发票请求
   */
  getElec: function (e) {
    this.setData({
      bill: {}
    })
    this.data.bill.compName = this.data.compName
    this.data.bill.realComp = this.data.realComp
    this.data.bill.taxeCode = this.data.taxeCode
    this.data.bill.compAddr = this.data.compAddr
    this.data.bill.connectPhone = this.data.connectPhone
    this.data.bill.bank = this.data.bank
    this.data.bill.bankCode = this.data.bankCode
    this.data.bill.subscribe = this.data.subscribe
    this.data.bill.orderNum = this.data.orderNum
    this.data.bill.phoneNumber = this.data.phoneNumber
    this.data.bill.billAddr = this.data.addr
    this.data.bill.billType = "电子发票"
    let bill = this.data.bill
    let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    console.log(bill)
    if (bill.compName && bill.realComp && bill.taxeCode && bill.billAddr && this.data.src) {
          if (myreg.test(bill.billAddr)){
            var filePath = this.data.src
            var name = 'src'
      wx.showModal({
        title: '电子发票',
        content: '确定开票？',
        showCancel: true,//是否显示取消按钮
        cancelText: "否",//默认是“取消”
          cancelColor: '#ff5f19',//取消文字的颜色
        confirmText: "是",//默认是“确定”
          confirmColor: '#ff5f19',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            wx.showLoading({
              title: '正在发起发票请求...',
            })
            //点击确定
            http.publicRequest('POST', '/bill/addbill', bill, function (res) {
              if (res.statusCode == "500") {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
              else if (res.statusCode == "400") {
                wx.showToast({
                  title: "填写信息格式有误",
                  icon: 'none',
                  duration: 2000
                })
              }
              else {
                var formData = {
                  'orderNum': res.data.orderNum,
                }
                http.publicuploadFile('/bill/uploadsubscribe', filePath, name, formData, function (suc) {
                  console.log(suc)
                }, function (fail) {
                  wx.hideLoading()
                  wx.showToast({
                    icon: 'none',
                    title: `上传图片失败`,
                  });
                })
                wx.hideLoading()
                wx.navigateBack({})
                wx.showToast({
                  icon: 'none',
                  title: `请求申请成功`,
                });
              }
            }, function (err) {
              wx.showToast({
                title: "请求申请发票失败,请检查网络情况!",
                icon: 'none',
                duration: 4000
              })
            })
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
          } else {
              wx.showToast({
                  title: '请输入正确的邮箱格式!',
                  icon: "none",
                  duration: 2000
              })
           }
      }
     else {
      wx.showToast({
        title: '信息请填写完整!',
        icon: "none",
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let phone = wx.getStorageSync("user").phoneNumber
    console.log(options)
    that.setData({
      orderNum: options.orderNum,
      phoneNumber: phone
    })
    http.publicRequest('GET', '/order/queryorderbyordernum', { orderNum: that.data.orderNum }, function (res) {
      that.setData({
        order: res.data.order
      })
      console.log(that.data.order)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
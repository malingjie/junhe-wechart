// pages/business_to_business/business_to_business.js

var http = require('../../utils/httpRequest.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mtsrc: '/image/mt.png',
        dksrc: '/image/dk.png',
        sdsrc: '/image/Datacard.png'

    },

  // 自定义函数--点击进入订单详情
  goOrderDetail: function (e) {
    var id = e.currentTarget.dataset.id
    var orderNum = this.data.businessOrders[id].orderNum
    wx.navigateTo({
      url: '/pages/order_detail/order_detail?orderNum=' + orderNum,
    })

  },

  // 自定义函数--点击进入发票申请
  goBill: function (e) {
    var id = e.currentTarget.dataset.id
    var orderNum = this.data.businessOrders[id].orderNum
    wx.navigateTo({
      url: '/pages/bill/bill?orderNum=' + orderNum,
    })

  },

     /**
     * 自定义函数--上传申购单选择照片
     */
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
     * 自定义函数--上传申购单
     */
    uploadForm:function(e){
      let that = this
        let id = e.currentTarget.dataset.id
        let filePath = this.data.src
        let name = 'uploadForm'
        let formData ={
            'orderNum': this.data.businessOrders[id].orderNum
        }
        http.publicuploadFile('/order/uploadbusiness', filePath, name, formData, function (suc) {
            console.log(suc)
            wx.showToast({
                title: '上传申购单成功，请等待审核！',
                icon: "none",
                duration: 3500
            })
            setTimeout(function () {
              that.setData({
                src:'',
              })
              that.onPullDownRefresh()
            }, 3500)
        }, function (fail) {
            wx.hideLoading()
            wx.showToast({
                icon: 'none',
                title: `上传图片失败`,
            });
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        var phonenumber = options.phoneNumber;
        console.log(phonenumber)
        http.publicRequest('GET', '/order/querybusiness', { phoneNumber: phonenumber }, function (res) {
            console.log(res)
            var allinfo = res.data.businessOrders
            that.setData({
                businessOrders: allinfo,
            })
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
      let that = this
      var phonenumber = wx.getStorageSync("user").phoneNumber;
      console.log(phonenumber)
      http.publicRequest('GET', '/order/querybusiness', { phoneNumber: phonenumber }, function (res) {
        console.log(res)
        var allinfo = res.data.businessOrders
        that.setData({
          businessOrders: allinfo,
        })
      })
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
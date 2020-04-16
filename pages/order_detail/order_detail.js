// pages/order_detail/order_detail.js
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
  let orderNum = options.orderNum
    http.publicRequest('GET', '/order/queryorderbyordernum', { orderNum: orderNum }, function (res) {
      that.setData({
        order:res.data.order
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
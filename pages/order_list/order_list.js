// pages/order_list/order_list.js
var http = require('../../utils/httpRequest.js')
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mtsrc: '/image/mt.png',
    dksrc: '/image/dk.png',
    sdsrc: '/image/Datacard.png'
  },

  // 自定义函数--点击进入发票申请
  goBill: function (e) {
    var id = e.currentTarget.dataset.id
    var orderNum = this.data.orders[id].orderNum
    wx.navigateTo({
      url: '/pages/bill/bill?orderNum=' + orderNum,
    })

  },
  // 自定义函数--点击进入订单详情
  goOrderDetail: function (e) {
    var id = e.currentTarget.dataset.id
    var orderNum = this.data.orders[id].orderNum
    wx.navigateTo({
      url: '/pages/order_detail/order_detail?orderNum=' + orderNum,
    })

  },



  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = App.touch._touchstart(e, this.data.orders) //将修改过的list setData
    this.setData({
      orders: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = App.touch._touchmove(e, this.data.orders, 'id')//将修改过的list setData
    this.setData({
      orders: data
    })
  },

  //删除事件
  delBill: function(e){
    var id = e.currentTarget.dataset.id
    var orderNum = this.data.orders[id].orderNum
    wx.showModal({
      title: '删除订单',
      content: '确定删除该笔订单，一但删除无法恢复！',
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
          http.publicRequest('GET', '/order/deluserorder', { orderNum: orderNum }, function (res) {
            console.log(res)
          })
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var phonenumber = options.phoneNumber;
    console.log(phonenumber)
    http.publicRequest('GET', '/order/queryorder', {phoneNumber: phonenumber}, function (res) {
      console.log(res.data.orders)
      var allinfo = res.data.orders
      for (let i in allinfo){
        allinfo[i].isTouchMove=false
      }
      that.setData({
        orders: allinfo,
      })
    })
   console.log(that.data.orders)
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
  onPullDownRefresh: function (options) {
    let that = this
    var phonenumber = wx.getStorageSync("user").phoneNumber;
    console.log(phonenumber)
    http.publicRequest('GET', '/order/queryorder', { phoneNumber: phonenumber }, function (res) {
      console.log(res.data.orders)
      var allinfo = res.data.orders
      for (let i in allinfo) {
        allinfo[i].isTouchMove = false
      }
      that.setData({
        orders: allinfo,
      })
      wx.stopPullDownRefresh()
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
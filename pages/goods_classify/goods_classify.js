// pages/goods_classify/goods_classify.js
var http = require('../../utils/httpRequest.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mtsrc: '/image/mt.png',
    dksrc: '/image/dk.png',
    sdsrc: '/image/Datacard.png',
    goods:[]
  },

// 跳转到详细商品页面
  goToDetail:function(e){
    var id = e.currentTarget.dataset.id
    var info = this.data.goods[id]
    wx.navigateTo({
      url: '/pages/good_detail/good_detail?id=' + info.id + '&goodsCode=' + info.goodsCode + '&goodsName=' + info.goodsName + '&goodsPrice=' + info.goodsPrice + '&goodsArea=' + info.goodsArea + '&areaCode=' + info.areaCode + '&goodsNum=' + info.goodsNum + '&goodsSend=' + info.goodsSend,
    })
  },

  // 跳转到色带详细商品页面
  goToSDDetail: function (e) {
 console.log(e)
 wx.navigateTo({
   url: '/pages/good_detail_sd/good_detail_sd?id=' + e.currentTarget.dataset.id + '&price=' + e.currentTarget.dataset.price+'&code=' + e.currentTarget.dataset.code,
 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
// 接受首页传过来的值
this.setData({
  type: options.class
})
var user = wx.getStorageSync('user')
    var goodsarea = user.region
    goodsarea = goodsarea.split("市")[0]+"市"
      // goodsarea = goodsarea.match(/(\S*)?市/)[1]+"市";
// console.log(goodsarea)
    http.publicRequest('GET', '/goods/findgoods', {goodsArea: goodsarea},function(res){
      that.setData({
        goods: res.data.goods
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
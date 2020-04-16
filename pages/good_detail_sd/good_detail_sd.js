// pages/good_detail_sd/good_detail_sd.js
var http = require('../../utils/httpRequest.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sdscr: '/image/Datacard.png',
    sdimg:[
   '/image/sd1.png',
   '/image/sd2.png',
   '/image/sd3.png'
    ],
    nullHouse:"false",
    SD1: [{
      specificationItem: '品牌名称',
      specificationInfo: 'Datacard CD800彩色带'
    }, {
      specificationItem: '色带编号',
      specificationInfo: '535000-003'
    }, {
      specificationItem: '产品规格',
      specificationInfo: '500张1卷'
    }, {
      specificationItem: '产品清单',
      specificationInfo: ' 彩色带1卷，清洁轮1个，清洁卡1张'
    }],
    SD2: [{
      specificationItem: '品牌名称',
      specificationInfo: 'Datacard CD800彩色带'
    }, {
      specificationItem: '色带编号',
      specificationInfo: '535000-004'
    }, {
      specificationItem: '产品规格',
      specificationInfo: '650张1卷'
    }, {
      specificationItem: '产品清单',
      specificationInfo: ' 彩色带1卷，清洁轮1个，清洁卡1张'
    }]
  },
// 自定义函数--点击图片显示大图
  // previewImg: function (e) {
  //   console.log(e.currentTarget.dataset.index);
  //   var index = e.currentTarget.dataset.index;
  //   var sdimg = this.data.sdimg;
  //   wx.previewImage({
  //     current: sdimg[index],     //当前图片地址
  //     urls: sdimg,               //所有要预览的图片的地址集合 数组形式
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  /**
   * 自定义函数--点击规格
   */
  clickArea: function (option) {
    let that = this
    that.setData({
      nullHouse: false
    })
  },

  /**
    * 自定义函数--点击关闭弹框
    */
  closeToast: function (options) {
    let that = this
    that.setData({
      nullHouse: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this
    console.log(e)
     var good = e.id
    var goodsCode = e.code
    http.publicRequest('GET','/goods/getgoods',{goodsName:good},function(res){
      console.log(res)
      that.setData({
        price:res.data.goods.goodsPrice
      })
    })
     that.setData({
       good:good,
       goodsCode: goodsCode
     })
  },

  /**
 * 自定义函数--点击购买按钮
 */
  onBuy: function (options) {
    wx.navigateTo({
      url: '/pages/buy/buy?goodsCode=' + this.data.goodsCode + '&goodsName=' + this.data.good + '&goodsPrice=' + this.data.price
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
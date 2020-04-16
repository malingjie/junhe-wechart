var http = require('../../utils/httpRequest.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数--登录
   */
  onSubmit: function(e) {
    var that = this
    console.log(e.detail.value)
    var subinfo = e.detail.value
    if (subinfo.phoneNumber && subinfo.password){
      http.publicRequest('GET', '/test/checkuser', { phoneNumber: subinfo.phoneNumber, password: subinfo.password }, function (res) {
        if (res.statusCode == "500") {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else {
          console.log(res.data)
          let user = res.data.user
          wx.setStorageSync("user", user)
          wx.navigateBack({})
        }
      },function (err) {
        wx.showToast({
          title: "登录失败,请检查网络情况!",
          icon: 'none',
          duration: 4000
        })
      })
    }else{
      wx.showToast({
        title: "手机号或密码不能为空!",
        icon: 'none',
        duration: 2000
      })
    }

  },
  
  // 进入注册界面
  goToRegist: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  logOut: function () {
    wx.clearStorage();
    this.setData({
      isLogin: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
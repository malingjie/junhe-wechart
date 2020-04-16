
// pages/wode/wode.js
var app = getApp();
Page({
  data: {
    userImg: "../../image/my.jpg",
    imgHeight: "80px",
    imgWidth: "80px",
    marginAuto: "0 auto",
    displayBlock: "block",
    borderCircle: "50%",
    userName: "xf_4072025",
    userOoperation1: [{
      "imgUrl": "../../image/m2.png",
      "text": "我的订单"
    }
    ],
    userOoperation2: [{
      "imgUrl": "../../image/m16.png",
      "text": "客服中心"
    }
    ]
  },


  showUser:function(e){
    wx.navigateTo({
      url: '/pages/wode/myinfo',
    })
  },

  //微信支付列表

  myOrder: function (e) {
    var phoneNumber = wx.getStorageSync("user").phoneNumber;
    wx.navigateTo({
      url: '/pages/order_list/order_list?phoneNumber=' + phoneNumber,
    })
  },

  //进入公对公转账专区
  publicOrder: function (e) {
    var phoneNumber = wx.getStorageSync("user").phoneNumber;
    wx.navigateTo({
      url: '/pages/business_to_business/business_to_business?phoneNumber=' + phoneNumber,
    })
  },

  // 进入登录界面
  getMyInfo: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 进入注册界面
  goToRegist: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  logOut: function () {
    let that = this
    wx.showModal({
      title: '注销',
      content: '确定退出当前账号登录？',
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

          wx.clearStorage();
          that.setData({
            loginStatus: 0
          });
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })

  },

  //拨打电话
  bindMakePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '0791-88191700'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let info = wx.getStorageSync('user')
    console.log(info)
    this.setData({
      userName: info.phoneNumber,
      loginStatus: info.loginStatus
    })
  },
})
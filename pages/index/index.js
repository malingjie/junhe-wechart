Page({   
    data: {
    imgUrls: [
      '/image/index.png',
      '/image/dk.png',
      '/image/mt.png',
      '/image/Datacard.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    imgs: [
      {
        id:1,
        src: '/image/mt.png',
        info: '读卡器专区'
      },
      {
        id:2,
        src: '/image/Datacard.png',
        info: 'Datacard色带专区'
      }
    ]
  },
  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  /**
   * 自定义--跳转商品详情页
   */
  goToDetail: function(e) {
    var id = e.currentTarget.dataset.id
    var sendInfo = this.data.imgs[id].info
    let info = wx.getStorageSync('user')
    console.log(sendInfo)
    if (info.loginStatus=="1") {
      wx.navigateTo({
        url: '/pages/goods_classify/goods_classify?class=' + sendInfo,
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  onLoad:function(){
  },
  onShow:function(){
    let info = wx.getStorageSync('user')
    if(info){
      console.log(info)
      this.setData({
        region: info.region
      })
    }else{
      this.setData({
        region: '未登录，请先登录'
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})

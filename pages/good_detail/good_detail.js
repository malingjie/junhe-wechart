// pages/good_detail/good_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mtsrc: '/image/mt.png',
    dksrc: '/image/dk.png',
    info: '德卡T6智能卡读卡器',
    price: '600',
    nullHouse: 'true',
    T6:[{
      specificationItem:'产品名称',
      specificationInfo:'T6型接触式IC卡读写机'
    }, {
        specificationItem: '工作环境',
        specificationInfo: '工作温度：-10～50ºC；相对湿度：5%～93%，无冷凝'
      }, {
        specificationItem: '存储环境',
        specificationInfo: '工作温度：-20～60ºC；相对湿度：5%～95%，无冷凝'
      }, {
        specificationItem: '非接触卡（选配）',
        specificationInfo: ' 支持 ISO14443 Type A / B 标准感应 IC 卡  支持刷运营商 13.56MHz 手机支付'
      }, {
        specificationItem: '供卡电流',
        specificationInfo: ' 0～70mA'
      }, {
        specificationItem: '接触式卡',
        specificationInfo: ' 支持符合 ISO7816 标准的接触式 IC 卡，卡座插拔卡寿命至少 20 万次'
      }, {
        specificationItem: 'SAM 卡座 ',
        specificationInfo: '可选配 1～2 个符合 GSM 11.11 的 Sim 卡的卡尺寸 SAM 卡座'
      }, {
        specificationItem: '存储容量',
        specificationInfo: ' 选配 16M、32M、64M 或定制'
      }, {
        specificationItem: '加密功能',
        specificationInfo: ' 可选配'
      },  {
        specificationItem: '通讯方式 ',
        specificationInfo: '支持 USB、RS232'
      }, {
        specificationItem: '电 源',
        specificationInfo: 'DC 5V，带过压保护'
      }, {
        specificationItem: '连接电缆 ',
        specificationInfo: '附 1.5 米长的连接通讯线'
      }, {
        specificationItem: '指 示 灯 ',
        specificationInfo: '可选配 2 个或 4 个 LED 指示灯，指示电源或通讯状态'
      }, {
        specificationItem: '产品名称',
        specificationInfo: 'T6型接触式IC卡读写机'
      }, {
        specificationItem: '蜂 鸣 器 ',
        specificationInfo: '支持'
      }, {
        specificationItem: '外观颜色 ',
        specificationInfo: '通用如图'
      }, {
        specificationItem: '外形规格 ',
        specificationInfo: '140mm×83mm×60m'
      }, {
        specificationItem: '重 量 ',
        specificationInfo: '350g'
      }, {
        specificationItem: '操作系统 ',
        specificationInfo: 'Windows、Unix 和 Linux'
      }, {
        specificationItem: '遵循标准 ',
        specificationInfo: 'ISO 14443、ISO 15693、ISO 7816、PC/SC、GSM11.11、FCC、CE'
      }, {
        specificationItem: '其他特性',
        specificationInfo: ' 提供通用接口函数库，可支持多种操作系统和语言开发平台; 支持在线升级; 提供如 CSP、PKCS#11 等中间件的开发定制; 提供如 Windows Login 及 VPN 等安全软件应用定制 '
      }],
      MT3:[{
        specificationItem: '项目内容',
        specificationInfo: '技术规格参数'
      }, {
          specificationItem: '读写器尺寸 ',
          specificationInfo: '110mm×85mm×60mm'
        }, {
          specificationItem: '电压',
          specificationInfo: '5V'
        }, {
          specificationItem: '取电方式',
          specificationInfo: 'USB 取电'
        }, {
          specificationItem: '电流',
          specificationInfo: '不大于 300mA'
        }, {
          specificationItem: '连接线',
          specificationInfo: '不小于 1.5 米'
        }, {
          specificationItem: '通讯接口',
          specificationInfo: '标准 USB 接口'
        }, {
          specificationItem: '通讯速率',
          specificationInfo: 'USB 全速 12Mbps'
        }, {
          specificationItem: '支持卡片标准',
          specificationInfo: '符合 ISO7816 标准的 A 类 5V/B 类 3V/C 类 1.8V 卡'
        }, {
          specificationItem: '卡读写速度',
          specificationInfo: '9600～115200bps'
        }, {
          specificationItem: '卡座触点',
          specificationInfo: '8 个，有卡到位信息。所有触点都带有短路保护，还有过流保护，最大程度保护读写器和卡片'
        }, {
          specificationItem: '卡座寿命',
          specificationInfo: '不小于 10 万次'
        }, {
          specificationItem: 'SAM卡座数量',
          specificationInfo: '3 个'
        }, {
          specificationItem: '支持卡类型',
          specificationInfo: '符合 ISO7816 标准的 PSAM 卡'
        }, {
          specificationItem: '外接密码键盘连接方式',
          specificationInfo: '密码键盘通过 PS/2 接口与读写器连接，可拆卸'
        }, {
          specificationItem: '线材长度',
          specificationInfo: '1.5 米'
        }, {
          specificationItem: '语音提示',
          specificationInfo: '支持 2 条语音提示，“请输入密码”，“请再次输入密码”'
        }, {
          specificationItem: '键盘',
          specificationInfo: '15 个按键，其中包括 10 个数字键，2 个功能键，3 个预留功能键'
        }, {
          specificationItem: '指示灯',
          specificationInfo: '3 个指示灯，其中一个红色指示灯提示电源状态，两个绿色指示灯分别表示卡到位与通讯状态'
        }, {
          specificationItem: '蜂鸣',
          specificationInfo: '单调音'
        }, {
          specificationItem: 'EEPROM',
          specificationInfo: '支持 200 字节数据读写'
        }, {
          specificationItem: '硬件版本号',
          specificationInfo: '支持'
        }, {
          specificationItem: '产品序列号',
          specificationInfo: '支持'
        }, {
          specificationItem: '支持系统',
          specificationInfo: 'Window2000/NT/Vista/Win7/Linux/Android'
        }, {
          specificationItem: '工作温度',
          specificationInfo: '0°C~60°C'
        }, {
          specificationItem: '工作湿度',
          specificationInfo: '10%~90%'
        }, {
          specificationItem: '驱动',
          specificationInfo: '无驱'
        }, {
          specificationItem: 'API',
          specificationInfo: '标准 Windows32 位动态库，Linux/Android 开发接口'
        }, {
          specificationItem: '配套服务',
          specificationInfo: '提供开发包，包括产品接口动态库、演示例程及帮助文档'
        }]
  },

  /**
   * 自定义函数--点击出现弹框
   */
  clickArea: function(options) {
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
 * 自定义函数--点击购买按钮
 */
  onBuy: function (options) {
 wx.navigateTo({
   url: '/pages/buy/buy?goodsCode=' + this.data.goodsCode + '&goodsName=' + this.data.info + '&goodsPrice=' + this.data.price
 })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
var goods = options
this.setData({
  goodsCode:goods.goodsCode,
  info: goods.goodsName,
  price: goods.goodsPrice
})
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
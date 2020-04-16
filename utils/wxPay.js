var http = require('./httpRequest.js');

//调起支付接口
export function wxPay(httpData, sucFunc, failFunc) {
  let _self = this;
  wx.showToast({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    message: "支付正在调起,请稍候···",
    loadingType: 'spinner',
    selector: '#custom-selector'
  });
  let url = URL.PAY_PARAMS;
  console.log(httpData.formId)
  let data = {
    // formId: httpData.formId,
    orderNo: httpData.orderNo,
    amount: httpData.totalMoney,
    appId: httpData.appId,
  }
  let urlData = {
    memberId: wx.getStorageSync("id"),
    shopId: httpData.shopId,
  }
  url = http.replaceData(urlData, url);
  http.publicRequest("POST", url, data, function (suc) {
    Toast.clear();
    let result = suc.data.data;
    if (!result) {
      return false;
    }
    var timer = setInterval(function () {
      let pay_url = URL.PAY_CHECK;
      let pay_urlData = {
        memberId: wx.getStorageSync("id"),
        shopId: httpData.shopId,
        outTradeCode: result.outTradeNo
      }
      pay_url = http.replaceData(pay_urlData, pay_url);
      http.publicRequest("GET", pay_url, "", function (pay_suc) {
        if (pay_suc.data.data.resultState == 1) {
          clearInterval(timer);
          sucFunc()
        }

      }, function (err) {

      })
    }, 500);
    wx.requestPayment({
      'timeStamp': result.timestamp,
      'nonceStr': result.noncestr,
      'package': result.miniPackage,
      'signType': result.signType,
      'paySign': result.paySign,
      'success': function (res) {
        if (res.errMsg.split(":")[1] == 'ok') {
          let arg = {
            payState: "SUCCESS",
            outTradeNo: result.outTradeNo
          };
          // _self.payback(arg, httpData, function (datas) {
          //   sucFunc(datas)
          // });
        }
      },
      'fail': function (res) {
        clearInterval(timer);
        failFunc();
      },
      'complete': function (res) { }
    })
  },
    function (err) {
      failFunc();
      Toast.clear();
    })
}
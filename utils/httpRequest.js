// let errorCode = require("./errorCode.js")

let path = {
    //服务器地址
    test: 'https://shop.junhesoft.com.cn',
    //本地测试地址
    // test: 'http://localhost:4434',
}
// 普通http请求
export function publicRequest(method, url, data, success, fail, msg) {
  console.log(data);
  wx.request({
    method: method,
    url: url.indexOf('http') < 0 ? path.test + url : url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
         success(res)
    },
    fail: function (res) {
      fail(res)
    }

  })
}
// 上传文件请求
export function publicuploadFile(url, filePath, name, formData, success, fail) {
  wx.uploadFile({
    url: url.indexOf('http') < 0 ? path.test + url : url,
    filePath: filePath,
    name:name,
    formData: formData,
    success: function (res) {
        success(res)
    },
    fail: function (res) {
        fail(res)
    }

  })
}




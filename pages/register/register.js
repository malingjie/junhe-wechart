var http = require('../../utils/httpRequest.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['营业执照', '医疗、药品许可证'],
        index: 0,
        region: ['江西省', '南昌市', '青山湖区'],
        customItem: '全部',
        src: ''
    },
    // 更换选择地区响应
    bindRegionChange: function (e) {
        this.setData({
            region: e.detail.value
        })
    },
    // 更换上传照片类型响应
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value,
            src: ''
        })
    },
    chooseImage1: function () {
        var that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                //返回选定照片的本地文件路径列表
                let src1 = res.tempFilePaths[0]
                that.setData({
                    src: src1
                })
            },
        })
    },
    chooseImage2: function () {
        var that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                //返回选定照片的本地文件路径列表
                let src2 = res.tempFilePaths[0]
                that.setData({
                    src: src2
                })
            },
        })
    },
    //注册信息提交
    onSubmit: function (e) {
        wx.showLoading({
            title: '正在注册信息...',
        })
        var user = e.detail.value
        user.region = this.data.region[1] + this.data.region[2]
        if (this.data.index == 0) {
            user.license = "1"
            user.medicalCard = "0"
        } else if (this.data.index == 1) {
            user.license = "0"
            user.medicalCard = "1"
        }
        if (user.username && user.phoneNumber && user.password && user.region && user.compName && this.data.src) {
            if (user.phoneNumber.length == 11) {
                console.log(this.data.src)
                var filePath = this.data.src
                var name = 'src'

                http.publicRequest('POST', '/test/adduser', user, function (res) {
                    console.log(user)
                    if (res.statusCode == "500") {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 2000
                        })
                    } else if (res.statusCode == "400") {
                        wx.showToast({
                            title: "填写信息格式有误",
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        var formData = {
                            'userPhoneNumber': res.data.userPhoneNumber,
                            'license': res.data.license,
                            'medicalCard': res.data.medicalCard
                        }
                        http.publicuploadFile('/test/upload', filePath, name, formData, function (suc) {
                            console.log(suc)
                        }, function (fail) {
                            wx.hideLoading()
                            wx.showToast({
                                icon: 'none',
                                title: `上传图片失败`,
                            });
                        })
                        wx.hideLoading()
                        wx.navigateBack({})
                        wx.showToast({
                            icon: 'none',
                            title: `注册成功`,
                        });
                    }
                }, function (err) {
                    wx.hideLoading()
                    wx.showToast({
                        title: "注册失败,请检查网络情况!",
                        icon: 'none',
                        duration: 4000
                    })
                })
            } else {
                wx.showToast({
                    title: '请检查手机号格式!',
                    icon: "none",
                    duration: 2000
                })
            }
        } else {
            wx.showToast({
                title: '信息请填写完整!',
                icon: "none",
                duration: 2000
            })
        }


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
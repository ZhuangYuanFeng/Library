//app.js
App({
  config: {
    host: 'campusdaily.club'
  },
  onLaunch: function () {
    // 登录
    var that = this;
    wx.login({
      success: function (res) {
        console.log("app.js login")
        if (res.code) {
          //发起请求，得到openid
          wx.request({
            url: 'https://campusdaily.club/sessionkey',
            data: {
              appid: 'wx6aac7f50af859acf',
              secret: '2c504527ee556f56d5c194994015ceac',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log("app get openid :",res.data.openid);
              that.globalData.openid = res.data.openid;
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success(res){
              console.log("scop:",res.errMsg)
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfo = res.userInfo
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null
  }
})
// login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid:{}
    // avatarUrl:{}
  },
  login(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        openid: app.globalData.openid
      })
      var userinfo = app.globalData.userInfo;
      var openid = app.globalData.openid;
      console.log(openid)
      var that = this;
      let requestTask = wx.request({
        url: 'https://campusdaily.club/data',
        method: 'GET',
        data: {
          //微信提供的数据，昵称
          nickName: userinfo.nickName,
          avatarUrl: userinfo.avatarUrl,
          openid: openid
        },
        complete: function () { 
          console.log('end!');
          requestTask.abort();
        }
      })
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      wx.showToast({
        title: '登录失败！',
        icon: 'fail',
        duration: 2000
      })
    }
    // requestTask.abort();
  }
})
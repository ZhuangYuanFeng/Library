//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    openid:'',
    hasUserInfo: true,
    bookInfo: [],
    borrow: [
      { id: 0, bookname: "天翻夜谈", state: "借阅中" },
      { id: 1, bookname: "达芬奇的密码", state: "借阅中" },
      { id: 2, bookname: "奥特曼大全", state: "借阅中" },
      { id: 3, bookname: "蜡笔小新", state: "借阅中" }
    ],
    turnback:[],
    b_img:'../imgs/logo.png'
  },
  //事件处理函数

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        openid: app.globalData.openid,
        hasUserInfo: true
      })
      var openid = app.globalData.openid;
      console.log(openid)
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    this.getLogs();
    this.login();
  },
  onShow(){
    this.getLogs();
  },
  getUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  returnBook(event){
    var that = this;
    console.log(event.target.dataset.bookname);
    var bookid = event.target.dataset.bookid;
    wx.showModal({
      title: '注意',
      content: '是否要归还:' + event.target.dataset.bookname,
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
          wx.request({
            url: 'https://campusdaily.club/rbook',
            data: {
              openid: that.data.openid,
              bookid: bookid
            },
            success() {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail() {
              wx.showToast({
                title: '失败',
                icon: 'fail',
                duration: 2000
              })
            }
          });
        } else if (res.cancel) {
          console.log('取消')
        }
        that.getLogs();
      }
    })   
  },
  getLogs(){
    var that = this;
    wx.request({
      url: 'https://campusdaily.club/logs',
      data:{
        openid: app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        console.log('logs:',res.data.suc)
        var center = res.data.suc;
        that.setData({
          borrow : center
        })
        
      },
      fail: function () {
        console.log('defeat!')
      },
      complete: function () {
        console.log('sql end!');

      }
    })
  },
  login() {
    console.log("try Login");
    var that = this;
    if (app.globalData.openid) {
      var userinfo = that.data.userInfo;
      var openid = that.openid;
      console.log(openid);
      wx.request({
        url: 'https://campusdaily.club/data',
        method: 'GET',
        data: {
          //微信提供的数据，昵称
          nickName: userinfo.nickName,
          avatarUrl: userinfo.avatarUrl,
          openid: openid
        }
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
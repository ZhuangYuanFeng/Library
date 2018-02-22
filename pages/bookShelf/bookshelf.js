//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    openid:'',
    hasUserInfo: true,
    bookInfo: [],
    borrow: [],
    turnback:[],
    checkbook:[],
    btnShow:false,
    b_img:'../imgs/logo.png'
  },
  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
    wx.showNavigationBarLoading()
    this.getLogs()
    if(this.data.borrow != null){
      wx.showToast({
        title: '刷新成功',
        duration:2000,
        complete(){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      })
    }else{
      wx.showToast({
        title: '刷新失败',
        duration:2000,
        complete(){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      })
    }
  },
  //事件处理函数
  onLoad: function () {
    var b_userinfo = app.globalData.userInfo;
    console.log("b_userinfo",app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        openid: app.globalData.openid,
        hasUserInfo: true
      })
      var openid = app.globalData.openid;
      console.log("bookshelf:id",openid)
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    this.login();
    this.getattendant();
    // this.getLogs();
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
// 还书功能
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
  // 获取书籍关于审核
  getbook(){
    var that = this;
    wx.request({
      url: 'https://campusdaily.club/sql',
      method:'GET',
      success(res){
        console.log("get bookat",res)
        var dt = res.data.data;
        that.setData({
          checkbook:dt
        })
      },
      fail: function () {
        console.log('defeat!')
      }
    })
  },
// 获取用户书籍操作记录
  getLogs(){
    var that = this;
    wx.request({
      url: 'https://campusdaily.club/logs',
      data:{
        openid: that.data.openid
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
      }
    })
  },
// 用户注册
  login() {
    console.log("try Login");
    var that = this;
    if (that.data.openid) {
      var userinfo = that.data.userInfo;
      var openid = that.data.openid;
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
  },
  //得到用户是否属于管理员
  getattendant() {
    var that = this;
    wx.request({
      url: 'https://campusdaily.club/users',
      data: {
        openid: that.data.openid
      },
      method: 'GET',
      success: function (res) {
        console.log("是不是管理员",res.data[0].attendant)
        var judge = res.data[0].attendant;
        that.setData({
          btnShow: judge
        })
      },
      fail: function () {
        console.log('defeat!')
      }
    })
  },
  //审核通过
  passBook(event) {
    var that = this;
    console.log(event.target.dataset.bookname);
    var bookid = event.target.dataset.bookid;
    wx.showModal({
      title: '注意',
      content: '管理员是否允许:' + event.target.dataset.bookname+'通过审核',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
          wx.request({
            url: 'https://campusdaily.club/passbook',
            data: {
              // openid: that.data.openid,
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
        that.getbook();
      }
    })
  },
})
// bookpage.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname:"老人与海",
    bookauthor:"yuanf",
    bookintro:"none",
    bookimg:"",
    bookid:"",
    openid:"",
    handing:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookname = options.bookname;
    let bookauthor = options.bookauthor;
    let bookimg = options.bookimg;
    let bookintro = options.bookintro;
    let bookid = options.bookid;
    let handing = options.handing;
    console.log('这是获取地址值:',bookname, bookauthor, bookimg, bookid, bookintro,handing);
    this.setData({
      bookname: bookname,
      bookauthor: bookauthor,
      bookimg: bookimg,
      bookintro: bookintro,
      bookid: bookid,
      handing:handing
    })
    
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
    // console.log(value);
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
  
  },
  back(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  borrowBook(event){
    let that = this;
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    wx.showModal({
      title: '注意',
      content: '请确认是否借阅',
      success(res){
        if (res.confirm) {
          wx.request({
            url: 'https://campusdaily.club/borrow',
            method: 'GET',
            data: {
              bookid: that.data.bookid,
              openid: that.data.openid,
              handing: that.data.handing,
              bookname: that.data.bookname
            },
            success: function (res) {
              console.log('handing', res.data.handing);
              that.setData({
                handing: 1
              })
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
    console.log(event.target);
  }
})
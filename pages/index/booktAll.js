// booktAll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookkind:["古典名著","现代文学","技术资料","各种杂志"],
    booktype:'',
    bookinfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let booktype = options.booktype;
    console.log(booktype);
    this.setData({
      booktype: booktype
    })
    this.getData();
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
      this.getData();
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
  getData(){
    var that = this;
    wx.request({
      url: 'https://campusdaily.club/sql',
      success: function (res) {
        var dt = res.data.data;
        console.log('data', dt);
        that.setData({
          bookinfo: dt
        })
      },
      complete: function () {
        console.log('bookll sql end!');
      }
    })
  },
  getmes: function (e) {
    // var index = parseInt(e.currentTarget.dataset.index);
    let item = e.currentTarget.dataset.item
    console.log("get:", item);
    wx.navigateTo({
      // url: '../bookpage/bookpage?item='+JSON.stringify(item)
      url: '../bookpage/bookpage?bookname=' +
      item.bookname + '&bookauthor=' +
      item.bookauthor + '&bookimg=' +
      item.bookimg + '&bookid=' +
      item.bookid + '&booktype=' +
      item.booktype + '&bookintro=' +
      item.bookintro + '&handing=' +
      item.handing
  })
}
})
//index.js
//获取应用实例

Page({
  data: {
    userInfo: {},
    bookinfo:[],
    classicalbook:[],
    modernbook:[],
    techbook:[],
    magazine:[],
    handing:null,
    navli:[
      {name:"古典名著"} ,
      {name:"现代文学"} ,
      {name:"技术资料"} ,
      {name:"各种杂志"} 
    ]
  },
  
  onLoad: function () {
    this.getData();
  },
  onShow: function () {
    this.getData();
    console.log('show oh!!');
  },
  onHide(){

  },
  getData() {
    var that = this;
    wx.request({
      url: 'https://campusdaily.club/sql',
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data.data);
        var dt = res.data.data;
        //分类书籍
        var classicalbook = [];
        var modernbook = [];
        var techbook = [];
        var magazine = [];
        console.log('onload data', dt);
        for (let i = 0; i < dt.length; i++) {
          if (dt[i].booktype == 0) {
            classicalbook.push(dt[i]);
          } else if (dt[i].booktype == 1) {
            modernbook.push(dt[i]);
          } else if (dt[i].booktype == 2) {
            techbook.push(dt[i]);
          } else if (dt[i].booktype == 3) {
            magazine.push(dt[i]);
          }
        }
        that.setData({
          bookinfo: dt,
          classicalbook: classicalbook,
          modernbook: modernbook,
          techbook: techbook,
          magazine: magazine
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
  getUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getmes:function(e){
    let item = e.currentTarget.dataset.item
    console.log("get:", item);
    wx.navigateTo({
      url: '../bookpage/bookpage?bookname=' + 
      item.bookname + '&bookauthor=' + 
      item.bookauthor + '&bookimg=' + 
      item.bookimg + '&bookid=' +
      item.bookid + '&booktype=' + 
      item.booktype +'&bookintro=' + 
      item.bookintro +'&handing='+
      item.handing
    })
  },
  navbtn:function(e){
    let item = e.currentTarget.dataset.index;
    console.log("index",item);
    wx.navigateTo({
      url: '../index/booktAll?booktype='+item
    })

  }
 

})
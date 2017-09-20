// addBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookmes:[
      { pic:"../imgs/update.jpg", name:"岛上书店", author:"猫咪不会叫", introduce:"这是一本神奇的书，然后没有了,哔哩哔哩巴拉巴拉。"}
    ],
    // imgURL:"../imgs/update.jpg"
    imgURL:"",
    booktype:[
      {name:'0',value:'古典文学'},
      {name:'1',value:'现代文学'},
      {name:'2',value:'技术资料'},
      {name:'3',value:'各种杂志'}
    ],
    imgname:'',
    up_type:'',
    up_name:'',
    up_author:'',
    up_intro:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },

  // 上传图片，返回图片名
  upload(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgURL: tempFilePaths
        })
        wx.uploadFile({
          url: 'https://campusdaily.club/bookinfo', 
          filePath: tempFilePaths[0],
          name: 'image',
          header: {
            'content-type': 'multipart/form-data'
          }, 
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data;
            console.log(data);
            that.setData({
              imgname: res.data
            })
          }
        })
      }
    })
  },
  //提交表单
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var bookinfo = e.detail.value;
    var that = this;
    if (that.data.imgURL == ""){
      wx.showToast({
        title: '要上传图片哦',
        icon:'loading',
        duration:2000
      });
    } else if (bookinfo.typevalue == "" || bookinfo.bookname == "" || bookinfo.author == "" || bookinfo.intro == ""){
      wx.showToast({
        title: '表单必须要填写完毕',
        icon: 'loading',
        // duration: 2000
      });
    }else{
      wx.showModal({
        title: '注意',
        content: '书籍上传后，需要等待管理员通过审核，请耐心等待！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'https://campusdaily.club/addbook',
              method: 'POST',
              data: {
                bookimg: "https://campusdaily.club/images/" + that.data.imgname,
                bookinfo: bookinfo
              },
              success(res) {
                console.log("hahahah")
                wx.showToast({
                  title: '上传成功，请等待审核...',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  imgURL: ''
                })
              },
              fail(res){
                
              }
            })
            wx.switchTab({
              url: '../index/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } 
  },

})
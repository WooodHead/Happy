// pages/dynamic/index.js
const app = getApp()
const qiniuUploader = require("../../utils/qiniuUploader");
// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华北区
    uptokenURL: 'https://www.gaobinzhan.com/img/Qiniu.php',
    // uptoken: 'xxx',
    domain: 'http://cdn.qiniu.gaobinzhan.com',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Location:[],
    Content:'',
    ImgUrl:[]
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

  },
  /**
   * ImgAdd
   * 添加图片
   */
  ImgAdd(){
    var self = this
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        self.Qiniu(tempFilePaths[0])
      }
    })
  },
  /**
   * ImgDel
   */
  ImgDel(e) {
    var temp = this.data.ImgUrl
    temp.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      ImgUrl:temp
    })
  },
  /**
   * previewImage
   */
  // previewImage(e){
  //   var self = this
  //   wx.previewImage({
  //     current: e.currentTarget.dataset.url, // 当前显示图片的http链接
  //     urls: this.data.Img // 需要预览的图片http链接列表
  //   })
  // },
  /**
   * Location
   */
  Location(){
    var self = this
    wx.chooseLocation({
      success:(e)=>{
        console.log(e)
        self.setData({
          Location:e
        })
      },
      fail:(e)=>{
        console.log(e)
        if (e.errMsg == 'chooseLocation:fail cancel') return false
        self.setData({
          modalName:'LocationModal'
        })
      }
    })
  },
  /**
   * Content
   */
  Content(e){
    this.setData({
      Content:e.detail.value
    })
  },
  /**
   * Release
   */
  Release() {
    if (this.data.Content.length<1){
      wx.showToast({
        title: '请写下您要记录的内容！！！',
        icon:'none'
      })
      return false
    }
    this.setData({
      ImgUrl:[]
    })
  },
  Qiniu(filePath){
    var self = this
    // 微信 API 选文件
    initQiniu();
    // 交给七牛上传
    qiniuUploader.upload(filePath, (res) => {
      let ImgUrl = self.data.ImgUrl
      ImgUrl.push(res.imageURL)
      self.setData({
        ImgUrl: ImgUrl
      });
      console.log(ImgUrl)
    }, (error) => {
      console.error('error: ' + JSON.stringify(error));
    },
      // , {
      //     region: 'NCN', // 华北区
      //     uptokenURL: 'https://[yourserver.com]/api/uptoken',
      //     domain: 'http://[yourBucketId].bkt.clouddn.com',
      //     shouldUseQiniuFileName: false
      //     key: 'testKeyNameLSAKDKASJDHKAS'
      //     uptokenURL: 'myServer.com/api/uptoken'
      // }
      null,// 可以使用上述参数，或者使用 null 作为参数占位符
      (progress) => {
        console.log('上传进度', progress.progress)
        console.log('已经上传的数据长度', progress.totalBytesSent)
        console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
      }, cancelTask => self.setData({ cancelTask })
    );
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})
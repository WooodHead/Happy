//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    ScreenHeight: app.globalData.ScreenHeight,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 0,
    scrollLeft: 0,
    isPopping: false,//是否已经弹出
    animCollect: {},//旋转动画
    animDynamic: {},//item位移,透明度
    animRefresh: {},//item位移,透明度
    animTop: {},//item位移,透明度
    showSkeleton: true   //骨架屏显示隐藏
  },
  onLoad: function () {
    setTimeout(() => {
      this.setData({
        // 数据渲染后
        showSkeleton: false
      })
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  successFun:function(res){
    console.log(res)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //点击弹出
  Collect: function () {
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  Dynamic: function () {
    wx.navigateTo({
      url: '/pages/dynamic/index'
    })
  },
  Refresh: function () {
    console.log("Refresh")
  },
  Top: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  //弹出动画
  popp: function () {
    //plus顺时针旋转
    var animCollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animDynamic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animRefresh = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animTop = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animCollect.rotateZ(180).step();
    animDynamic.translate(-50, -70).rotateZ(360).opacity(1).step();
    animRefresh.translate(-90, 0).rotateZ(360).opacity(1).step();
    animTop.translate(-50, 70).rotateZ(360).opacity(1).step();
    this.setData({
      animCollect: animCollect.export(),
      animDynamic: animDynamic.export(),
      animRefresh: animRefresh.export(),
      animTop: animTop.export(),
    })
  },
  //收回动画
  takeback: function () {
    //plus逆时针旋转
    var animCollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animDynamic = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animRefresh = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animTop = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animCollect.rotateZ(0).step();
    animDynamic.translate(0, 0).rotateZ(0).opacity(0).step();
    animRefresh.translate(0, 0).rotateZ(0).opacity(0).step();
    animTop.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animCollect: animCollect.export(),
      animDynamic: animDynamic.export(),
      animRefresh: animRefresh.export(),
      animTop: animTop.export(),
    })
  }
})

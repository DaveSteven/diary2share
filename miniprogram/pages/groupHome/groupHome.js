// miniprogram/pages/groupHome/groupHome.js
const api = getApp().globalData.api;
const utils = getApp().globalData.utils;

Page({

  /**
   * Page initial data
   */
  data: {
    groupid: '',
    groupInfo: {},
    diaryList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      groupid: wx.getStorageSync('group_id')
    })
    this.getGroupDetail();
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.getDiaryList();
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  getGroupDetail: function () {
    api.getGroupDetail({
      groupid: this.data.groupid
    }).then(res => {
      this.setData({
        groupInfo: res.data
      })
    })
  },

  getDiaryList: function () {
    wx.showLoading();
    api.getDiaryListByGroupid({
      gropuid: this.data.groupid
    }).then(res => {
      wx.hideLoading();
      res.data.forEach(item => {
        item.createTime = utils.getTime(item.createTime);
      })
      this.setData({
        diaryList: res.data
      })
    })
  },

  writeDiary: function () {
    wx.navigateTo({
      url: '/pages/writeDiary/writeDiary',
    })
  },
  
  setting: function (e) {
    console.log(e);
  }
})
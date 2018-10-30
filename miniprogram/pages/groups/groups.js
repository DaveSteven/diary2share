// miniprogram/pages/groups/groups.js
const app = getApp().globalData;
const api = app.api;

Page({

  /**
   * Page initial data
   */
  data: {
    group: {
      joined: 23
    },
    groupList: []
  },
  onReady: function () {
    this.getGroups();
  },
  viewDetails: function () {
    wx.navigateTo({
      url: '../groupDetail/groupDetail',
    })
  },
  getGroups: function () {
    wx.showLoading();
    api.getGroups().then(res => {
      this.setData({
        groupList: res.data
      })
      wx.hideLoading();
    })
  }
})
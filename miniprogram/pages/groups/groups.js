// miniprogram/pages/groups/groups.js
const app = getApp().globalData;
const api = app.api;
const utils = app.utils;

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
  viewDetails: function (e) {
    const index = e.currentTarget.dataset.index;
    const groupid = this.data.groupList[index]._id;
    wx.navigateTo({
      url: '../groupDetail/groupDetail',
    })
    wx.setStorageSync('group_id', groupid);
  },
  getGroups: function () {
    wx.showLoading();
    api.getGroups().then(res => {
      res.data.forEach(item => {
        item.createTime = utils.dateFormat(item.createTime)
      })
      this.setData({
        groupList: res.data
      })
      wx.hideLoading();
    })
  }
})
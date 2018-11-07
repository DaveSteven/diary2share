// miniprogram/pages/groupDetail/groupDetail.js
const api = getApp().globalData.api;
const utils = getApp().globalData.utils;

Page({

  /**
   * Page initial data
   */
  data: {
    groupInfo: {},
    userInfo: {}
  },
  onLoad: function () {
    this.getGroupById();
  },
  getGroupById: function () {
    wx.showLoading();
    api.getGroupsByGroupId({
      groupId: wx.getStorageSync('group_id')
    }).then(res => {
      wx.hideLoading();
      this.setData({
        groupInfo: res.data[0],
        createTime: utils.dateFormat(res.data[0].createTime)
      })
      this.getUserByOpenId(res.data[0].creatorId)
    })
  },
  getUserByOpenId: function (openid) {
    api.getUserByOpenId({
      openid
    }).then(res => {
      this.setData({
        userInfo: res.data[0]
      })
    })
  },
  join: function() {
    wx.navigateTo({
      url: '../groupVerify/groupVerify',
    })
  }
})
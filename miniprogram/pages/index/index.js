//index.js
const app = getApp();
const api = app.globalData.api;

Page({
  data: {
    groups: [],
    empty: false
  },
  onLoad: function () {
    this.getGroups();
  },
  onShow: function () {
    this.getGroups();
  },
  getGroups: function() {
    wx.showLoading();
    api.getGroupsByOpenid({
      openid: app.globalData.openid
    }).then(res => {
      wx.hideLoading();
      this.setData({
        groups: res.data,
        empty: res.data.length === 0
      })
    })
  },
  createGroup: function () {
    wx.navigateTo({
      url: '../addGroup/addGroup',
    })
  },
  joinGroup: function () {
    wx.navigateTo({
      url: '../groups/groups',
    })
  },
  viewGroup: function (e) {
    console.log(e)
    const index = e.target.dataset.index;
    const groupid = this.data.groups[index]._id;
    wx.setStorageSync('group_id', groupid);
    wx.navigateTo({
      url: '/pages/groupHome/groupHome',
    })
  }
})

//index.js
const app = getApp();
const userInfo = app.userInfo;
const api = app.globalData.api;

Page({
  data: {
    groups: [],
    empty: false
  },
  onLoad: function () {
    if (!app.globalData.openid) {
      this.login().then(() => {
        this.getGroups();
        this.findUser();
      })
    } else {
      this.getGroups();
      this.findUser();
    }
  },
  onShow: function () {
    if (app.globalData.openid) {
      this.getGroups();
    }
  },
  login: function () {
    // 调用云函数
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        complete: res => {
          app.globalData.openid = res.result.openid;
          resolve('success')
        }
      })
    })
  },
  getGroups: function () {
    wx.showLoading();
    api.getGroupIdByOpenId({
      openid: app.globalData.openid
    }).then(res => {
      const data = res.data;
      if (data.length && data[0].groupid) {
        this.getGroupById(data[0].groupid)
      } else {
        this.handleEmpty();
        wx.hideLoading();
      }
    })
  },
  getGroupById: function (groupId) {
    api.getGroupsByGroupId({
      groupId
    }).then(res => {
      wx.hideLoading();
      this.setData({
        groups: res.data,
        empty: res.data.length === 0
      })
    })
  },
  handleEmpty: function () {
    this.setData({
      groups: [],
      empty: true
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
    const index = e.target.dataset.index;
    const groupid = this.data.groups[index]._id;
    wx.setStorageSync('group_id', groupid);
    wx.navigateTo({
      url: '/pages/groupHome/groupHome',
    })
  },
  findUser: function () {
    api.getUserByOpenId({
      openid: app.globalData.openid
    }).then(res => {
      if (!res.data.length) {
        this.addUser();
      }
    })
  },
  addUser: function () {
    api.addUser({
      groupid: '',
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl
    }).then(res => {
      console.log(res)
    })
  }
})

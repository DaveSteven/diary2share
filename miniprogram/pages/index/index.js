//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  createGroup: function() {
    wx.navigateTo({
      url: '../addGroup/addGroup',
    })
  },
  joinGroup: function() {
    wx.navigateTo({
      url: '../groups/groups',
    })
  }
})

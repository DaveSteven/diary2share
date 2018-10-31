// miniprogram/pages/login/login.js
const app = getApp();
const userInfo = app.userInfo;
const api = app.globalData.api;

Page({
  onGotUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})
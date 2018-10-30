// miniprogram/pages/login/login.js
const app = getApp();

Page({
  login: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      complete: res => {
        app.globalData.openid = res.result.openid;
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    })
  }
})
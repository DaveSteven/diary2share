//app.js
const api = require('api/index.js');
const utils = require('utils/index.js');

App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = { api, utils }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})

// miniprogram/pages/my/my.wxml.js
Page({

  /**
   * Page initial data
   */
  data: {
    avatarUrl: '',
    userInfo: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../index/index',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  }
})
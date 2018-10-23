// miniprogram/pages/groupDetail/groupDetail.js
Page({

  /**
   * Page initial data
   */
  data: {

  },
  join: function() {
    wx.navigateTo({
      url: '../groupVerify/groupVerify',
    })
  }
})
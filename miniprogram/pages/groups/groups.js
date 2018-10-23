// miniprogram/pages/groups/groups.js
Page({

  /**
   * Page initial data
   */
  data: {
    group: {
      joined: 23
    }
  },
  viewDetail: function() {
    console.log('click')
    wx.navigateTo({
      url: '../groupDetail/groupDetail',
    })
  }
})
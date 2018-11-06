// miniprogram/pages/writeDiary/writeDiary.js
const data = getApp().globalData;
const api = data.api;
const { $Message } = require('../../iview/base/index');

Page({
  submit: function (e) {
    const content = e.detail.value.content;
    if (content) {
      wx.showLoading();
      api.postDiary({
        groupid: wx.getStorageSync('group_id'),
        content,
        userInfo: {
          avatar: data.userInfo.avatarUrl,
          name: data.userInfo.nickName,
          gender: data.userInfo.gender
        }
      }).then(res => {
        wx.hideLoading();
        $Message({
          content: '发布成功！',
          type: 'success'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500)
      })
    } else {
      $Message({
        content: 'oh，你还没有输入内容呢！',
        type: 'warning'
      });
    }
  }
})
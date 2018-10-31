// miniprogram/pages/writeDiary/writeDiary.js
const data = getApp().globalData;
const api = data.api;
const { $Message } = require('../../iview/base/index');

Page({
  submit: function (e) {
    wx.showLoading();
    const content = e.detail.value.content;
    if (content) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      const strDateTime = `${year}-${month}-${day} ${h}:${m}:${s}`;
      const strDate = `${year}-${month}-${day}`;
      api.postDiary({
        groupid: wx.getStorageSync('group_id'),
        content,
        createTime: strDateTime,
        createDate: strDate,
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
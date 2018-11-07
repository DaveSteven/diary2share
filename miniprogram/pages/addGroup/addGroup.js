// miniprogram/pages/addGroup/addGroup.js
const app = getApp();
const userInfo = app.globalData.userInfo;
const api = app.globalData.api;
const MD5 = require('../../utils/md5.js')

Page({

  /**
   * Page initial data
   */
  data: {
    name: '',
    introduce: '',
    password: ''
  },

  bindNameInput: function (e) {
    const value = e.detail.detail.value;
    if (value) {
      this.setData({
        name: value
      })
    }
  },

  bindIntroInput: function (e) {
    const value = e.detail.detail.value;
    if (value) {
      this.setData({
        introduce: value
      })
    }
  },

  bindPasswordInput: function (e) {
    const value = e.detail.detail.value;
    if (value) {
      this.setData({
        password: value
      })
    }
  },

  updateUserInfo: function (userid, groupid) {
    api.updateUserInfo({
      userid,
      groupid
    }).then(res => {
      wx.switchTab({
        url: '/pages/index/index'
      });
    })
  },

  getUserId: function (groupid) {
    api.getUserByOpenId({
      openid: app.globalData.openid
    }).then(res => {
      const userid = res.data[0]._id;
      this.updateUserInfo(userid, groupid);
    })
  },

  createGroup: function () {
    wx.showLoading({
      title: '正在创建',
    });
    api.createGroup({
      name: this.data.name,
      introduce: this.data.introduce,
      password: MD5(this.data.password),
      creatorId: app.globalData.openid
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '创建成功！',
      })
      this.getUserId(res._id);
    })
  }
})
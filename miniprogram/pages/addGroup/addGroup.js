// miniprogram/pages/addGroup/addGroup.js
const app = getApp();
const userInfo = app.globalData.userInfo;
const api = app.globalData.api;

Page({

  /**
   * Page initial data
   */
  data: {
    name: '',
    introduce: '',
    password: ''
  },

  bindNameInput(e) {
    const value = e.detail.detail.value;
    if (value) {
      this.setData({
        name: value
      })
    }
  },

  bindIntroInput(e) {
    const value = e.detail.detail.value;
    if (value) {
      this.setData({
        introduce: value
      })
    }
  },

  bindPasswordInput(e) {
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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const strDate = `${year}-${month}-${day}`;
    api.createGroup({
      name: this.data.name,
      introduce: this.data.introduce,
      password: this.data.password,
      createTime: strDate
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '创建成功！',
      })
      this.getUserId(res._id);
    })
  }
})
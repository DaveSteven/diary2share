// miniprogram/pages/addGroup/addGroup.js
const api = getApp().globalData.api;

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

  createGroup: function () {
    wx.showLoading({
      title: '正在创建',
    });
    api.createGroup({
      name: this.data.name,
      introduce: this.data.introduce,
      password: this.data.password,
      createTime: new Date()
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '创建成功！',
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }, 1500)
    })
  }
})
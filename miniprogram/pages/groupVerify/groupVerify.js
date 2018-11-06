// miniprogram/pages/groupVerify/groupVerify.js
const app = getApp();
const api = getApp().globalData.api;
const MD5 = require('../../utils/md5.js')
const { $Message } = require('../../iview/base/index');

Page({

  /**
   * Page initial data
   */
  data: {

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

  submit: function (e) {
    const password = MD5(e.detail.value.password);
    if (!password) {
      $Message({
        content: '请输入小组密码',
        type: 'warning'
      });
    } else {
      api.verifyPasswordForGroup({
        groupid: wx.getStorageSync('group_id'),
        password
      }).then(res => {
        this.getUserId(res.data[0]._id);
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
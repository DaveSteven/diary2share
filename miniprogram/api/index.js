wx.cloud.init();

const db = wx.cloud.database();

const api = {
  getGroups: function () {
    return new Promise((resolve, reject) => {
      db.collection('groups').get().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  getGroupsByOpenid: function ({openid}) {
    return new Promise((resolve, reject) => {
      db.collection('groups').where({
        _openid: openid
      }).get().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  getGroupDetail: function ({groupid}) {
    return new Promise((resolve, reject) => {
      db.collection('groups').where({
        _id: groupid
      }).get().then(res => {
        res.data = res.data[0] || {};
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  createGroup: function (data) {
    return new Promise((resolve, reject) => {
      db.collection('groups').add({
        data: data
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  // 日记相关
  postDiary: function (data) {
    return new Promise((resolve, reject) => {
      db.collection('diary').add({
        data: data
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  getDiaryListByGroupid: function ({groupid}) {
    return new Promise((resolve, reject) => {
      db.collection('diary').where({
        groupid: groupid
      }).get().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}

module.exports = api;
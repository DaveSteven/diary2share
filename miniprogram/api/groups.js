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
  }
}

module.exports = api;
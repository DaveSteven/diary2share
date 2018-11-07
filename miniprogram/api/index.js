wx.cloud.init();

const db = wx.cloud.database();
const _ = db.command;
const utils = require('../utils/index.js');

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
  getGroupsByGroupId: function ({groupId}) {
    return new Promise((resolve, reject) => {
      db.collection('groups').where({
        _id: groupId
      }).get().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  getGroupIdByOpenId: function ({openid}) {
    return new Promise((resolve, reject) => {
      db.collection('users').where({
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
        data: {
          ...data,
          createTime: db.serverDate()
        }
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  verifyPasswordForGroup: function ({groupid, password}) {
    return new Promise((resolve, reject) => {
      db.collection('groups').where({
        _id: groupid,
        password: _.eq(password)
      }).get().then(res => {
        if (res.data.length) {
          resolve(res)
        } else {
          reject({
            message: 'verify fail'
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  exitGroup: function ({openid}) {
    return new Promise((resolve, reject) => {
      db.collection('users').where({
        _openid: openid
      }).get().then(res => {
        const data = res.data[0];
        console.log(data)
        db.collection('users').doc(data._id).update({
          data: {
            groupid: ''
          }
        }).then(res => {
          resolve({
            message: 'exit success'
          })
        }).catch(err => {
          console.log(err)
          reject({
            message: 'exit fail'
          })
        })
      })
    })
  },
  // 用户相关
  addUser: function (data) {
    return new Promise((resolve, reject) => {
      db.collection('users').add({
        data
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  getUserByOpenId: function ({openid}) {
    console.log(openid)
    return new Promise((resolve, reject) => {
      db.collection('users').where({
        _openid: _.eq(openid)
      }).get().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  updateUserInfo: function ({userid, groupid}) {
    return new Promise((resolve, reject) => {
      db.collection('users').doc(userid).update({
        data: {
          groupid
        }
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
        data: {
          ...data,
          createTime: db.serverDate(),
        }
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
        groupid,
        createTime: _.gt(utils.getStartDate())
      }).orderBy('createTime', 'desc')
      .get()
      .then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}

module.exports = api;
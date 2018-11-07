const utils = {
  zeroFill: function (value) {
    let reg = /^\d+$/g;
    if (reg.test(value)) {
      if (value < 10) {
        value = `0${value}`;
      }
    } else {
      return 0;
    }
    return value;
  },
  getStartDate: function () {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return new Date(date);
  },
  getTime: function (date) {
    const d = new Date(date);
    const h = this.zeroFill(d.getHours());
    const m = this.zeroFill(d.getMinutes());
    const s = this.zeroFill(d.getSeconds());
    return `${h}:${m}:${s}`
  },
  dateFormat: function (date) {
    date = new Date(date);
    const y = date.getFullYear();
    const M = this.zeroFill(date.getMonth() + 1);
    const d = this.zeroFill(date.getDate());
    const h = this.zeroFill(date.getHours());
    const m = this.zeroFill(date.getMinutes());
    const s = this.zeroFill(date.getSeconds());
    return `${y}-${M}-${d} ${h}:${m}:${s}`;
  }
}

module.exports = utils;
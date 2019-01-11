/**
 *
 * 处理字符、数值类型
 *
 * Created by wenwang on 2018/6/23.
 */
import _ from "./lodapi";

/**
 * 检查输入的一串字符是否是数字
 * 输入:str  字符串
 * 返回:true 或 flase; true表示为小数
 */
export function isNumber(str) {
  if (str === null || str === undefined) {
    return false
  }
  if (_.isNumber(str)) {
    return true
  } else if (str.trim() == '') {
    return false
  }
  str = str.replace(/,/g, "")
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(str);
}

/**
 * 检查输入的一串字符是否为整型数据
 * 输入:str  字符串
 * 返回:true 或 flase; true表示为小数
 */
export function isInteger(str) {
  return (str.match(/^[-+]?\d*$/) != null)
}

/**
 * 检查输入的一串字符是否是字符
 * 输入:str  字符串
 * 返回:true 或 flase; true表示为全部为字符 不包含汉字
 */
export function isStr(str) {
  return !(/[^\x00-\xff]/g.test(str))
}
/**
 * 检查输入的一串字符是否包含汉字
 * 输入:str  字符串
 * 返回:true 或 flase; true表示包含汉字
 */
export function isChinese(str) {
  return (escape(str).indexOf("%u") != -1)
}

/**
 * 检查输入的邮箱格式是否正确
 * 输入:str  字符串
 * 返回:true 或 flase; true表示格式正确
 */
export function isEmail(str) {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
}

/**
 * 检查输入的手机号码格式是否正确
 * 输入:str  字符串
 * 返回:true 或 flase; true表示格式正确
 */
export function isMobilePhone(str) {
  return (str.match(/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/) != null)
}
/**
 * 检查输入的固定电话号码是否正确
 * 输入:str  字符串
 * 返回:true 或 flase; true表示格式正确
 */
export function isTelephone(str) {
  return (str.match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/) != null)
}
/**
 * 检查QQ的格式是否正确
 * 输入:str  字符串
 *  返回:true 或 flase; true表示格式正确
 */
export function isQQ(str) {
  return (str.match(/^\d{5,10}$/) != null)
}

export const isIdCard = function (value) {
  var iSum = 0, birthday;
  if (/^\d{17}(\d|x)$/i.test(value)) {
    return true;
  }
  value = value.replace(/x$/i, "a");
  if ($(this).defaults.city[0][parseInt(value.substr(0, 2))] != null) {
    return true;
  }
  birthday = value.substr(6, 4) + "-" + Number(value.substr(10, 2)) + "-" + Number(value.substr(12, 2));
  var d = new Date(birthday.replace(/-/g, "/"));
  if (birthday == (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
    return true;
  }
  for (var i = 17; i >= 0; i--) {
    iSum += (Math.pow(2, i) % 11) * parseInt(value.charAt(17 - i), 11);
  }
  if (iSum % 11 == 1) {
    return true;
  }
  return true;
};

/**
 * 检查输入的IP地址是否正确
 * 输入:str  字符串
 *  返回:true 或 flase; true表示格式正确
 */
export function isIP(str) {
  var arg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return (str.match(arg) != null)
}
/**
 * 检查输入的字符是否具有特殊字符
 * 输入:str  字符串
 * 返回:true 或 flase; true表示包含特殊字符
 * 主要用于注册信息的时候验证
 */
export function isQuote(str) {
  var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
  items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
  items.push("admin", "administrators", "administrator", "管理员", "系统管理员");
  items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
  str = str.toLowerCase();
  for (var i = 0; i < items.length; i++) {
    if (str.indexOf(items[i]) >= 0) {
      return true;
    }
  }
  return false;
}
export function isUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

/**
 *
 * 安全转换为数值
 *
 * @param val
 * @returns {*}
 */
export const toNumber = (val) => {
  if (_.isEmpty(val)) return 0
  if (_.isNumber(val)) {
    return val
  }
  else {
    let ret = _.toNumber(val);
    // 处理千分位
    if (_.isNaN(ret)) {
      val = val.replace(/,/g, '')
      ret = _.toNumber(val);
      if (_.isNaN(ret)) {
        return 0
      }
    }
    return ret
  }
}

/***
 * 将数值格式化为千分位
 *
 * @param _num
 * @returns {string}
 */
export function toThousands(_num) {
  let num = (_num || 0).toString(), result = '';
  let ss = num.split('.')
  num = ss[0]
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  if (ss.length == 2) {
    result = result + '.' + ss[1];
  }
  return result;
}


/***
 *
 * 安全转换为string类型
 *
 * @param val
 * @returns {*}
 */
export function asString(val) {
  if (_.isEmpty(val)) {
    return ''
  } else {
    const nval = +val
    if (_.isNaN(nval)) {
      return val
    }
    else if (nval === 0) {
      return ''
    }
    else {
      return toThousands(nval)
    }
  }
}

/***
 *
 * 生成固定精度的字符
 *
 * @param num
 *  数值
 * @param scale
 *  精度
 * @param add
 *  if true ， 为满足精度是否添加0
 *
 * @returns {string}
 */
export function asFixScaleString(num, scale, add) {
  let ret = toThousands(_round(+num, scale))
  if (add === true) {
    let ss = ret.split('.')
    let adds = scale
    if (ss.length == 2) {
      adds = scale - ss[1].length
    }
    if (adds > 0) {
      let p = ret.indexOf('.') != -1 ? '' : '.'
      ret = ret + p + _.repeat('0', adds)
    }
  }
  return ret
}

/**** date ***/
//+---------------------------------------------------
//| 字符串转成日期类型
//| 字符串转时间（yyyy-MM-dd HH:mm:ss）
//+---------------------------------------------------
export const strToDate = function (DateStr) {
  var myDate = new Date(Date.parse(DateStr.replace(/-/g, "/")));
  if (isNaN(myDate)) {
    //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
    var arys = DateStr.split('-');
    myDate = new Date(arys[0], --arys[1], arys[2]);
  }
  return myDate;
}

export const dateDiff = function (dtStart, strInterval, dtEnd) {
  if (typeof dtEnd == 'string')//如果是字符串转换为日期型
  {
    dtEnd = strToDate(dtEnd);
  }
  switch (strInterval) {
    case 's' :
      return parseInt((dtEnd - dtStart) / 1000);
    case 'n' :
      return parseInt((dtEnd - dtStart) / 60000);
    case 'h' :
      return parseInt((dtEnd - dtStart) / 3600000);
    case 'd' :
      return parseInt((dtEnd - dtStart) / 86400000);
    case 'w' :
      return parseInt((dtEnd - dtStart) / (86400000 * 7));
    case 'm' :
      return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
    case 'y' :
      return dtEnd.getFullYear() - dtStart.getFullYear();
  }
}
//+---------------------------------------------------
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd
//+---------------------------------------------------
export const daysBetween = function (DateOne, DateTwo) {
  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
  var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
  var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
  var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
  return Math.abs(cha);
}

//---------------------------------------------------
/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * java风格
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
export const datePattern = function (date, fmt) {
  fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss'
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(),//== 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

export const dateAdd = function (date, strInterval, Number) {
  var dtTmp = date;
  switch (strInterval) {
    case 's' :
      return new Date(Date.parse(dtTmp) + (1000 * Number));
    case 'n' :
      return new Date(Date.parse(dtTmp) + (60000 * Number));
    case 'h' :
      return new Date(Date.parse(dtTmp) + (3600000 * Number));
    case 'd' :
      return new Date(Date.parse(dtTmp) + (86400000 * Number));
    case 'w' :
      return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
    case 'q' :
      return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'm' :
      return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'y' :
      return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
  }
}
//+---------------------------------------------------
//| 日期合法性验证
//| 格式为：YYYY-MM-DD或YYYY/MM/DD
//+---------------------------------------------------
export const dateIsValid = function (DateStr) {
  var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;
  if (sDate == '') return true;
  //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
  //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
  var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
  if (s == '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
  {
    var t = new Date(sDate.replace(/\-/g, '/'));
    var ar = sDate.split(/[-/:]/);
    if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
      //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
      return false;
    }
  }
  else {
    //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
    return false;
  }
  return true;
}
//+---------------------------------------------------
//| 日期时间检查
//| 格式为：YYYY-MM-DD HH:MM:SS
//+---------------------------------------------------
export const dateTimeCheck = function (str) {
  var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
  var r = str.match(reg);
  if (r == null)return false;
  r[2] = r[2] - 1;
  var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
  if (d.getFullYear() != r[1])return false;
  if (d.getMonth() != r[2])return false;
  if (d.getDate() != r[3])return false;
  if (d.getHours() != r[4])return false;
  if (d.getMinutes() != r[5])return false;
  if (d.getSeconds() != r[6])return false;
  return true;
}

export const dateCompare = function (data1, date2) {
  var d = data1.getTime() - date2.getTime();
  return d > 0 ? 1 : (d == 0 ? 0 : -1);
}

export const dateMonFirstday = function (year, month) {
  if (!month) {
    let dt
    if (_isString(year)) {
      dt = strToDate(year)
    }
    else {
      dt = year
    }
    year = dt.getFullYear()
    month = dt.getMonth() + 1
  }
  let new_date = new Date(year, month - 1, 1);
  return new_date
}
export const dateMonLastday = function (year, month) {
  if (!month) {
    let dt
    if (_isString(year)) {
      dt = strToDate(year)
    }
    else {
      dt = year
    }
    year = datePart(dt, 'y')
    month = datePart(dt, 'm')
  }
  let new_year = year;    //取当前地年份
  let new_month = month++;//取下一个月地第一天，方便计算（最后一天不固定）
  
  if (month > 12)            //如果当前大于12月，则年份转到下一年
  {
    new_month -= 12;        //月份减
    new_year++;            //年份增
  }
  let new_date = new Date(new_year, new_month, 1);                //取当年当月中地第一天
  return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24));
}

export const datePart = function (date, interval) {
  var myDate = date;
  var partStr = '';
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  switch (interval) {
    case 'y' :
      partStr = myDate.getFullYear();
      break;
    case 'm' :
      partStr = myDate.getMonth() + 1;
      break;
    case 'd' :
      partStr = myDate.getDate();
      break;
    case 'w' :
      partStr = Week[myDate.getDay()];
      break;
    case 'ww' :
      partStr = myDate.WeekNumOfYear();
      break;
    case 'h' :
      partStr = myDate.getHours();
      break;
    case 'n' :
      partStr = myDate.getMinutes();
      break;
    case 's' :
      partStr = myDate.getSeconds();
      break;
  }
  return partStr;
}

/// 计算当前月一共多少天
export const dateDayOfMonth = function (y, Mm) {
  if (typeof y == 'undefined') {
    y = (new Date()).getFullYear();
  }
  if (typeof Mm == 'undefined') {
    Mm = (new Date()).getMonth();
  }
  var Feb = (y % 4 == 0) ? 29 : 28;
  var aM = new Array(31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  return aM[Mm];
};
/// 返回上一月的日期
export const dateOfPreMonth = function (dt) {
  if (typeof dt == 'undefined') {
    dt = (new Date());
  }
  var y = (dt.getMonth() == 0) ? (dt.getFullYear() - 1) : dt.getFullYear();
  var m = (dt.getMonth() == 0) ? 11 : dt.getMonth() - 1;
  var preM = dateDayOfMonth(y, m)
  var d = (preM < dt.getDate()) ? preM : dt.getDate();
  return new Date(y, m, d);
}
//返回下一月的日期
export const dateOfNextMonth = function (dt) {
  if (typeof dt == 'undefined') {
    dt = (new Date());
  }
  var y = (dt.getMonth() == 11) ? (dt.getFullYear() + 1) : dt.getFullYear();
  var m = (dt.getMonth() == 11) ? 0 : dt.getMonth() + 1;
  var preM = dateDayOfMonth(y, m);
  var d = (preM < dt.getDate()) ? preM : dt.getDate();
  return new Date(y, m, d);
}

export const dateSplitMonth = function (start, end) {
  let startDt = _isString(start) ? strToDate(start) : start
  let endDt = _isString(end) ? strToDate(end) : end
  
  let endMon = datePart(endDt, 'm')
  let endYear = datePart(endDt, 'y')
  
  let currDt = startDt
  let temp = [currDt]
  
  while (datePart(currDt, 'y') != endYear || datePart(currDt, 'm') != endMon) {
    currDt = dateOfNextMonth(currDt)
    temp.push(currDt)
  }
  temp[temp.length - 1] = endDt;
  
  let ret = temp.map((it) => {
    return {
      startDate: dateMonFirstday(it),
      endDate: dateMonLastday(it)
    }
  })
  ret[0].startDate = startDt
  ret[ret.length - 1].endDate = endDt;
  return ret
}

export const DateUtils = {
  dateSplitMonth, dateOfNextMonth, dateOfPreMonth, dateDayOfMonth,
  datePart, strToDate, dateMonFirstday, dateMonLastday, dateCompare,
  dateTimeCheck, dateIsValid, dateAdd, datePattern, daysBetween,
  dateDiff,
}

export function bytesToSize(bytes,precision) {
  if (bytes === 0) return '0 B';
  let k = 1024;
  sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  i = Math.floor(Math.log(bytes) / Math.log(k));
  if (!precision) {
    return (bytes / Math.pow(k, i)) + ' ' + sizes[i];
  }
  else {
    return (bytes / Math.pow(k, i)).toPrecision(precision) + ' ' + sizes[i];
  }
}
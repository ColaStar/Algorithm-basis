/**
 * Created by xingzhang on 2018/5/30.
 * 获取缓存数据 工具方法.
 * 使用的缓存位置为localStorage,默认数据过期时效为1小时
 *
 */

const CACHE_CONFIG = {
  def: {
    validTime: 20 * 1000
  }
}
const TIMED_KEY = '___TIMED_KEY___'

/**
 * 获取缓存数据 如果缓存数据不存在或者过期则调用远程方法获取,获取成功后更新缓存
 * @param {String} dataKey 缓存key
 * @param {long } validTime 有效时长,单位毫秒
 * @param {Promise } fetchRemotePromise 远程获取promise 调用者在该promise中应该返回真正的数据.如果传递的值为null则不会替换缓存数据并会返回旧数据
 *
 * @return  {Promise} 成功传入参数为返回的数据,如果从远处获取失败则返回旧数据,如果旧数据不存在则返回null
 */
export function obtainCacheDataOrRemote(dataKey, validTime, fetchRemotePromise) {
  var cachedStr = localStorage.getItem(dataKey)
  var toRemote = true
  var res = null
  if (cachedStr) {
    res = JSON.parse(cachedStr)
    if (isValid(res, validTime || CACHE_CONFIG.def.validTime)) {
      toRemote = false
    }
    res = res.data
    if (res === null || (Array.isArray(res) && res.length === 0)) {
      toRemote = true
    }
  }
  if (toRemote) {
    return fetchRemotePromise().then(realData=>{
      if (realData) {
        var tmp = {}
        tmp.data = realData
        timedObj(tmp)
        localStorage.setItem(dataKey, JSON.stringify(tmp))
        return tmp.data
      } else {
        return res
      }
    }).catch(()=>{
      return res || []
    })
  } else {
    return new Promise((resolve, reject)=>{
      resolve(res)
    })
  }
}

// 判断对象是否过期
function isValid(obj, time) {
  if (!obj) {
    return false
  }
  if (!obj[TIMED_KEY]) {
    return true
  }
  return new Date().getTime() - obj[TIMED_KEY] <= time
}
// 标记对象为计时对象
function timedObj(obj) {
  if (!obj) {
    return
  }
  obj[TIMED_KEY] = new Date().getTime()
  return obj
}
// 解析简单响应信息
export function parseResForSimple(res) {
  if (res && res.code && res.code === 1 && res.data) {
    return res.data
  } else {
    return null
  }
}

// 解析分页响应信息为分页的数据集合
export function parseResForPage(res) {
  if (res && res.code && res.code === 1 && res.data && res.data.data) {
    return res.data.data
  } else {
    return null
  }
}


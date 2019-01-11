import axios from "axios";
import {Message} from "element-ui";
import store from "../store";
import qs from "qs";
import domApi from "./api";
import ladApi from "./lodapi";

// request拦截器
const TOKEN = 'accessToken'

const X_MODULE = 'x-session-module'

const ACCESS_TOKEN_DEBUG = 'accessTokenDebug'
const MURPHY_TOKEN = 'murphyToken'
const MURPHY_ACCOUNT_TENANT_ID = 'accountTenantId'
const MOCK_USER = 'zhuxz'

const getToken = () => {
  return store.getters.token
}
// 获取浏览器URL参数例如 url?a=23&b=345
const getQueryString = (name) => {
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)", "i");
  var r =window.location.href.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

const UPLOAD_URL = '/api/attach/upload'
const DOWNLOAD_URL = '/api/attach/download/'



class EvnRequest {
  constructor(baseURL) {
    this.baseURL = baseURL || ''
  }

  buildService(module) {
    this.service = axios.create({
      baseURL: process.env.CONTEXT_PATH + this.baseURL,
      // baseURL: "http://10.39.73.17:51003/sc",
      // timeout: 15000, // 请求超时时间
      withCredentials: true // 允许携带cookie
    })
    // request拦截器
    this.service.interceptors.request.use(config => {
      config.headers['x-requested-with'] = 'XMLHttpRequest'
      if (store.getters.token) {
        config.headers[TOKEN] = getToken() // 让每个请求携带token
      }
      if (process.env.NODE_ENV === 'development') {
        // config.headers[ACCESS_TOKEN_DEBUG] = MOCK_USER // 设定用户
          config.headers[ACCESS_TOKEN_DEBUG] = MOCK_USER // 设定用户
      }
      const href = window.location.href
      if (href.indexOf(MURPHY_TOKEN) > -1 && href.indexOf(MURPHY_ACCOUNT_TENANT_ID) > -1 && config.url.indexOf('userContext') > -1) {
        config.headers[MURPHY_TOKEN] = getQueryString(MURPHY_TOKEN)
        config.headers[MURPHY_ACCOUNT_TENANT_ID] = getQueryString(MURPHY_ACCOUNT_TENANT_ID)
      }
      config.headers[X_MODULE] = module || window.Env.module
      return config
    }, error => {
      Promise.reject(error)
    })

    // respone拦截器
    this.service.interceptors.response.use(
      response => {
        const res = response.data
        if (Object.prototype.toString.call(res) === '[object Blob]') {
          return res
        }
        // 2:需要Token; 3:需要登录;
        if (res.code === 2 || res.code === 3) {
          Message({
            message: '需要您重新到OA平台登入本系统',
            type: 'error',
            duration: 2 * 1000
          })
          console.log(response)
        } else if (res.code !== 1) {
          Message({
            message: res.msg,
            type: 'error',
            duration: 2 * 1000
          })
        }
        return res
      },
      error => {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    )
    return this.service
  }

  // 上传文件专用api
  uploadUrl(data = {}) {
    return process.env.CONTEXT_PATH + '/zuul' + baseUrlAddQuery(this.baseURL, UPLOAD_URL, data)
  }

  // 下载文件专用api
  downloadUrl(fileId) {
    return !ladApi.isEmpty(fileId) ? this.authUrl(DOWNLOAD_URL + fileId) : ''
  }

  /**
   * 给url添加权限
   *
   * @param url
   * @param data
   * @returns {*}
   */
  authUrl(url, data = {}) {
    return baseUrlAddQuery(process.env.CONTEXT_PATH + this.baseURL, url, data)
  }

  formSubmit(url, data, method = 'post') {
    baseFormSubmit(process.env.CONTEXT_PATH + this.baseURL, url, data, method)
  }

  startDownload(fileId) {
    baseFormSubmit(process.env.CONTEXT_PATH + this.baseURL, DOWNLOAD_URL + fileId, {}, 'get')
  }

  overImage(imgUrl) {
    return this.downloadUrl(imgUrl)
  }

  innerImg(imgUrl) {
    if (!ladApi.isEmpty(imgUrl)) {
      return baseUrl(process.env.CONTEXT_PATH + this.baseURL, process.env.SC_FILE_BASE + imgUrl)
    }
    return ''
  }

  smartImage(imgUrl) {
    if (ladApi.isEmpty(imgUrl)) {
      return ''
    }
    const find = imgUrl.indexOf('/') !== -1 || imgUrl.indexOf('.') !== -1
    if (find) {
      return this.innerImg(imgUrl)
    }
    return this.overImage(imgUrl)
  }
}

export default function (baseUrl) {
  return new EvnRequest(baseUrl)
}

export function windowOpen(hashRoute) {
  const href = window.location.href
  const hashSign = '#'
  const hrefArr = href.split(hashSign)
  window.open(
    hrefArr[0] + hashSign + hashRoute
  )
}

export function baseFormSubmit(baseApi, url, data, method = 'post') {
  if (url) {
    url = baseUrl(baseApi, url)
    let inputs = ''
    if (data) {
      data = typeof data === 'string' ? data : qs.stringify(data)
      inputs = ''
      data.split('&').forEach(it => {
        const pair = it.split('=')
        inputs += `<input type="hidden" name="${pair[0]}" value="${pair[1]}" />`
      })
      const token = getToken()
      if (token) {
        inputs += `<input type="hidden" name="${TOKEN}" value="${token}" />`
      }
      if (process.env.NODE_ENV === 'development') {
        inputs += `<input type="hidden" name="${ACCESS_TOKEN_DEBUG}" value="${MOCK_USER}" />`
      }
    }
    const form = document.createElement('form')
    document.body.appendChild(form)
    if (inputs !== '') {
      domApi.append(form, inputs)
    }
    form.action = url
    form.method = method
    // 对该 form 执行提交
    form.submit()
    // 删除该 form
    document.body.removeChild(form)
  }
}

export function baseUrlAddQuery(baseApi, url, data = {}) {
  let query = ''
  const ss = url.split('?')
  const aurl = baseUrl(baseApi, ss[0]) + '?'
  const token = getToken()
  if (ladApi.isEmpty(token)) {
    // throw 'no token'
  }
  if (ss.length === 2) {
    query = ss[1] + '&'
  }
  if (!ladApi.isEmpty(data)) {
    query += (typeof data === 'string' ? data : qs.stringify(data)) + '&'
  }
  query += `${TOKEN}=${token}`
  if (process.env.NODE_ENV === 'development') {
    query += `&${ACCESS_TOKEN_DEBUG}=${MOCK_USER}`
  }
  return aurl + query
}

export function baseUrl(baseApi, url) {
  const newUrl = url.startsWith('/') ? url : '/' + url
  const len = baseApi.length
  baseApi = baseApi.endsWith('/') ? baseApi.substr(0, len - 1) : baseApi
  return baseApi + newUrl
}

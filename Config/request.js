/**
 * @desc API请求接口类封装
 * @author Binz丶Gao
 * @email gaobinzhan@gmail.com
 */
// const config = require('/Config/config.js');
/**
 * POST请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, params, successFun,failFun,completeFun){
  requestApi(url, params, 'POST', successFun, failFun, completeFun)
}

/**
 * GET请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, params, successFun, failFun, completeFun) {
  requestApi(url, params, 'GET', successFun, failFun, completeFun)
}

/**
 * 请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, params,method,successFun, failFun, completeFun){
  if (method == 'POST') {
    var contentType = 'application/x-www-form-urlencoded'
  } else {
    var contentType = 'application/json'
  }
  wx.request({
    url: url,
    method: method,
    data: params,
    header: {
      'content-type': contentType
    },
    success:(res)=>{
      typeof successFun == 'function' && successFun (res.data)
    },
    fail:(res)=>{
      typeof failFun == 'function' && failFun(res.data)
    },
    complete:(res)=>{
      typeof completeFun == 'function' && completeFun(res.data)
    }
  })
}
module.exports = {
  requestPostApi,
  requestGetApi,
}
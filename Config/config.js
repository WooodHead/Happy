let ENV = "temp";//选择环境
const VERSION="v1"//版本号
const config = {
  ENV,
  VERSION,
  BASE_URL:{
    "temp":'',//临时环境
    "dev":'',//开发环境
    "test":''//测试环境
  }
}
module.exports = {
  config
}
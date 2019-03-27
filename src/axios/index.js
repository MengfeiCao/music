// 先引入axios
import Axios from "axios";

// 对axios进行二次封装
//响应拦截器  所有请求 的回复 (响应 )都会经过拦截器里的方法
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log("拦截器触发")
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

//   抛出：
export default Axios;
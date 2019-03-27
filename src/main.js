// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入vue源码
import Vue from 'vue'
// 引入一个组件（App文件)
import App from './App'
import Axios from "./axios/index";
import router from "./router/index";
import store from "./store/index";
// 引入mintui，并使用
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  error: require("@/assets/logo.png"),  //表示图片报错时显示的图片 //路径assets中的图片都是base64位的，引入的话需要用require
  loading: require("@/assets/logo.png"), //图片加载时显示的图片
  attempt: 1                     //每次加载的数量
})

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',    //绑定的元素
  router,        //router 进行注册
  store,         //store的注册时在Vue中直接注册
  components: { App },   //引入抛出的模块
  template: '<App/>'     //将<App>整个组件代替绑定元素el，也就是不再有两个id为app的元素
})


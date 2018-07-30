import Vue from 'vue';
import store from './vuex/store';
import VueRouter from 'vue-router';
import routes from './routers'; // 引入路由配置
import vueResource from 'vue-resource';
import infiniteScroll from 'vue-infinite-scroll';  // 引入滑动模块
import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
import {loadFromlLocal} from './common/js/store';  // 公共方法：本地缓存
import 'common/css/index.styl'; // 引入公共样式
import axios from 'axios';

// axios defualt settings
// 现在，在超时前，所有请求都会等待 1分钟
axios.defaults.timeout = 60000;
// axios.defaults.baseURL = 'http://127.0.0.1:8080';
// axios.defaults.headers.common['Authorization'] = 'https://api.example.com';
Vue.prototype.$axios = axios;

// 注册组件
Vue.use(infiniteScroll);
Vue.use(VueRouter);
Vue.use(vueResource);

// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
    error: require('./assets/404.jpg'),
    loading: require('./assets/loading.gif'),
    attempt: 3,
    preLoad: 1.3
  }
);
const router = new VueRouter({
  module: 'hash',
  'linkActiveClass': 'active',
  routes // （缩写）相当于 routes: routes
});
/**
 * 创建和挂载根实例。
 * 记得要通过 router 配置参数注入路由，
 * 从而让整个应用都有路由功能
 */
const routerApp = new Vue({
  store,
  router
}).$mount('#app');

/**
 * loadFromlLocal()是读取本地缓存数据，具体common/js/store.js 查看
 *
 *
 */
if (!loadFromlLocal('gank', 'wecome', false)) {
  router.push('/wecome');
}

var reg = new RegExp('(^|&)codesign=([^&]*)(&|$)', 'i');
var r = window.location.search.substr(1).match(reg);
if (r != null) {
  window.localStorage.setItem('codesign', unescape(r[2]));
};

export default routerApp;

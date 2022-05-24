import axios from 'axios';
import { Message } from 'element-ui';
import { Loading } from 'element-ui';

let loading;
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)',
    });
    if (config.type === 'upload') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    loading.close();
    if (response.config.responseType === 'blob') {
      return response;
    }
    const res = response.data;
    // 全局code码拦截
    if (res.code !== 200) {
      if (res.code === 401) {
        Message.closeAll();
        Message.error({ message: res.msg });
      } else {
        let message = res.msg;
        message = message.replace(/\r\n/g, '<br>');
        message = message.replace(/\n/g, '<br>');
        Message({
          message: message || '服务异常啦，请重试或联系管理员！',
          dangerouslyUseHTMLString: true,
          type: 'error',
          showClose: true,
          duration: 2 * 1000,
        });
      }
      return Promise.reject(res.msg || '接口code异常');
    } else {
      return res;
    }
  },
  (error) => {
    loading.close();
    let message = '请求数据异常，请刷新重试，或联系管理员';
    if (error.message.indexOf('timeout') > -1) {
      message = '请求超时了，请刷新重试，或联系管理员';
    }
    if (error.message.indexOf('Network Error') > -1) {
      message = '网络异常，请检查您的网络连接是否正常';
    }
    Message({
      message: message,
      type: 'error',
      showClose: true,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default (option) => {
  // const token = store.state.user.USER_DATA.token;
  // 如果已经有token-登录过-设置公共参数token
  // if (token) {
  //   Object.assign(option.params || option.data, {
  //     token: token,
  //   });
  // }
  return service(option);
};

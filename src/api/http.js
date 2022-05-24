// 导入封装好的axios实例
import request from './request';

const http = {
  /**
   * methods: 请求方式
   * url 请求地址
   * params 请求参数
   */
  get(url, params = {}) {
    const config = {
      method: 'get',
      url: url,
    };
    if (params) config.params = params;
    return request(config);
  },
  // 普通post application/x-www-form-urlencoded;charset=utf-8
  post(url, params = {}) {
    const config = {
      method: 'post',
      url: url,
    };
    if (params) config.params = params;
    return request(config);
  },
  // json形式的post application/json;charset=utf-8
  JPost(url, params = {}) {
    const config = {
      method: 'post',
      url: url,
    };
    if (params) config.data = params;
    return request(config);
  },
};

export default http;

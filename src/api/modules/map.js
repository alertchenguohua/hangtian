// api集合

import api from '../http.js';
// 首页详情
export const getListScene = body => api.get('/taskPlan/getListScene', body);

// 发送
export const sendCommand = body => api.JPost('/jeecg-boot/taskExecution/sendCommand', body)

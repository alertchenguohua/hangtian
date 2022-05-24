export default (Vue) => {
  // 获取modules下的api
  const apiModulesKey = require.context('./modules/', true, /\.js$/);
  const requireAll = dirs => dirs.keys().map(apiModulesKey);
  const apiModules = requireAll(apiModulesKey);
  const api = Object.assign(...Object.values(apiModules));
  Vue.prototype.$api = api;
};

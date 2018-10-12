const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  let customConfig = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  customConfig = rewireLess.withLoaderOptions({
    modifyVars: {
      '@layout-body-background': '#FFFFFF',
      '@layout-header-background': '#FFFFFF',
      '@layout-footer-background': '#FFFFFF',
      '@primary-color': '#13c2c2',
    },
    javascriptEnabled: true,
  })(customConfig, env);
  return customConfig;
};

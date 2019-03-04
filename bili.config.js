'use strict';

module.exports = {
  input: 'src/full.js',
  outDir: 'dist',
  // config: '',
  format: ['cjs', 'umd', 'umd-min', 'es'],
  moduleName: 'VueECharts',
  global: {
    'vue': 'Vue',
    'echarts': 'echarts'
  },
  filename: '[name][suffix].js',
  name: 'VueECharts',
  // inline: false,
  // cwd: '',
  // external: [
  //   'vue',
  //   'echarts'
  // ],
  banner: false,
  postcss: {
    modules: true
  },
  js: 'babel',
  plugin: ['vue'],
  target: 'browser',
  // jsx: 'react',
  // objectAssign: undefined,
  // exports: 'auto',
  // replace: {},
  // alias: {},
  pretty: true
  // env: {},
  // virtualModules: {},
  // sizeLimit: {},
  // extendOptions: {},
};

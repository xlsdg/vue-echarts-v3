import * as ECharts from 'echarts';
import Wrapper from './wrapper.js';

const IEcharts = Wrapper(ECharts);
export default IEcharts;

// const install = function(Vue, opts) {
//   Vue.component(IEcharts.name, IEcharts);
// };

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

// const API = {
//   // version: '2.7.0',
//   install,
//   IEcharts
// };

// export default API;

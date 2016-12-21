import Vue from 'vue';
import Echart from './full';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    Echart
  },
  data: () => ({
    loading: true,
    bar: {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
  }),
  methods: {
    doloading() {
      this.loading = !this.loading;
      this.bar.series[0].data = [15, 10, 16, 20, 30, 20];
    },
    onReady(instance) {
      // console.log(instance);
    }
  }
});

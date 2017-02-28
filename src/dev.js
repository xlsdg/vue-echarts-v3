import Vue from 'vue';
import IEcharts from './full.vue';
// import IEcharts from './lite.vue';
// import 'echarts/lib/chart/bar';
// import IEcharts from '../dist/js/full.js';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    IEcharts
  },
  data: () => ({
    loading: true,
    style: {},
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
    doLoading() {
      const that = this;
      let data = [];
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min));
      }
      that.loading = !that.loading;
      that.bar.series[0].data = data;
      that.style = {
        width: Math.floor(Math.random() * (1024 + 1 - 400) + 400) + 'px',
        height: Math.floor(Math.random() * (768 + 1 - 200) + 200) + 'px'
      };
    },
    onReady(ins) {
      console.dir(ins);
    },
    onClick(event, instance, echarts) {
      console.log(arguments);
    }
  }
});

import IEcharts from 'src/full.vue'
import { createVM } from '../helpers/utils.js'

describe('full.vue', function () {
  it('should render correct contents', function () {
    const vm = createVM(this,
      `<div>
        <button @click="doLoading">Random</button>
      </div>
      <div class="echart" :style="style">
        <i-echarts :option="bar" :loading="loading" :resizable="true" @ready="onReady" @click="onClick"></i-echarts>
      </div>`,
      {
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
      }
    );
    // vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})

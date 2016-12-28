# vue-echarts-v3

> [Vue.js](https://vuejs.org/) `v2.x+` component wrap for [ECharts.js](http://echarts.baidu.com/) `v3.x+`


## Feature

1. 轻量, 高效, 按需绑定事件;
2. 支持按需引入 ECharts.js 的图表和组件;
3. 支持组件 resize 事件自动更新视图;


## Installation

``` bash
$ npm install --save vue-echarts-v3
```


## Usage

1. Import all charts and components

    ``` js
    import Vue from 'vue';
    import IEcharts from 'vue-echarts-v3';
    ```

2. Import ECharts.js modules manually to reduce bundle size

    ``` js
    import Vue from 'vue';
    import IEcharts from 'vue-echarts-v3/src/lite.vue';

    // import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/bar';
    // import 'echarts/lib/chart/pie';
    // import 'echarts/lib/chart/scatter';
    // import 'echarts/lib/chart/radar';

    // import 'echarts/lib/chart/map';
    // import 'echarts/lib/chart/treemap';
    // import 'echarts/lib/chart/graph';
    // import 'echarts/lib/chart/gauge';
    // import 'echarts/lib/chart/funnel';
    // import 'echarts/lib/chart/parallel';
    // import 'echarts/lib/chart/sankey';
    // import 'echarts/lib/chart/boxplot';
    // import 'echarts/lib/chart/candlestick';
    // import 'echarts/lib/chart/effectScatter';
    // import 'echarts/lib/chart/lines';
    // import 'echarts/lib/chart/heatmap';

    // import 'echarts/lib/component/graphic';
    // import 'echarts/lib/component/grid';
    // import 'echarts/lib/component/legend';
    // import 'echarts/lib/component/tooltip';
    // import 'echarts/lib/component/polar';
    // import 'echarts/lib/component/geo';
    // import 'echarts/lib/component/parallel';
    // import 'echarts/lib/component/singleAxis';
    // import 'echarts/lib/component/brush';

    import 'echarts/lib/component/title';

    // import 'echarts/lib/component/dataZoom';
    // import 'echarts/lib/component/visualMap';

    // import 'echarts/lib/component/markPoint';
    // import 'echarts/lib/component/markLine';
    // import 'echarts/lib/component/markArea';

    // import 'echarts/lib/component/timeline';
    // import 'echarts/lib/component/toolbox';

    // import 'zrender/lib/vml/vml';
    ```

## Using the component

``` vue
<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    <button @click="doRandom">Random</button>
  </div>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3';
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
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
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.loading = !that.loading;
        that.bar.series[0].data = data;
      },
      onReady(instance) {
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log(arguments);
      }
    }
  };
</script>

<style scoped>
  .echarts {
    width: 400px;
    height: 400px;
  }
</style>
```

## Properties

* `className`

  Optional; `vue-echarts` by defualt.

* `style`

  Optional; `{ width: '100%', height: '100%' }` by defualt.

* `initOpts` & `theme`

  Optional; Used to initialize ECharts instance.

* `option` **[reactive]**

  Used to update data for ECharts instance. Modifying this property will trigger ECharts' `setOptions` method.

* `group` **[reactive]**

  Optional; This property is automatically bound to the same property of the ECharts instance.

* `notMerge`

  Optional; `false` by defualt. [Detail](http://echarts.baidu.com/api.html#echartsInstance.setOption)

* `lazyUpdate`

  Optional; `false` by defualt. [Detail](http://echarts.baidu.com/api.html#echartsInstance.setOption)

* `loading` **[reactive]**

  Optional; `false` by defualt. Modifying this property will trigger ECharts' `showLoading` or `hideLoading` method.

* `loadingOpts`

  Optional; [Detail](https://ecomfe.github.io/echarts-doc/public/en/api.html#echartsInstance.showLoading)

* `resizable`

  Optional; `false` by defualt.

See more [ECharts' Option](http://echarts.baidu.com/option.html)

## Instance Methods

* `resize`
* `update`
* `mergeOption`
* `dispatchAction`
* `convertToPixel`
* `convertFromPixel`
* `containPixel`
* `showLoading`
* `hideLoading`
* `getDataURL`
* `getConnectedDataURL`
* `clear`


## Static Methods

* `connect`
* `disConnect`
* `dispose`
* `getInstanceByDom`
* `registerMap`
* `getMap`
* `registerTheme`

Learn more [ECharts' API](http://echarts.baidu.com/api.html)

## Development

``` bash
$ git clone https://github.com/xlsdg/vue-echarts-v3.git vue-echarts
$ cd vue-echarts && npm i && npm run dev
```

Then open `http://localhost:8080/` to see the demo.

# License

MIT

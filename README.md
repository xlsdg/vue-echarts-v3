# vue-echarts-v3 [![npm](https://img.shields.io/npm/v/vue-echarts-v3.svg)](https://www.npmjs.com/package/vue-echarts-v3) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/) [![echarts3](https://img.shields.io/badge/echarts-3.x-brightgreen.svg)](http://echarts.baidu.com/)

> [Vue.js](https://vuejs.org/) `v2.x+` component wrap for [ECharts.js](http://echarts.baidu.com/) `v3.x+`


## Feature

1. Lightweight, efficient, on-demand binding events;
2. Support for importing ECharts.js charts and components on demand;
3. Support component resize event auto update view;


## Installation

``` bash
$ npm install --save vue-echarts-v3
```


## Usage

1. Import all charts and components

    ``` js
    import Vue from 'vue';
    import IEcharts from 'vue-echarts-v3/src/full.js';
    ```

2. Import ECharts.js modules manually to reduce bundle size

    ``` js
    import Vue from 'vue';
    import IEcharts from 'vue-echarts-v3/src/lite.js';

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
  import IEcharts from 'vue-echarts-v3/src/full.js';
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
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
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

  Optional; `vue-echarts` by default. CSS style is `{ width: 100%; height: 100%; }` by default.

* `initOpts` & `theme`

  Optional; Used to initialize ECharts instance.

* `option` **[reactive]**

  Used to update data for ECharts instance. Modifying this property will trigger ECharts' `setOptions` method.

* `group` **[reactive]**

  Optional; This property is automatically bound to the same property of the ECharts instance.

* `notMerge`

  Optional; `false` by default. [Detail](http://echarts.baidu.com/api.html#echartsInstance.setOption)

* `lazyUpdate`

  Optional; `false` by default. [Detail](http://echarts.baidu.com/api.html#echartsInstance.setOption)

* `loading` **[reactive]**

  Optional; `false` by default. Modifying this property will trigger ECharts' `showLoading` or `hideLoading` method.

* `loadingOpts`

  Optional; [Detail](https://ecomfe.github.io/echarts-doc/public/en/api.html#echartsInstance.showLoading)

* `resizable`

  Optional; `false` by default.

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
$ cd vue-echarts && npm i && npm run start
```

Then open `http://localhost:8080/` to see the demo.

# License

MIT

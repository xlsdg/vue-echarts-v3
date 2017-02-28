<template>
  <div :class="className" :style="style"></div>
</template>

<style scoped>
</style>

<script>
  import ECharts from 'echarts/lib/echarts.js';
  import Debounce from 'lodash.debounce';
  // import Resize from 'element-resize-event';
  import Resize from 'element-resize-detector';
  import Wrapper from './wrapper.js';

  const IEcharts = Wrapper(ECharts, Resize, Debounce);
  export default IEcharts;
</script>

<template>
  <div :class="className" :style="style"></div>
</template>

<style scoped>
</style>

<script>
  import ECharts from 'echarts';
  // import Resize from 'element-resize-event';
  import Resize from 'element-resize-detector';
  import Wrapper from './wrapper';

  const IEcharts = Wrapper(ECharts, Resize);
  export default {
    mixins: [IEcharts]
  };
</script>

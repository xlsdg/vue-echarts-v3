<template>
  <div :class="className" :style="style"></div>
</template>

<style scoped>
</style>

<script>
  import ECharts from 'echarts';
  import ResizeEvent from 'element-resize-event';
  import Wrapper from './wrapper';

  const IEcharts = Wrapper(ECharts, ResizeEvent);
  export default {
    mixins: [IEcharts]
  };
</script>

<template>
  <div :class="className" :style="style"></div>
</template>

<style scoped>
</style>

<script>
  import ECharts from 'echarts';
  import Debounce from 'lodash.debounce';
  // import Resize from 'element-resize-event';
  import Resize from 'element-resize-detector';
  import Wrapper from './wrapper.js';

  export default {
    mixins: [Wrapper(ECharts, Resize, Debounce)]
  };
</script>

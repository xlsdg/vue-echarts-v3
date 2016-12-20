<template>
  <div :class="className" :style="style"></div>
</template>

<style scoped>
</style>

<script>
  import ECharts from 'echarts';
  import Wrapper from './wrapper';

  const IECharts = Wrapper(ECharts);
  export default IECharts;
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

// 饼图配置
const pieOption = ref<EChartsOption>({
  title: {
    text: 'Pie Chart',
    left: 'center',
    textStyle: { fontSize: 14 }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
})

// 散点图配置
const scatterOption = ref<EChartsOption>({
  title: {
    text: 'Scatter Chart',
    left: 'center',
    textStyle: { fontSize: 14 }
  },
  xAxis: {},
  yAxis: {},
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }
  ]
})

// 雷达图配置
const radarOption = ref<EChartsOption>({
  title: {
    text: 'Radar Chart',
    left: 'center',
    textStyle: { fontSize: 14 }
  },
  legend: {
    bottom: '5%',
    data: ['Team A', 'Team B']
  },
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Technology', max: 30000 },
      { name: 'Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs Spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Team A'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Team B'
        }
      ]
    }
  ]
})

// K线图配置
const candlestickOption = ref<EChartsOption>({
  title: {
    text: 'Candlestick Chart',
    left: 'center',
    textStyle: { fontSize: 14 }
  },
  xAxis: {
    data: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06']
  },
  yAxis: {},
  tooltip: {
    trigger: 'axis'
  },
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42],
        [20, 34, 10, 38],
        [35, 30, 20, 40]
      ]
    }
  ]
})

// 条形图配置
const barOption = ref<EChartsOption>({
  title: {
    text: 'Bar Chart',
    left: 'center',
    textStyle: { fontSize: 14 }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  series: [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
})

// 仪表盘配置
const gaugeOption = ref<EChartsOption>({
  title: {
    text: 'Gauge Chart',
    left: 'center',
    textStyle: { fontSize: 14 }
  },
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '65%'],
      radius: '90%',
      min: 0,
      max: 100,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.25, '#FF6E76'],
            [0.5, '#FDDD60'],
            [0.75, '#58D9F9'],
            [1, '#7CFFB2']
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'auto',
          width: 2
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: 'auto',
          width: 5
        }
      },
      axisLabel: {
        color: '#464646',
        fontSize: 14,
        distance: -60,
        rotate: 'tangential'
      },
      title: {
        offsetCenter: [0, '-10%'],
        fontSize: 16
      },
      detail: {
        fontSize: 24,
        offsetCenter: [0, '-35%'],
        valueAnimation: true,
        color: 'inherit'
      },
      data: [
        {
          value: 70,
          name: 'Performance'
        }
      ]
    }
  ]
})
</script>

<template>
  <div>
    <h2>Chart Gallery</h2>
    <p>Explore various chart types supported by ECharts.</p>

    <div class="gallery-grid">
      <div class="gallery-item">
        <v-chart :option="pieOption" class="chart" autoresize />
      </div>

      <div class="gallery-item">
        <v-chart :option="barOption" class="chart" autoresize />
      </div>

      <div class="gallery-item">
        <v-chart :option="scatterOption" class="chart" autoresize />
      </div>

      <div class="gallery-item">
        <v-chart :option="radarOption" class="chart" autoresize />
      </div>

      <div class="gallery-item">
        <v-chart :option="candlestickOption" class="chart" autoresize />
      </div>

      <div class="gallery-item">
        <v-chart :option="gaugeOption" class="chart" autoresize />
      </div>
    </div>

    <details style="margin-top: 2rem">
      <summary style="cursor: pointer; margin-bottom: 1rem; color: #213547; font-weight: 600">About These Charts</summary>
      <div style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0">
        <ul style="line-height: 1.8; color: #213547">
          <li><strong style="color: #646cff">Pie Chart:</strong> Shows proportional data with interactive hover effects</li>
          <li><strong style="color: #646cff">Bar Chart:</strong> Horizontal bars for comparing values across categories</li>
          <li><strong style="color: #646cff">Scatter Chart:</strong> Displays relationships between two variables</li>
          <li><strong style="color: #646cff">Radar Chart:</strong> Multi-dimensional data comparison</li>
          <li><strong style="color: #646cff">Candlestick Chart:</strong> Financial data visualization (OHLC)</li>
          <li><strong style="color: #646cff">Gauge Chart:</strong> Progress or performance indicators</li>
        </ul>
      </div>
    </details>
  </div>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.gallery-item {
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart {
  width: 100%;
  height: 300px;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>

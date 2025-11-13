<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

// 共用的图表配置
const chartOption = ref<EChartsOption>({
  title: {
    text: 'Sample Chart',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Data',
      type: 'line',
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
})

const fullCode = `// Full Version - Import everything
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const option: EChartsOption = {
  // ... your chart options
}

// No manual registration needed!
// All ECharts features are available

<template>
  <v-chart :option="option" autoresize />
</template>`

const liteCode = `// Lite Version - Tree-shakeable
import { VChart } from 'vue-echarts-v3/lite'
import type { EChartsOption } from 'echarts'

// Manual registration required
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'

// Register only what you need
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
])

const option: EChartsOption = {
  // ... your chart options
}

<template>
  <v-chart :option="option" autoresize />
</template>`
</script>

<template>
  <div>
    <h2>Full vs Lite Versions</h2>
    <p>
      Vue ECharts v3 provides two entry points for different use cases. Choose the one that
      fits your project needs.
    </p>

    <div class="comparison-grid">
      <!-- Full Version -->
      <div class="comparison-card">
        <div class="card-header full">
          <h3>Full Version</h3>
          <span class="badge">Easy to Use</span>
        </div>

        <div class="chart-preview">
          <v-chart :option="chartOption"  class="chart" autoresize />
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h4>Advantages</h4>
            <ul>
              <li>Zero configuration needed</li>
              <li>All ECharts features available</li>
              <li>Perfect for prototyping</li>
              <li>Simpler imports</li>
            </ul>
          </div>
          <div class="cons">
            <h4>Trade-offs</h4>
            <ul>
              <li>Larger bundle size</li>
              <li>Includes unused features</li>
              <li>Not tree-shakeable</li>
            </ul>
          </div>
        </div>

        <details class="code-details">
          <summary>View Code Example</summary>
          <pre><code>{{ fullCode }}</code></pre>
        </details>
      </div>

      <!-- Lite Version -->
      <div class="comparison-card">
        <div class="card-header lite">
          <h3>Lite Version</h3>
          <span class="badge">Optimized Size</span>
        </div>

        <div class="chart-preview">
          <v-chart :option="chartOption"  class="chart" autoresize />
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h4>Advantages</h4>
            <ul>
              <li>Smaller bundle size</li>
              <li>Tree-shakeable</li>
              <li>Include only what you use</li>
              <li>Better for production</li>
            </ul>
          </div>
          <div class="cons">
            <h4>Trade-offs</h4>
            <ul>
              <li>Manual registration required</li>
              <li>More setup code</li>
              <li>Need to know component names</li>
            </ul>
          </div>
        </div>

        <details class="code-details">
          <summary>View Code Example</summary>
          <pre><code>{{ liteCode }}</code></pre>
        </details>
      </div>
    </div>

    <!-- Recommendation Section -->
    <div class="recommendation">
      <h3>Which One Should I Use?</h3>
      <div class="recommendation-grid">
        <div class="recommendation-item">
          <h4>Use Full Version When:</h4>
          <ul>
            <li>Prototyping or rapid development</li>
            <li>Using many different chart types</li>
            <li>Bundle size is not a concern</li>
            <li>You want simplicity over optimization</li>
          </ul>
        </div>
        <div class="recommendation-item">
          <h4>Use Lite Version When:</h4>
          <ul>
            <li>Building for production</li>
            <li>Using only specific chart types</li>
            <li>Bundle size optimization is important</li>
            <li>You know exactly what features you need</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bundle Size Comparison -->
    <div class="bundle-info">
      <h3>Bundle Size Impact</h3>
      <p>
        The Full version imports all of ECharts (~300KB minified), while the Lite version allows
        you to include only the components you need. For example, a simple line chart with Lite
        version might only be ~80KB minified.
      </p>
      <div class="size-bars">
        <div class="size-bar full-bar">
          <span class="label">Full Version</span>
          <div class="bar" style="width: 100%">
            <span class="size">~300KB</span>
          </div>
        </div>
        <div class="size-bar lite-bar">
          <span class="label">Lite Version (Line Chart Only)</span>
          <div class="bar" style="width: 27%">
            <span class="size">~80KB</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.comparison-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid;
}

.card-header.full {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom-color: #667eea;
}

.card-header.lite {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-bottom-color: #f093fb;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.chart-preview {
  padding: 1rem;
  background: #f8f9fa;
}

.chart {
  width: 100%;
  height: 250px;
}

.pros-cons {
  padding: 1.5rem;
  display: grid;
  gap: 1rem;
}

.pros h4,
.cons h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.pros ul,
.cons ul {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.8;
  color: #213547;
}

.pros li::marker {
  color: #4ade80;
}

.cons li::marker {
  color: #fb923c;
}

.code-details {
  margin: 0 1.5rem 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.code-details summary {
  cursor: pointer;
  font-weight: 500;
  user-select: none;
}

.code-details summary:hover {
  color: #646cff;
}

.code-details pre {
  margin: 1rem 0 0 0;
  padding: 1rem;
  background: #ffffff;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  border: 1px solid #e0e0e0;
}

.recommendation {
  margin: 3rem 0;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.recommendation h3 {
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-size: 1.5rem;
  color: #213547;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.recommendation-item h4 {
  margin: 0 0 1rem 0;
  color: #646cff;
  font-weight: 600;
}

.recommendation-item ul {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.8;
  color: #213547;
}

.bundle-info {
  margin: 2rem 0;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.bundle-info h3 {
  margin: 0 0 1rem 0;
  color: #213547;
}

.bundle-info p {
  margin: 0 0 2rem 0;
  line-height: 1.6;
  color: #475569;
}

.size-bars {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.size-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.size-bar .label {
  min-width: 220px;
  font-size: 0.875rem;
  color: #213547;
  font-weight: 500;
}

.size-bar .bar {
  flex: 1;
  max-width: 500px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  position: relative;
}

.full-bar .bar {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.lite-bar .bar {
  background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .recommendation-grid {
    grid-template-columns: 1fr;
  }

  .size-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .size-bar .label {
    min-width: auto;
  }
}
</style>

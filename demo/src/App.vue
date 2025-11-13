<script setup lang="ts">
import { ref } from 'vue'
import BasicChart from './views/BasicChart.vue'
import LoadingExample from './views/LoadingExample.vue'
import AutoResizeExample from './views/AutoResizeExample.vue'
import ThemeExample from './views/ThemeExample.vue'
import ComposableExample from './views/ComposableExample.vue'
import ChartGallery from './views/ChartGallery.vue'
import FullVsLite from './views/FullVsLite.vue'

const currentView = ref('basic')

const views = [
  { id: 'basic', name: 'Basic Chart' },
  { id: 'gallery', name: 'Chart Gallery' },
  { id: 'loading', name: 'Loading State' },
  { id: 'autoresize', name: 'Auto Resize' },
  { id: 'theme', name: 'Theme' },
  { id: 'composable', name: 'Composable API' },
  { id: 'fullvslite', name: 'Full vs Lite' }
]
</script>

<template>
  <div class="container">
    <header>
      <h1>Vue ECharts v3 Demo</h1>
      <p>Interactive examples demonstrating the Vue 3 ECharts component wrapper</p>
    </header>

    <nav class="controls">
      <button
        v-for="view in views"
        :key="view.id"
        :class="{ active: currentView === view.id }"
        @click="currentView = view.id"
      >
        {{ view.name }}
      </button>
    </nav>

    <main>
      <BasicChart v-if="currentView === 'basic'" />
      <ChartGallery v-if="currentView === 'gallery'" />
      <LoadingExample v-if="currentView === 'loading'" />
      <AutoResizeExample v-if="currentView === 'autoresize'" />
      <ThemeExample v-if="currentView === 'theme'" />
      <ComposableExample v-if="currentView === 'composable'" />
      <FullVsLite v-if="currentView === 'fullvslite'" />
    </main>

    <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #333">
      <p style="text-align: center; opacity: 0.7">
        Vue ECharts v3 - MIT License -
        <a href="https://github.com/xlsdg/vue-echarts-v3" target="_blank">GitHub</a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 3rem;
}

header p {
  opacity: 0.8;
  font-size: 1.1em;
}

button.active {
  background-color: #646cff;
  color: white;
  border-color: #646cff;
}

a {
  color: #646cff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

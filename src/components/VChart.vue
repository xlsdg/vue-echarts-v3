<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, toRef } from 'vue'
import { vChartProps, ECHARTS_EVENTS, type VChartEmits, type VChartExposed } from '../types'
import { useChartInstance } from '../composables/useChartInstance'

const props = defineProps(vChartProps)
const emit = defineEmits<VChartEmits>()

const root = ref<HTMLElement>()
const option = toRef(props, 'option')

// Computed properties
const manualUpdate = computed(() => props.updateOptions?.manual ?? false)

// Create event handlers that emit Vue events
const eventHandlers = ECHARTS_EVENTS.reduce(
  (handlers, eventName) => {
    handlers[eventName] = (event: unknown) => {
      emit(eventName as keyof VChartEmits, event as never)
    }
    return handlers
  },
  {} as Record<string, (event: unknown) => void>
)

// Use the core chart instance composable
const chartInstance = useChartInstance(root, option, {
  theme: props.theme,
  initOptions: props.initOptions,
  updateOptions: props.updateOptions,
  loadingOptions: props.loadingOptions,
  autoresize: props.autoresize,
  group: props.group,
  eventHandlers,
  onReady: (instance) => emit('ready', instance),
  onResize: (width, height) => emit('resize', width, height)
})

/**
 * Get ECharts instance
 */
const getInstance = () => chartInstance.chart.value

// Watch option changes
watch(
  () => props.option,
  (newOption) => {
    if (!manualUpdate.value) {
      chartInstance.setOption(newOption, props.updateOptions)
    }
  },
  { deep: true }
)

// Watch loading state
watch(
  () => props.loading,
  (loading) => {
    if (loading) {
      chartInstance.showLoading()
    } else {
      chartInstance.hideLoading()
    }
  }
)

// Watch group
watch(
  () => props.group,
  (newGroup) => {
    if (newGroup) {
      chartInstance.updateGroup(newGroup)
    }
  }
)

// Lifecycle hooks
onMounted(() => {
  chartInstance.initChart()
  chartInstance.setupResize()

  // Set initial option
  if (props.option) {
    chartInstance.setOption(props.option, props.updateOptions)
  }

  // Set initial loading state
  if (props.loading) {
    chartInstance.showLoading()
  }
})

onBeforeUnmount(() => {
  chartInstance.dispose()
})

// Expose methods to parent
defineExpose<VChartExposed>({
  getInstance,
  setOption: chartInstance.setOption,
  resize: chartInstance.resize,
  dispatchAction: chartInstance.dispatchAction,
  convertToPixel: chartInstance.convertToPixel,
  convertFromPixel: chartInstance.convertFromPixel,
  containPixel: chartInstance.containPixel,
  showLoading: chartInstance.showLoading,
  hideLoading: chartInstance.hideLoading,
  getDataURL: chartInstance.getDataURL,
  clear: chartInstance.clear,
  dispose: chartInstance.dispose
})
</script>

<template>
  <div ref="root" class="v-chart" />
</template>

<style scoped>
.v-chart {
  width: 100%;
  height: 100%;
}
</style>

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

vue-echarts-v3 is a Vue.js 3 component wrapper for Apache ECharts 5.x+. It provides a modern, type-safe integration with Vue 3's Composition API, featuring both component and composable interfaces for maximum flexibility.

**Key Features:**

- Vue 3 Composition API with TypeScript strict mode
- Dual API: Component-based and composable-based
- Tree-shakeable with full and lite entry points
- ResizeObserver for responsive behavior
- Comprehensive test coverage with Vitest
- Full documentation with VitePress

## Build System

The project uses **Vite** as its build tool with **vite-plugin-dts** for TypeScript declarations.

**Development commands:**

- `npm run dev` - Start demo development server (port 3000)
- `npm run build` - Build the library (includes type checking)
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint and fix code
- `npm run format` - Format code with Prettier

**Documentation & Demo:**

- `npm run docs:dev` - Start VitePress documentation dev server
- `npm run docs:build` - Build documentation for production
- `npm run demo:build` - Build demo application

**Release:**

- Version bumping and publishing is automated via GitHub Actions on release creation

## Architecture

### Directory Structure

```
src/
├── components/
│   └── VChart.vue          # Main Vue 3 component (Composition API)
├── composables/
│   └── useECharts.ts       # Composable for headless usage
├── types/
│   └── index.ts            # TypeScript type definitions
├── index.ts                # Full entry point (all ECharts)
├── lite.ts                 # Lite entry point (ECharts core only)
└── global.d.ts             # Global type augmentation

demo/                       # Demo application (Vite + Vue 3)
docs/                       # VitePress documentation
tests/                      # Vitest unit tests
```

### Entry Points

The library provides two entry points:

1. **`src/index.ts`** (Full) - Imports all ECharts (`import * as echarts from 'echarts'`)
   - Easier to use, all features available
   - Larger bundle size
   - Usage: `import { VChart } from 'vue-echarts-v3'`

2. **`src/lite.ts`** (Lite) - Imports only ECharts core (`import * as echarts from 'echarts/core'`)
   - Requires manual registration of charts/components
   - Smaller bundle size (tree-shakeable)
   - Usage: `import { VChart } from 'vue-echarts-v3/lite'`

### Core Component: `src/components/VChart.vue`

The main component is built with Vue 3's `<script setup>` and Composition API.

**Key Implementation Details:**

**Reactivity:**

- Uses `shallowRef` for ECharts instance (not deeply reactive)
- Uses `ref` for DOM element reference
- Deep watches `option` prop for changes
- Watches `loading` and `group` props reactively

**Lifecycle:**

- `onMounted()` - Initialize ECharts instance, bind events, setup resize observer
- `onBeforeUnmount()` - Dispose instance, cleanup events and observers

**Props:**

- `option` (required) - ECharts option configuration
- `theme` - Theme name or object
- `initOptions` - ECharts initialization options
- `updateOptions` - Options for setOption (notMerge, lazyUpdate)
- `loading` - Boolean to show/hide loading animation
- `loadingOptions` - Loading animation configuration
- `autoresize` - Enable ResizeObserver (boolean or config object)
- `group` - Group name for chart linking

**Events:**

- All ECharts events are bound and re-emitted as Vue events
- Special events: `ready` (instance ready), `resize` (chart resized)

**Exposed Methods:**

- `getInstance()`, `setOption()`, `resize()`, `clear()`, `dispose()`
- `dispatchAction()`, `convertToPixel()`, `convertFromPixel()`, `containPixel()`
- `showLoading()`, `hideLoading()`, `getDataURL()`

### Composable: `src/composables/useECharts.ts`

Provides a headless, composable API for advanced use cases.

**Usage Pattern:**

```typescript
const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({ ... })

const { chart, setOption, resize } = useECharts(
  chartRef,
  option,
  { autoresize: true },
  { click: (event) => console.log(event) }
)
```

**Features:**

- Automatic lifecycle management (onMounted/onBeforeUnmount)
- Optional manual mode (no automatic option watching)
- Event handler registration
- ResizeObserver integration
- Returns all ECharts instance methods

### Type Definitions: `src/types/index.ts`

All types are exported for TypeScript users:

- `VChartProps` - Component props types
- `VChartEmits` - Component event types
- `VChartExposed` - Exposed methods interface
- `UseEChartsOptions` - Composable options
- `EChartsEventName` - All supported event names

## TypeScript Configuration

The project uses **strict mode** TypeScript with comprehensive checks:

**Three tsconfig files:**

1. `tsconfig.json` - Base config for IDE and development
2. `tsconfig.build.json` - Build-specific (declaration generation)
3. `tsconfig.node.json` - For build tools (Vite, Vitest configs)

**Key compiler options:**

- `strict: true` with all sub-options enabled
- `noUnusedLocals`, `noUnusedParameters`
- `noImplicitReturns`, `noUncheckedIndexedAccess`
- `moduleResolution: "bundler"`

## Testing

Uses **Vitest** with **@vue/test-utils** for Vue 3 component testing.

**Test Setup** (`tests/setup.ts`):

- Mocks ResizeObserver (not available in jsdom)
- Mocks HTMLCanvasElement.getContext for ECharts
- Configures Vue Test Utils

**Running Tests:**

- `npm test` - Watch mode
- `npm run test:coverage` - Coverage report (80% threshold)
- `npm run test:ui` - Vitest UI

## Development Workflow

### Local Development

1. Install dependencies: `npm install`
2. Start demo: `npm run dev`
3. Open browser at `http://localhost:3000`
4. Edit source files in `src/` - HMR enabled
5. Edit demo files in `demo/src/` - HMR enabled

### Adding New Features

1. Update types in `src/types/index.ts`
2. Implement in `src/components/VChart.vue` and/or `src/composables/useECharts.ts`
3. Add tests in `tests/unit/`
4. Update documentation in `docs/`
5. Add demo example in `demo/src/views/`

### Before Committing

1. Run type check: `npm run type-check`
2. Run tests: `npm test`
3. Run linter: `npm run lint`
4. Format code: `npm run format`
5. Build to verify: `npm run build`

## CI/CD

### GitHub Actions Workflows

**`.github/workflows/test.yml`** - Runs on push/PR

- Tests on Ubuntu, Windows, macOS
- Node versions: 18.x, 20.x
- Runs linting, type-check, tests, and builds
- Uploads coverage to Codecov

**`.github/workflows/publish.yml`** - Runs on release creation

- Builds and publishes to npm with provenance
- Requires `NPM_TOKEN` secret

**`.github/workflows/pages.yml`** - Runs on push to main

- Builds VitePress docs and demo
- Deploys to GitHub Pages

## Important Notes

**ResizeObserver:**

- Native browser API (no external dependencies)
- Throttled to avoid excessive resize calls
- Default throttle: 100ms (configurable)

**Component Name:**

- Component is named `VChart` (not IEcharts from v2)
- Exported as both named export and default

**Build Output:**

- `dist/index.js` - ESM (full version)
- `dist/index.cjs` - CommonJS (full version)
- `dist/index.umd.js` - UMD (full version)
- `dist/lite.js`, `dist/lite.cjs` - Lite versions
- `dist/types/` - TypeScript declarations

**Breaking Changes from v2:**

- Vue 3 only (no Vue 2 support)
- Props renamed: `resizable` → `autoresize`, `notMerge` → part of `updateOptions`
- Component name: `IEcharts` → `VChart`
- No lodash.throttle dependency (native throttling)
- No element-resize-detector (uses ResizeObserver)

## Troubleshooting

**TypeScript errors during development:**

- Run `npm run type-check` to see all errors
- Check `tsconfig.json` for strict mode settings
- Ensure all props are properly typed

**Tests failing:**

- Check `tests/setup.ts` for proper mocks
- ResizeObserver and Canvas mocks are required
- Run `npm run test:ui` for interactive debugging

**Build failures:**

- Verify `vite.config.ts` external dependencies
- Check `package.json` exports field
- Ensure no TypeScript errors: `npm run type-check`

**Demo not working:**

- Check `demo/vite.config.ts` alias configuration
- Ensure ECharts modules are registered in `demo/src/main.ts`
- Verify source files exist in `src/`

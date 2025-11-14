# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

vue-echarts-v3 is a Vue.js 3 component wrapper for Apache ECharts. It provides both a component-based interface (`VChart`) and a composable API (`useECharts`) built with the Composition API. The library is written in TypeScript with strict mode and uses Vite for building and testing.

## Commands

### Development

```bash
npm run dev                    # Run demo app with Vite
npm run preview               # Preview demo app
```

### Building

```bash
npm run build                 # Build library (runs type-check first)
npm run demo:build           # Build demo app
```

### Type Checking

```bash
npm run type-check           # Type check library source
npm run type-check:demo      # Type check demo code
npm run type-check:test      # Type check test code
npm run type-check:all       # Type check everything
```

### Testing

```bash
npm test                     # Run tests in watch mode
npm run test:ui              # Run tests with UI
npm run test:coverage        # Run tests with coverage (requires 95% lines/functions, 90% branches)
```

### Linting & Formatting

```bash
npm run lint                 # ESLint with auto-fix
npm run format               # Format with Prettier
```

### Documentation

```bash
npm run docs:dev            # Run VitePress docs in dev mode
npm run docs:build          # Build VitePress docs
npm run docs:preview        # Preview built docs
```

## Architecture

### Entry Points

The library has two main entry points:

1. **Full Version** (`src/index.ts`): Imports `echarts` (full bundle) and exports VChart component with all ECharts modules available. Use when bundle size is not a concern.

2. **Lite Version** (`src/lite.ts`): Imports `echarts/core` only and requires manual registration of ECharts components. Recommended for production to enable tree-shaking and reduce bundle size.

Both export the same component, composable, and types - the only difference is the ECharts import strategy.

### Core Architecture Layers

The codebase follows a layered architecture with clear separation of concerns:

#### 1. Core Layer (`src/composables/useChartInstance.ts`)

The single source of truth for all ECharts instance management logic. This composable:

- Manages chart initialization, disposal, and lifecycle
- Handles all ECharts API calls (setOption, resize, etc.)
- Manages event binding/unbinding
- Integrates resize observer for autoresize functionality
- Provides error handling and logging for all operations

This is used by BOTH the VChart component and the useECharts composable, ensuring consistent behavior.

#### 2. High-Level Composable (`src/composables/useECharts.ts`)

A user-facing composable that adds convenience features on top of useChartInstance:

- Automatic option watching (unless `manual: true`)
- Loading state management
- Group management
- Lifecycle integration (onMounted, onBeforeUnmount)

#### 3. Component Layer (`src/components/VChart.vue`)

The Vue component interface that uses useChartInstance directly and:

- Converts props to reactive refs
- Emits Vue events for all ECharts events
- Exposes methods via defineExpose
- Handles prop watching and updates

### Utility Modules

- **`src/utils/ref-helpers.ts`**: Helper functions for unwrapping refs and extracting throttle values
- **`src/utils/resize-observer.ts`**: Creates throttled ResizeObserver instances for autoresize
- **`src/utils/logger.ts`**: Consistent logging with `[VChart]` prefix
- **`src/utils/validation.ts`**: Validation utilities (if present)

### Type Definitions

All types are centralized in `src/types/index.ts`:

- Component props (`vChartProps`, `VChartProps`)
- Component emits (`VChartEmits`)
- Component exposed methods (`VChartExposed`)
- ECharts event names (`ECHARTS_EVENTS` constant array)
- Extended types (`SetOptionOpts` with `manual` flag)

## Key Design Patterns

### 1. Single Source of Truth

`useChartInstance` is the ONLY place where ECharts instance logic lives. Both VChart and useECharts use it, preventing duplication and ensuring consistency.

### 2. Ref Unwrapping

Options can be passed as either plain values or Refs. The `unwrapRef` utility handles this uniformly throughout the codebase.

### 3. Error Handling

All ECharts operations are wrapped in try-catch blocks with logging via the logger utility. This prevents errors from breaking the application.

### 4. Event System

ECharts events are defined in a constant array (`ECHARTS_EVENTS`) and programmatically bound. The component emits Vue events for all ECharts events.

### 5. Autoresize Implementation

Uses native ResizeObserver with throttling (default 100ms) instead of external libraries like element-resize-detector.

## Test Coverage Requirements

The project has strict test coverage requirements enforced by Vitest:

- **Lines**: 95%
- **Functions**: 95%
- **Branches**: 90%
- **Statements**: 95%

Tests are located in `tests/unit/` and use:

- Vitest with jsdom environment
- @vue/test-utils for component testing
- Setup file at `tests/setup.ts`

## TypeScript Configuration

Multiple tsconfig files for different contexts:

- `tsconfig.json`: Base configuration for library source
- `tsconfig.build.json`: Build-specific configuration
- `tsconfig.demo.json`: Demo app configuration
- `tsconfig.test.json`: Test files configuration

The project uses TypeScript in strict mode.

## Build Output

Vite builds the library to `dist/` with:

- **ES modules**: `index.js`, `lite.js`
- **CommonJS**: `index.cjs`, `lite.cjs`
- **Type definitions**: `dist/types/`
- **Sourcemaps**: Included for debugging

External dependencies (vue, echarts) are not bundled.

## Important Patterns to Follow

### When Adding New Features

1. If it involves ECharts instance logic, add it to `useChartInstance.ts`
2. If it's a convenience feature, consider adding to `useECharts.ts`
3. Update component props in `src/types/index.ts` if needed
4. Add tests with sufficient coverage
5. Update types and ensure type-check passes

### When Modifying ECharts Logic

All changes to ECharts initialization, options, events, or lifecycle must go through `useChartInstance.ts`. Never interact with the ECharts instance directly in the component or high-level composable.

### When Adding Dependencies

Check if it should be a:

- **peerDependency**: User-provided (vue, echarts)
- **devDependency**: Build/test tools only
- **dependency**: Avoid if possible to keep the library lightweight

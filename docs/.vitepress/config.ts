import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue ECharts v3',
  description: 'Vue.js 3 component wrapper for Apache ECharts',
  base: '/vue-echarts-v3/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/component' },
      { text: 'Demo', link: 'https://xlsdg.github.io/vue-echarts-v3/demo' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        },
        {
          text: 'Usage',
          items: [
            { text: 'Basic Usage', link: '/guide/basic-usage' },
            { text: 'Props & Events', link: '/guide/props-events' },
            { text: 'Composable API', link: '/guide/composable' },
            { text: 'TypeScript', link: '/guide/typescript' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Migration from v2', link: '/guide/migration' },
            { text: 'Tree Shaking', link: '/guide/tree-shaking' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Component API', link: '/api/component' },
            { text: 'Composable API', link: '/api/composable' },
            { text: 'Types', link: '/api/types' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xlsdg/vue-echarts-v3' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    },

    search: {
      provider: 'local'
    }
  }
})

import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'dist-demo/**',
      'demo/dist-demo/**',
      'node_modules/**',
      'coverage/**',
      '**/*.d.ts',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**'
    ]
  },

  // Base ESLint recommended config
  js.configs.recommended,

  // Vue recommended config (flat format)
  ...vue.configs['flat/recommended'],

  // TypeScript-specific config
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // Use TypeScript's no-redeclare to handle function overloads
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error'
    }
  },

  // Vue files with TypeScript
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParser
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'warn',
      // Use TypeScript's no-redeclare to handle function overloads
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error'
    }
  },

  // General rules for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'prefer-const': 'error'
    }
  },

  // Relaxed rules for test and type definition files
  {
    files: ['tests/**/*.{ts,spec.ts,test.ts}', '**/*.d.ts'],
    rules: {
      'no-undef': 'off', // TypeScript handles type checking
      'no-console': 'off', // Console is common in tests
      '@typescript-eslint/no-explicit-any': 'off', // Any is common in test mocks
      '@typescript-eslint/no-non-null-assertion': 'off' // Common in tests
    }
  },

  // Prettier config to disable conflicting rules (must be last)
  prettier
]

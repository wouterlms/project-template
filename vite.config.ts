import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

import createRouteMap from '@wouterlms/create-route-map'

import iconTransformer from '@wouterlms/icons/transformer'

import { checker } from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    iconTransformer(),
    vue(),
    Components({
      dirs: ['./src'],
      dts: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
      ],
    }),
    vueI18n({
      include: './src/i18n/locales/**',
    }),
    checker({
      typescript: true,
    }),
    createRouteMap({
      basePath: './src',
      outputPath: './src/routes.ts',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  server: {
    port: 3000,
  },
})

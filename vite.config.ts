import { fileURLToPath, URL } from 'node:url'
import icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  plugins: [
    icons({
      compiler: 'web-components',
      webComponents: {
        autoDefine: true,
      },
      scale: 1,
      defaultStyle: 'width: 100%; height: 100%;',
    }),
  ],
})

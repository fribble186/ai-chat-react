import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssInject from "vite-plugin-css-injected-by-js"
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] }), cssInject()],
  build: {
    lib: {
      entry: {
        "index": resolve(__dirname, 'lib/index.tsx'),
      },
      name: 'AIChatComponent',
      fileName: (format, entryName) => {
        return `${entryName}.${format}.js`
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
    },
    outDir: 'dist'
  }
})

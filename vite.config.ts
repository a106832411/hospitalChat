import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'], // 自动导入 Vue Composition API，例如 ref、reactive 等
      dts: 'src/auto-imports.d.ts', // 生成类型声明文件（可选）
    }),
  ],
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 3000, // 开发服务器端口
    open: false, // 启动时不自动打开浏览器
    cors: true, // 允许跨域
  },
  preview: {
    host: '0.0.0.0', // 预览服务器监听所有地址
    port: 4173, // 预览服务器端口
    open: false, // 启动时不自动打开浏览器
  },
  build: {
    outDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录
    sourcemap: false, // 生产环境不生成 sourcemap
    minify: 'terser', // 使用 terser 压缩
    chunkSizeWarningLimit: 1000, // chunk 大小警告阈值
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          utils: ['lodash', 'axios'],
        },
      },
    },
  },
})

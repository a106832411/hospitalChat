module.exports = {
  apps: [
    {
      name: 'vue3-app-dev', // 开发环境应用名称
      script: 'pnpm',
      args: 'dev',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'vue3-app-preview', // 生产预览应用名称
      script: 'pnpm',
      args: 'preview',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '300M',
      instances: 2, // 集群模式，2个实例
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}

# PM2 部署指南

## 安装 PM2

首先，全局安装 PM2：

```bash
npm install -g pm2
# 或
pnpm add -g pm2
```

## 使用方法

### 1. 开发环境启动

```bash
# 使用 PM2 启动开发服务器
pnpm run pm2:dev

# 或直接使用 PM2 命令
pm2 start ecosystem.config.cjs --only vue3-app-dev
```

### 2. 生产环境预览

首先构建项目：

```bash
pnpm run build
```

然后使用 PM2 启动预览服务器：

```bash
# 使用 PM2 启动预览服务器（集群模式，2个实例）
pnpm run pm2:preview

# 或直接使用 PM2 命令
pm2 start ecosystem.config.cjs --only vue3-app-preview
```

### 3. 同时启动所有服务

```bash
pnpm run pm2:start
```

## PM2 常用命令

### 查看进程状态

```bash
pm2 list
# 或
pm2 status
```

### 查看日志

```bash
# 查看所有日志
pnpm run pm2:logs

# 查看特定应用日志
pm2 logs vue3-app-dev
pm2 logs vue3-app-preview
```

### 监控

```bash
# 实时监控
pnpm run pm2:monit

# 或
pm2 monit
```

### 重启服务

```bash
# 重启所有服务
pnpm run pm2:restart

# 重启特定服务
pm2 restart vue3-app-dev
pm2 restart vue3-app-preview
```

### 停止服务

```bash
# 停止所有服务
pnpm run pm2:stop

# 停止特定服务
pm2 stop vue3-app-dev
pm2 stop vue3-app-preview
```

### 删除服务

```bash
# 删除所有服务
pnpm run pm2:delete

# 删除特定服务
pm2 delete vue3-app-dev
pm2 delete vue3-app-preview
```

## PM2 配置说明

配置文件：`ecosystem.config.cjs`

### 开发环境配置 (vue3-app-dev)
- **端口**: 3000
- **模式**: 单实例
- **自动重启**: 启用
- **内存限制**: 500M

### 生产环境配置 (vue3-app-preview)
- **端口**: 4173
- **模式**: 集群模式（2个实例）
- **自动重启**: 启用
- **内存限制**: 300M

## 开机自启动

```bash
# 保存当前进程列表
pm2 save

# 生成开机自启动脚本
pm2 startup

# 按照提示执行生成的命令
```

## 注意事项

1. 确保已安装所有依赖：`pnpm install`
2. 生产环境预览前需先构建：`pnpm run build`
3. 首次使用需要全局安装 PM2
4. 可以根据实际需求调整 `ecosystem.config.cjs` 中的配置

## 服务访问地址

- **开发环境**: http://localhost:3000
- **生产预览**: http://localhost:4173

import { createApp } from 'vue'
import App from './App.vue'
// 引入 vue-router
import router from './router'
// 引入 pinia

//引入element-plus-x
import ElementPlusX from 'vue-element-plus-x'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import store from './store'
import './assets/css/index.css'
import 'animate.css'
// 单独引入 ElMessage 和 ElMessageBox 的样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
const app = createApp(App)

app.use(ElementPlus)
app.use(ElementPlusX)
app.use(router)
app.mount('#app')

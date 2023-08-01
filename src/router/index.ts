import { createRouter, createWebHashHistory} from 'vue-router'
import {constRoutes} from "./routes.ts";


//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。





const router = createRouter({
    history: createWebHashHistory(),
    routes:constRoutes
})

//导出router
export default router;

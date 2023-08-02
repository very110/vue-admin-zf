import { createRouter, createWebHashHistory} from 'vue-router'
import {constRoutes} from "./routes.ts";


//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。





const router = createRouter({
    history: createWebHashHistory(),
    routes:constRoutes
})

//导出router
export default router;

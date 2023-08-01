import router from "@/router/index.ts";
import store from "@/store/index.ts"
import {ElMessage} from "element-plus";

import NProgress from 'accessible-nprogress'
 import 'accessible-nprogress/src/styles.css'

import {useUserStore} from "@/store/module/user.ts";
let userStore = useUserStore(store);
router.beforeEach(async (to, from, next)=>{
    NProgress.start();
    let token=userStore.token;
        let userName=userStore.avatar;
        if (token){
            if (to.path==='/login'){
                next('/');
            }
            if (userName){
                next();
            }else{
                try {
                    await userStore.userInfo();
                    next({...to})
                }catch (e){
                   await userStore.userLogout().catch(()=>{
                        ElMessage({
                            message: '退出失败',
                            type: 'error',
                        })
                    })
                    ElMessage({
                        message: '登录过期请重新登录',
                        type: 'warning',
                    })
                    next({path:'/login', query:{ redirect: to.path}})
                }
            }
        }else{
            if (to.path==='/login'){
                next()
            }else{
                next({path:'/login', query:{ redirect: to.path}})
            }
        }
})

router.afterEach((to, from, failure)=>{
    NProgress.done();
})

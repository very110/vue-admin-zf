import {defineStore} from "pinia"
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index.ts'
import type {
    loginFormData,
    loginResponseData,
    userInfoReponseData,
} from '@/api/user/type.ts';
import {SET_TOKEN,GET_TOKEN,REMOVE_TOKEN} from "@/utils/token.ts";
import {asyncRoute,constRoutes,anyRoute} from "@/router/routes.ts"
import router from "@/router/index.ts";
import {cloneDeep} from "lodash";

const filterRouter=(route:any,asyncRoute:any)=>{

    // @ts-ignore
    return asyncRoute.filter(item=>{
        if (route.includes(item.name)){
            if (item.children){
                item.children=filterRouter(route,item.children)
            }
            return true;
        }
        return false;
    })
}

export const useUserStore = defineStore('User', {
    state: () => {
        return {
            token:GET_TOKEN(),
            username: '',
            avatar: '',
            buttons:[],
            menuRoutes:constRoutes
        }
    },
    actions: {
       async userLogin(loginForm:loginFormData){
              let result= await reqLogin(loginForm);
                if (result.code===200){
                    this.token=result.data;
                    SET_TOKEN(this.token);
                    return "成功"
                }else{//其实else走的是0到299的状态码,299以上的被响应拦截器栏下并返回一个失败的promise,失败的promise是会触发错误的直接在请求那行就结束当前运行了
                    return Promise.reject(new Error(result.data))
                }
        },
        async userInfo(){
           let result=await reqUserInfo();
           if (result.code===200){
               this.avatar=result.data.avatar;
               this.username=result.data.name;
               this.buttons=result.data.buttons;
               const permissionsRoute=filterRouter(result.data.routes,cloneDeep(asyncRoute));

               this.menuRoutes=[...constRoutes,...permissionsRoute,...anyRoute];
               this.menuRoutes.forEach((item)=>{
                    router.addRoute(item);
               })
               return 'ok'
           }
           return Promise.reject(new Error(result.message))
        },
        async userLogout(){
            let result=await reqLogout();
            if (result.code===200){
                this.token='';
                this.avatar='';
                this.username='';
                REMOVE_TOKEN();
                return 'ok'
            }
            return Promise.reject(new Error(result.message));
        }
    },
    getters: {}
})

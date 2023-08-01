import {defineStore} from "pinia"
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type {
    loginFormData,
    loginResponseData,
    userInfoReponseData,
} from '@/api/user/type';
import {SET_TOKEN,GET_TOKEN,REMOVE_TOKEN} from "@/utils/token.ts";

export const useUserStore = defineStore('User', {
    state: () => {
        return {
            token:GET_TOKEN(),
            username: '',
            avatar: '',
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
               this.username=result.data.name;//先暂时这样,权限按钮和路由后面再做
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

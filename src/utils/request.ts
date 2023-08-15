import axios from "axios";
import { ElMessage } from "element-plus";
import {useUserStore} from "@/store/module/user.ts";
import {map} from "lodash";
const request=axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:5000
})
const retryCount=2;
const retryMap=new Map();
const retry:Function=(method:string,url:string,count:number)=>{
    return request({
        method,
        url,
        headers:{
            noRetry:true
        }
    }).catch(err=>{
        if (count>0){
            return new Promise((resolve, reject)=>{
               setTimeout(()=>{
                   resolve(retry(method,url,count-1));
               },2500)
            })
        }else{
           return Promise.reject(err)
        }
    })
}
request.interceptors.request.use( (config)=>{
    let userStore=useUserStore();
    let token=userStore.token;
    if (userStore.token){
        config.headers.token=token;
    }
    return config;
})

request.interceptors.response.use( (response)=>{
        return response.data;
},async (error)=>{
    console.log(error.config)
    let url=error.config.url;
    let method=error.config.method;
    if (!retryMap.has(url)){
        retryMap.set(url,retryCount);
    }
    let msg = '';
    let status = error.response?.status;

    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
           try {
               if (method==='get'&&!error.config.headers.noRetry){
                   console.log(error.config.headers.noRetry)
                   let result =await retry(method,url,retryMap.get(url));
                   console.log(result);
                   retryMap.delete(url)
                   msg='已重新加载成功'
                   ElMessage({
                       type: 'success',
                       message: msg
                   })
                   return Promise.resolve(result);
               }else{
                   msg = "无网络";
               }
           }catch (e) {
               msg = "无网络";
           }
    }
    if (!error.config.headers.noRetry){
        ElMessage({
            type: 'error',
            message: msg
        })
    }else{
        ElMessage({
            type: "warning",
            message: '重试中'
        })
    }
    return Promise.reject(error);
})


export default request;

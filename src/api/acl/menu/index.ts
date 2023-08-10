import request from '@/utils/request'
import type { PermisstionResponseData, MenuParams } from './type'
//枚举地址
enum API {
    //获取全部菜单与按钮的标识数据
    ALLPERMISSTION_URL = '/admin/acl/permission',
    //给某一级菜单新增一个子菜单
    ADDMENU_URL = '/admin/acl/permission/save',
    //更新某一个已有的菜单
    UPDATE_URL = '/admin/acl/permission/update',
    //删除已有的菜单
    DELETEMENU_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermisstion=()=>request.get<any,PermisstionResponseData>(API.ALLPERMISSTION_URL);

export const reqAddOrUpdateMenu=(data:MenuParams)=>{
    if (data.id){
        return request.put(API.UPDATE_URL,data)
    }else{
       return request.post(API.ADDMENU_URL,data);
    }
}
export const reqDeleteMenu=(id:number)=>request.delete(API.DELETEMENU_URL+id);

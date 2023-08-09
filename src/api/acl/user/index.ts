import request from '@/utils/request'
import type {
    UserResponseData,
    User,
    AllRoleResponseData,
    SetRoleData,
} from './type'

enum API {
    //获取全部已有用户账号信息
    ALLUSER_URL = '/admin/acl/user/',
    //添加一个新的用户账号
    ADDUSER_URL = '/admin/acl/user/save',
    //更新已有的用户账号
    UPDATEUSER_URL = '/admin/acl/user/update',
    //获取全部职位,当前账号拥有的职位接口
    ALLROLEURL = '/admin/acl/user/toAssign/',
    //给已有的用户分配角色接口
    SETROLE_URL = '/admin/acl/user/doAssignRole',
    //删除某一个账号
    DELETEUSER_URL = '/admin/acl/user/remove/',
    //批量删除的接口
    DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo=(page:number,limit:number)=>request.get<any,UserResponseData>(API.ALLUSER_URL+`${page}/${limit}`);

export const reqAddOrUpdate=(data:User)=>{
        if (data.id){
            return request.put(API.UPDATEUSER_URL,data);
        }else{
            return request.post(API.ADDUSER_URL,data);
        }
}

export const reqAllRole=(id:number)=>request.get<any,AllRoleResponseData>(API.ALLROLEURL+`${id}`);

export const reqSetUserRole=(data:SetRoleData)=>request.post<any,any>(API.SETROLE_URL,data);

export const reqRemoveUser=(id:number)=>request.delete(API.DELETEUSER_URL+`${id}`);

export const reqSelectUser=(data:any)=>request.delete(API.DELETEALLUSER_URL,{
    data
})

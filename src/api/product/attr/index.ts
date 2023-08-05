import request from "@/utils/request.ts";
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
enum API {
    C1_URL = '/admin/product/getCategory1',
    //获取二级分类接口地址
    C2_URL = '/admin/product/getCategory2/',
    //获取三级分类接口地址
    C3_URL = '/admin/product/getCategory3/',
    //获取分类下已有的属性与属性值
    ATTR_URL = '/admin/product/attrInfoList/',
    //添加或者修改已有的属性的接口
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
    //删除某一个已有的属性
    DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqC1=()=>request.get<any,CategoryResponseData>(API.C1_URL);

export const reqC2=(c1:number|string)=>request.get<any,CategoryResponseData>(API.C2_URL+`${c1}`);

export const reqC3=(c2:number|string)=>request.get<any,CategoryResponseData>(API.C3_URL+`${c2}`);

export const reqAttr=(c1:number|string,c2:number|string,c3:number|string)=>request.get<any,AttrResponseData>(API.ATTR_URL+`${c1}/${c2}/${c3}`)


export const reqDelete=(attrId:string|number)=>request.delete<any,Response>(API.DELETEATTR_URL+`${attrId}`);

export const reqAddOrUpdateAttr=(data:Attr)=>request.post<any,Response>(API.ADDORUPDATEATTR_URL,data);

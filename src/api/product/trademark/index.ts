import request from "@/utils/request.ts";
import type{TradeMarkResponseData} from './type.ts'
enum API{
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    //添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //修改已有品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    //删除已有品牌
    DELETE_URL = '/admin/product/baseTrademark/remove/',
}


export const reqHasTrademark=(page:number,limit:number)=>{
   return  request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)
}


export const reqDeleteTrademark=(id:number)=>{
    return  request.delete<any,ResponseData>(API. DELETE_URL+`${id}`);
}

export const reqAddAndUpdateTrademark=(data:any)=>{
        if (data.id){
            return  request.put<any,ResponseData>(API.UPDATETRADEMARK_URL,data);
        }
        return request.post<any,ResponseData>(API.ADDTRADEMARK_URL,data);
}

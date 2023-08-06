type types='txt'|'tag'|'callback'|'slot';
import type{ComputedRef} from "vue";
export interface TableColumns<U extends Object>{
    types?:types,
    prop?:keyof U|any,
    label?:string,
    width?:number,
    callback?:(row:U,...args:any[])=>any |any,//默认插槽对数据进行操作
    slotName?:string,//默认插槽
    slotHeader?:string//头部信息插槽
    [key: string]: any
}

export interface TableConfig<T extends Object> {
        columns:TableColumns<T>[]
}


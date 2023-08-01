type types='txt'|'tag'|'callback'|'slot';
export interface TableColumns<U extends Object>{
    types:types,
    prop:keyof U,
    label:string,
    width?:number,
    callback?:(row:U)=>any,//默认插槽对数据进行操作
    slotName?:string,//默认插槽
    slotHeader?:string//头部信息插槽
}

export interface TableConfig<T extends Object> {
        columns:TableColumns<T>[]
}


import type{FormItemRule} from "element-plus";

type Type ='slot'|'radio';
export interface childrenItem<T> {
    elementName:string|any,
    mySlotName?:string[],//mySlotName和slotName是一 一对应的,不然无法对每个插槽做单独处理
    slotName?:string[],
    vModel?:keyof T,
    label?:string
}
export interface FormItem<T>{
    bind:{
        label?:string,
        prop:keyof T,
        rules?:FormItemRule
    },
    element?:childrenItem<T>,
    type?:Type
}
export interface FormConfig<T>{
    formItems:FormItem<T>[],
    confirmAndReset?:{
        validateSuccess:()=>void,
        align?:'center'|'left'|'right'
    }
}


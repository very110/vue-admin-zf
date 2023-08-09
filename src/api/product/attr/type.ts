//分类相关的数据ts类型

//分类ts类型
export interface CategoryObj {
    id: number | string
    name: string
    category1Id?: number
    category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}


export interface AttrValue {
    id?: number
    valueName: string
    attrId?: number
    flag?: boolean
}

export type AttrValueList = AttrValue[]

export interface Attr {
    id?: number
    attrName: string
    categoryId: number | string
    categoryLevel: number
    attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
    data: Attr[]
}

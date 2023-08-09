export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface SpuData {
    category3Id: string | number
    id?: number
    spuName: string
    tmId: number | string
    description: string
    spuImageList: null | SpuImg[]
    spuSaleAttrList: null | SaleAttr[]
}

export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        searchCount: boolean
        pages: number
    }
}


export interface Trademark {
    id: number
    tmName: string
    logoUrl: string
}

export interface AllTradeMark extends ResponseData {
    data: Trademark[]
}


export interface SpuImg {
    id?: number
    imgName?: string
    imgUrl?: string
    createTime?: string
    updateTime?: string
    spuId?: number
    name?: string
    url?: string
}

export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}


export interface SaleAttrValue {
    id?: number
    createTime?: null
    updateTime?: null
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrValueName: string
    saleAttrName?: string
    isChecked?: null
}

export type SpuSaleAttrValueList = SaleAttrValue[]


export interface SaleAttr {
    id?: number
    createTime?: null
    updateTime?: null
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrName: string
    spuSaleAttrValueList: SpuSaleAttrValueList
    flag?: boolean
    saleAttrValue?: string
}

export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}


export interface HasSaleAttr {
    id: number
    name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}

export interface Attr {
    attrId: number | string //平台属性的ID
    valueId: number | string //属性值的ID
}

export interface saleArr {
    saleAttrId: number | string //属性ID
    saleAttrValueId: number | string //属性值的ID
}
export interface SkuData {
    category3Id: string | number //三级分类的ID
    spuId: string | number //已有的SPU的ID
    tmId: string | number //SPU品牌的ID
    skuName: string //sku名字
    price: string | number //sku价格
    weight: string | number //sku重量
    skuDesc: string //sku的描述
    skuAttrValueList?: Attr[]
    skuSaleAttrValueList?: saleArr[]
    skuDefaultImg: string //sku图片地址
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}

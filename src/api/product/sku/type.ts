export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Attr {
  id?: number
  attrId: number | string
  valueId: number | string
}
export interface saleArr {
  id?: number
  saleAttrId: number | string
  saleAttrValueId: number | string
}
export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg?: string //sku图片地址
  isSale?: number //控制商品的上架与下架
  id?: number
}


export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}


export interface SkuInfoData extends ResponseData {
  data: SkuData
}

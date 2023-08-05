import type { RouteRecordRaw } from 'vue-router'
import {CategoryObj} from "@/api/product/attr/type.ts";
//定义小仓库数据state类型
export interface UserState {
    token: string | null
    menuRoutes: RouteRecordRaw[]
    username: string
    avatar: string
    buttons: string[]
}
export interface CategoryState {
    c1Id: string | number
    c1Arr: CategoryObj[]
    c2Arr: CategoryObj[]
    c2Id: string | number
    c3Arr: CategoryObj[]
    c3Id: string | number
}

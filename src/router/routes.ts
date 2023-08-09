import type{RouteRecordRaw} from "vue-router";

export const constRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        meta:{
            icon:'',
            title:'登录',
            hidden: true
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path:'/',
        name:'layout',
        redirect:'/home',
        component:()=>import('@/layout/index.vue'),
        meta:{
            icon:'',
            title:'',
        },
        children:[
            {
                path:'/home',
                name:'home',
                component:()=>import('@/views/home/index.vue'),
                meta:{
                    icon:'HomeFilled',
                    title:'首页'
                }
            }
        ]
    },
    {
        path: '/404',
        meta:{
            hidden: true
        },
        component: () => import('@/views/404/index.vue')
    }
]

export const asyncRoute=[
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            icon: 'ShoppingCartFull',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingTrolley',
                },
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'ChromeFilled',
                },
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    icon: 'Brush',
                },
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    icon: 'Magnet',
                },
            },
        ],
    },
];

export const anyRoute = [
    {
    path: '/:pathMatch(.*)?',
        meta:{
            hidden: true
        },
    component: () => import('@/views/404/index.vue')
    }
]



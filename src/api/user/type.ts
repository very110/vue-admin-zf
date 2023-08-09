//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
    username: string
    password: string
}



//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: string
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]|any
        roles: string[]
        name: string
        avatar: string
    }
}

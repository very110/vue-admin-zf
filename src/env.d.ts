/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_SERVE: string;
    VITE_APP_BASE_API: string;
    VITE_APP_TITLE: string;
    VITE_BAIDU_API:string;
    VITE_APP_LOGO:string,
    VITE_APP_MODE:string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv,
}

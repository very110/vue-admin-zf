import {ref,reactive,toRef,toRefs} from "vue";

interface Themes {
    [name: string]: {
        bgColor: string;
        textColor: string;
        loginBg: string;
        menuAndTabbarBG:string;
        borderColor:string
    };
}

const themes: Themes = {
    dark: {
        bgColor: '#242c51',
        textColor: '#cddbf1',
        loginBg: '#242c51',
        menuAndTabbarBG:'#242c51',
        borderColor:'#415094'
    },
    light: {
        bgColor: '#ecf0f3',
        textColor: '#000',
        loginBg: '#ecf0f3',
        menuAndTabbarBG:'#f5f9fa',
        borderColor:'#ebeef5'
    }
}

interface Theme {
    bgColor: string;
    textColor: string;
    loginBg: string;
    menuAndTabbarBG:string
}

let el: DOMStringMap = document.documentElement.dataset;
let theme = el.theme;
 export const htmlProxy = new Proxy(el, {
    set(target: DOMStringMap, p: string | symbol, newValue: any, receiver: any) {
        target.theme=newValue;
        theme = newValue;
        themeColors.curThemeColor=themes[theme as string]
        return true;
    }
})

 let curThemeColor: Theme =themes[theme as string];



 let themeColors=reactive({
    curThemeColor
});
export let themeColor=toRef(themeColors,'curThemeColor');

export const setTheme = (theme:'dark'|'light') => {
        htmlProxy.theme=theme;
        localStorage.setItem('theme',theme);
}
export const getTheme=():'dark'|'light'=>{
    return localStorage.getItem('theme') as 'dark'|'light'||'dark';
}

// export default {themeColor:toRef(themeColors,'curThemeColor'), htmlProxy};

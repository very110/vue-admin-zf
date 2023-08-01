import {onMounted} from "vue";

export function useIsNewUser(myMaskFlag:any,localName:string):void{
    onMounted(()=>{
        let isNewUser = localStorage.getItem(localName) || false;
        if (!isNewUser) {
            localStorage.setItem(localName, 'login');
            myMaskFlag.value=true;
        }
    })
}

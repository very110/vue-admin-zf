import type{App,DirectiveBinding}  from "vue"
import {useUserStore} from "@/store/module/user.ts";

const userStore=useUserStore();

export const isHasButton=(app:App)=>{
    app.directive('has',{

        mounted(el:HTMLElement,binding:DirectiveBinding){
            // @ts-ignore
            if (!userStore.buttons.includes(binding.value)){
                let parent=el.parentElement as HTMLElement;
                parent.removeChild(el);
                console.log(11111)
            }

        }
    })
}

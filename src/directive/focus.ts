
import type{App,DirectiveBinding}  from "vue"

export const directiveFocus=(app:App)=>{
        app.directive('focus',{
            updated(el, binding, vnode, prevVnode) {
                let input=el.querySelector('input');
                if (input&&binding.value){
                    input.focus();
                }
            }
        })
    }

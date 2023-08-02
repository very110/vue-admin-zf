import type{App,DirectiveBinding}  from "vue"

const normScreenshot =1280;
// @ts-ignore
const resizeObserver=new ResizeObserver((entries, observer)=>{
    for (const entry of entries) {
        let target = entry.target;
        let handler=weakMap.get(target);
        if (handler){
            handler({
                width:entry.borderBoxSize[0].inlineSize,
                height:entry.borderBoxSize[0].blockSize
            })
        }
    }
});

const weakMap =new WeakMap();


export const directiveResize=(app:App)=>{
    //监听父素的大小,进行自适应
    app.directive('resize',{
            mounted(el:HTMLElement,binding:DirectiveBinding){
                weakMap.set(el,binding.value);
                resizeObserver.observe(el);
            },
           beforeUnmount(el){
                resizeObserver.unobserve(el);
                weakMap.delete(el);
            }

    })
}

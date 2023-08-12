import {defineStore} from "pinia"
export const useMaskStore = defineStore('MaskStore', {
    state: () => {
        return {
            maskQueue:[],
            requiredQuantity:-1,
            status:false
        }
    },
    actions: {
        maskPush(DomRect:HTMLElement,index:string|number,message:string){
            Reflect.set(DomRect,'message',message);
            this.maskQueue[index as string|number]=DomRect;
        },
        maskPop(){
            return this.maskQueue.shift();
        },
    },
    getters: {}
})

<template>
    <div>

        <FormPlus :formData="formData" :formConfig="formConfig" inline>

        </FormPlus>
    </div>
</template>

<script setup lang="ts" name="attr">
import FormPlus from "@/components/el/FormPlus/src/index.vue"
import type {FormConfig} from "@/components/el/FormPlus/src/type.ts"
import {reactive} from "vue";

let formData = reactive({
    user: '',
    region: '',
    date: '',
})
let formConfig = reactive<FormConfig<typeof formData>>({
    formItems: [
        {
            type:"slot",
            itemBind: {
                label: 'zzf',
                prop: "user",
            },
            element: {
                elementName: 'el-input',
                vModel: "user",
                slotName: ['prefix','suffix'],
                mySlotName:['userPrefix','userSuffix']
            }
        },
        {
            type:"slot",

            itemBind: {
                label: 'zzf',
                prop: "region",
            },
            element: {
                elementName: 'el-input',
                vModel: "region",
                slotName: ['prefix'],
                mySlotName: ['regionPrefix']
            }
        },
        {
            type:"slot",
            itemBind: {
                label: 'zzf',
                prop: "date",
            },
            element: {
                elementName: 'div',
                slotName: ['prefix','zf'],
                mySlotName: ['regionPrefix'],
                label:''
            }
        },
    ],
    confirmAndReset:{
        validateSuccess:()=>{

        },
        align:"center"
     }
})
</script>


<style scoped lang="scss">


</style>

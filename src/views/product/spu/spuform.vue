<template>
<div>
    <FormPlus :formConfig="formConfig" :formData="spuParams"></FormPlus>
</div>
</template>

<script setup lang="ts" name="spuForm">
import {reactive, ref, toRef, toRefs} from "vue";
import {HasSaleAttr, SpuData, Trademark} from "@/api/product/spu/type.ts";
import {reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList} from "@/api/product/spu";
import {FormConfig} from "@/components/el/FormPlus/src/type.ts";

let spuParams = ref<SpuData>({
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
});
let fromData={
    ...toRefs(spuParams)
}
console.log(fromData)//8.7从这开始
let AllTradeMark=ref<Trademark[]>([]);
let allSaleAttr = ref<HasSaleAttr[]>([]);

const formConfig:FormConfig<typeof fromData>=reactive({
        formItems:[
            {
                itemBind:{
                    label:'SPU名称'
                },
                element:{
                    elementName:'el-input',
                    'input-style':{width:'60%'},
                    vModel:'spuName'
                },
                type:'slot'

            },{
                itemBind:{
                    label:'SPU品牌'
                },
                type:"select",
                options:{

                }
            },{
                itemBind:{
                    label:'SPU描述'
                }

            },{
                itemBind:{
                    label:'SPU图片'
                }

            },{
                itemBind:{
                    label:'SPU销售属性'
                }

            },
        ]
    }
)

const initSpuParams=async ()=>{
    Object.assign(spuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    });
   let result=await reqAllTradeMark();
    let result1=await reqAllSaleAttr();
    AllTradeMark.value=result.data;
    allSaleAttr.value=result1.data;
}
defineExpose({initSpuParams});
</script>


<style scoped lang="scss">


</style>

<template>
    <div>
        <el-card>
            <Category :scene="scene" @changeC3Id="completeC3Id"></Category>
        </el-card>
        <TablePlus :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig">

        </TablePlus>
    </div>
</template>

<script setup lang="ts" name="attr">

import {reactive, ref} from "vue";
import {reqAttr} from "@/api/product/attr";
import {ElMessage} from "element-plus";
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type.ts';
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import type{TableConfig} from "@/components/el/TablePlus/src/props/config.ts";

const tableData=ref([]);
const tableConfig:TableConfig<Attr>=reactive({
    columns:[
        {
            label:'序号',
            type:'index'
        },
        {
            label:'属性名称',
            types:"txt",
            prop: "attrName"
        },
        {
            label:'属性值名称',
            types:"txt",

        },
        {
            label:'操作',
            types:'slot',
            slotName:'myButton'
        }
    ]
})
const paginationConfig={
    hidden:true
}
let scene = ref<number>(0);
const getAttr=async (id)=>{
    try {
        let result:AttrResponseData= await reqAttr(...id);
        if (result.code==200){
            tableData.value=result.data;
        }
    }catch (e){
        ElMessage({
            type:'error',
            message:'加载失败'
        })
    }
}

const completeC3Id=async (id:Object)=>{
    getAttr(id)
}
</script>


<style scoped lang="scss">


</style>

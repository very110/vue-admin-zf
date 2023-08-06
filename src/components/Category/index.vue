<template>
    <el-form :inline="true">
        <el-form-item label="一级分类">
            <el-select v-model="categoryStore.c1Id" :disabled="scene!=0" class="m-2" placeholder="请选择" @change="handler1">
                <el-option
                        v-for="item in categoryStore.c1Arr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="categoryStore.c2Id" class="m-2" placeholder="请选择" :disabled="scene!=0" @change="handler2">
                <el-option
                        v-for="item in categoryStore.c2Arr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="categoryStore.c3Id" class="m-2" :disabled="scene!=0" placeholder="请选择" >
                <el-option
                        v-for="item in categoryStore.c3Arr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                />
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts" name="Category">
import {useCategoryStore} from "@/store/module/category.ts";
import {onMounted} from "vue";
let categoryStore=useCategoryStore();
onMounted(()=>{
    getC1()
})
const emit=defineEmits(['changeC3Id']);
const props=defineProps(['scene']);
const getC1=async ()=>{
   await categoryStore.getC1();
}
const getC2=async ()=>{
    await categoryStore.getC2();
}
const getC3=async ()=>{
    await categoryStore.getC3();
}
const handler1=()=>{
    categoryStore.c2Id='';
    categoryStore.c3Id='';
    categoryStore.c3Arr=[]

    getC2();

}
const handler2=()=>{
    categoryStore.c3Id='';
    getC3();
}
</script>

<style scoped lang="scss">


</style>

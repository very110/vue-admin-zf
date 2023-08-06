<template>
    <div>
        <el-card>
            <Category :scene="scene" @changeC3Id="completeC3Id"></Category>
        </el-card>
        <el-card style="margin-top:20px">
            <div v-show="scene===0">
                <el-button type="primary" :disabled="!categoryStore.c3Id" @click="addAttr">添加属性</el-button>
                <TablePlus :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig"
                           style="margin-top:20px">
                    <template #myButton="{row}">
                        <el-button :icon="Edit" type="primary" size="small" @click="updateAttr(row)"></el-button>
                        <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px"
                                       @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </TablePlus>
            </div>
            <div v-show="scene===1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                    <div>
                        <el-button @click="addAttrValue" :disabled="attrParams.attrName ? false : true" type="primary"
                                   size="default" icon="Plus">添加属性值
                        </el-button>
                        <el-button type="primary" size="default" @click="cancel">取消</el-button>
                    </div>
                    <TablePlus :data="attrParams.attrValueList" :config="attrParamsConfig"
                               :paginationConfig="paginationConfig" style="margin-top: 20px">
                        <template #myButton="{row,$index}">
                            <el-popconfirm :title="`你确定删除${row.valueName}?`" width="200px"
                                           @confirm="attrParams.attrValueList.splice($index,1)">
                                <template #reference>
                                    <el-button type="primary" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>

                        <template #switchInput="{row,$index}">
                           <el-input :ref="(el)=>inputArr[$index]=el" v-if="row.flag" v-model.trim="row.valueName"  @keydown.enter="blurInput(row,$index)" @blur="blurInput(row,$index)"></el-input>
                            <div v-else @click="toEdit(row,$index)">{{row.valueName}}</div>
                        </template>
                    </TablePlus>
                    <div style="margin-top: 20px">
                        <el-button @click="save" :disabled="attrParams.attrValueList.length > 0 ? false : true" type="primary"
                                   size="default">保存
                        </el-button>
                        <el-button type="primary" size="default" @click="cancel">取消</el-button>
                    </div>
                </el-form>


            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="attr">

import {nextTick, onBeforeMount, onBeforeUnmount, reactive, ref, watch} from "vue";
import {reqAddOrUpdateAttr, reqAttr, reqDelete} from "@/api/product/attr";
import {ElMessage} from "element-plus";
import type {Attr, AttrResponseData, AttrValue} from '@/api/product/attr/type.ts';
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import type {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {Edit} from "@element-plus/icons-vue";
import {useCategoryStore} from "@/store/module/category.ts";

const categoryStore = useCategoryStore();
const tableData = ref([]);
const tableConfig: TableConfig<Attr> = reactive({
    columns: [
        {
            label: '序号',
            type: 'index',
            width: 100
        },
        {
            label: '属性名称',
            types: "txt",
            prop: "attrName",
        },
        {
            label: '属性值名称',
            types: "tag",
            callback: (row) => {
                let arr = row.attrValueList;
                let result = arr.map((item, index) => {
                    return {
                        bind: {
                            round: true,
                        },
                        name: item.valueName
                    }
                })
                return result
            },

        },
        {
            label: '属性值操作',
            types: 'slot',
            slotName: 'myButton',
            width: 150
        }
    ]
})
const paginationConfig = {
    hidden: true
}
let attrParams = reactive<Attr>({
    attrName: "",//新增的属性的名字
    attrValueList: [//新增的属性值数组
    ],
    categoryId: '',//三级分类的ID
    categoryLevel: 3,//代表的是三级分类
})
const attrParamsConfig: TableConfig<AttrValue> = {
    columns: [
        {
            label: '序号',
            type: 'index',
            width: 100
        },
        {
            label: '属性值名称',
            types: "slot",
            slotName: "switchInput",
        },
        {
            label: '属性值操作',
            types: 'slot',
            slotName: 'myButton',
            width: 150
        }

    ]
}
let scene = ref<number>(0);
const getAttr = async () => {
    let {c1Id, c2Id, c3Id} = categoryStore
    try {
        let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
        if (result.code == 200) {
            tableData.value = result.data;
        }
    } catch (e) {
        ElMessage({
            type: 'error',
            message: '加载失败'
        })
    }
}

const updateAttr = (row) => {
    scene.value = 1;
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}
const deleteAttr = async (id) => {

    try {
        let result = await reqDelete(id);
        if (result.code === 200) {
            getAttr()
            ElMessage({type: 'success', message: '删除成功'});
        }
    } catch (e) {
        ElMessage({type: 'error', message: '删除失败'});
    }
}
const completeC3Id = async () => {
}
watch(()=>categoryStore.c3Id,()=>{
    tableData.value=[]
    if (!categoryStore.c3Id) return;
    getAttr()
})
const cancel = () => {
    scene.value = 0;
}
let inputArr = ref<any>([]);

const addAttrValue = () => {
    //点击添加属性值按钮的时候,向数组添加一个属性值对象
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,//控制每一个属性值编辑模式与切换模式的切换
    });
    //获取最后el-input组件聚焦
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus();
    })
}

const toEdit=(row,index)=>{
    row.flag=true;
    nextTick(()=>{

        inputArr.value[index].focus();
    })
}

const blurInput=(row:AttrValue,index)=>{
    if (row.valueName.trim() == '') {
        //删除调用对应属性值为空的元素
        //提示信息
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return;
    }
    let repect=attrParams.attrValueList.find((item,index)=>{
            if (row!==item){
                return item.valueName===row.valueName;
            }
    })

    if (repect){
        attrParams.attrValueList.splice(index,1);
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return;
    }
    row.flag=false;

}

const save=async ()=>{

        let result=await reqAddOrUpdateAttr(attrParams);
        if (result.code==200){
                ElMessage({
                    type: 'success',
                    message:`${attrParams.id?'修改':'新增'}成功`
                })
            getAttr();
        }else{
            ElMessage({
                type: 'error',
                message:`${attrParams.id?'修改':'新增'}失败`
            })
        }
        scene.value=0;
}

const addAttr=()=>{
    Object.assign(attrParams, {
        attrName: "",//新增的属性的名字
        attrValueList: [//新增的属性值数组
        ],
        categoryId: categoryStore.c3Id,//三级分类的ID
        categoryLevel: 3,//代表的是三级分类
    })
    delete attrParams.id
    //切换为添加与修改属性的结构
    scene.value = 1;
}
onBeforeUnmount(()=>{
    categoryStore.$reset();
})
</script>


<style scoped lang="scss">


</style>

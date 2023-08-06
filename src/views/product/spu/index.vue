<template>
<div>
    <el-card>
        <Category :scene="scene"></Category>
    </el-card>
   <el-card style="margin-top:20px">
       <div v-show="scene===0">
           <el-button type="primary" @click="addSpu">添加spu</el-button>
           <TablePlus :data="spuTableData" :config="tableConfig" :paginationConfig="paginationConfig"
                      @ChangeGetData="getHasSpu"
                      style="margin-top:20px">
               <template #myButton="{row}">
                   <el-button :icon="Plus" type="primary" size="small"  title="添加sku"></el-button>
                   <el-button :icon="Edit" type="primary" size="small"  title="修改spu"></el-button>
                   <el-button :icon="Search" type="primary" size="small"  title="查看spu"></el-button>
                   <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px"
                                  @confirm="deleteAttr(row.id)">
                       <template #reference>
                           <el-button type="primary" size="small" icon="Delete" title="删除spu"></el-button>
                       </template>
                   </el-popconfirm>
               </template>
           </TablePlus>
       </div>
       <spuForm ref="mySpuForm" v-show="scene===1"></spuForm>
   </el-card>
</div>
</template>

<script setup lang="ts" name="spu">
import {onMounted, reactive, ref, watch} from "vue";
import {Edit, Plus, Search} from "@element-plus/icons-vue";
  import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
  import {useCategoryStore} from "@/store/module/category.ts";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {reqHasSpu} from "@/api/product/spu";
import spuForm from './spuform.vue'
import {SkuData} from "@/api/product/spu/type.ts";
import Spuform from "@/views/product/spu/spuform.vue";
  let scene =ref(0);
  let categoryStore=useCategoryStore();
  const spuTableData = ref([]);
  const tableConfig: TableConfig<any> = reactive({
    columns: [
        {
            label: '序号',
            type: 'index',
            width: 100
        },
        {
            label: 'spu名称',
            types: "txt",
            prop: "spuName",
        },
        {
            label: 'spu描述',
            types: "txt",
            prop:'description',
        },
        {
            label: 'spu操作',
            types: 'slot',
            slotName: 'myButton',
            width: 250
        }
    ]
})
  const paginationConfig = reactive({
      'current-page': 1,
      total: 0,
      'page-size': 3,
      events: {},
      hidden: false
  })


watch(()=>categoryStore.c3Id,()=>{
        spuTableData.value=[];
    if (!categoryStore.c3Id) return;
    getHasSpu()
})

const getHasSpu=async (page=1)=>{
    paginationConfig["current-page"]=page;
    let result=await reqHasSpu(page,paginationConfig['page-size'],categoryStore.c3Id);
    if (result.code==200){
        spuTableData.value=result.data.records;
        paginationConfig.total=result.data.total;
    }
}

const addSpu=()=>{
    scene.value=1;

  mySpuForm.value.initSpuParams();
}

const mySpuForm=ref(null);

</script>


<style scoped lang="scss">


</style>

<template>
<div>
    <el-card>
        <Category :scene="scene"></Category>
    </el-card>
   <el-card style="margin-top:20px">
       <div v-show="scene===0">
           <el-button type="primary" @click="addSpu" :disabled="!categoryStore.c3Id">添加spu</el-button>
           <TablePlus :data="spuTableData" :config="tableConfig" :paginationConfig="paginationConfig"
                      @ChangeGetData="getHasSpu"
                      style="margin-top:20px">
               <template #myButton="{row}">
                   <el-button :icon="Plus" type="primary" size="small"  title="添加sku"></el-button>
                   <el-button :icon="Edit" type="primary" size="small"  @click="updateSpu(row)" title="修改spu"></el-button>
                   <el-button :icon="Search" type="primary" size="small"  @click="findSku(row)" title="查看spu"></el-button>
                   <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px"
                                  @confirm="deleteAttr(row.id)">
                       <template #reference>
                           <el-button type="primary" size="small" icon="Delete" title="删除spu"></el-button>
                       </template>
                   </el-popconfirm>
               </template>
           </TablePlus>
           <el-dialog v-model="dialogTableVisible" title="sku列表" width="65%">
               <el-table :data="skuTableData">
                   <el-table-column prop="skuName" label="sku名字" ></el-table-column>
                   <el-table-column prop="skuDesc" label="sku描述" ></el-table-column>
                   <el-table-column prop="weight" label="sku重量" width="50"></el-table-column>
                   <el-table-column prop="price" label="sku价格" width="50"></el-table-column>
                   <el-table-column  label="sku图片" width="150">
                       <template #default="{row}">
                           <img :src="row.skuDefaultImg" style="object-fit: cover">
                       </template>
                   </el-table-column>
               </el-table>
           </el-dialog>
       </div>

       <spuForm ref="mySpuForm" v-show="scene===1" @changeScene="changeScene"></spuForm>
   </el-card>
</div>
</template>

<script setup lang="ts" name="spu">
import {onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import {Edit, Plus, Search} from "@element-plus/icons-vue";
  import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
  import {useCategoryStore} from "@/store/module/category.ts";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {reqHasSpu, reqRemoveSpu, reqSkuList} from "@/api/product/spu";
import spuForm from './spuform.vue'
import {SkuData} from "@/api/product/spu/type.ts";
import Spuform from "@/views/product/spu/spuform.vue";
import {ElMessage} from "element-plus";
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

const skuTableData=ref([])
const dialogTableVisible=ref(false);

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
  mySpuForm.value.initSpuParams(categoryStore.c3Id);
}
const updateSpu=(row)=>{
    scene.value=1;
    mySpuForm.value.initHasSpuData(row);

}

const changeScene=(obj)=>{
    scene.value=obj.flag;
    if (obj.param==='update'){
        getHasSpu(paginationConfig["current-page"])
    }else {
        getHasSpu();
    }
}
const deleteAttr=async (id)=>{
      let result=await reqRemoveSpu(id);
      if (result.code==200){
          ElMessage({
              type:'success',
              message:'删除成功'
          })
          getHasSpu(paginationConfig["current-page"]);
      }

}

const findSku=async (row)=>{
    let result=await reqSkuList(row.id);
    if (result.code==200){
        dialogTableVisible.value=true;
        skuTableData.value=result.data;
    }
    console.log(result)
}

const mySpuForm=ref(null);

  onBeforeUnmount(()=>{
      categoryStore.$reset();
  })
</script>


<style scoped lang="scss">


</style>

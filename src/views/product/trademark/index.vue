<template>
    <div >
       <el-card style="width: 100%;height: 100%;">
           <el-button type="primary">添加品牌</el-button>
           <TablePlus :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig"
                      border style="margin:20px 0"
                      :row-style="{'height':'100px'}"
                      @ChangeGetData="getHasTrademark"
           >
               <template #logo="{row}">
                   <img :src="row.logoUrl" style="width: 100px;height: 100px; object-fit: cover">
               </template>

               <template #crud="{row}">
                   <el-button type="primary" :icon="Edit" @click="dialogVisible=true"></el-button>
                   <el-popconfirm :title="`确定要删除${row.tmName}吗?`"
                                  :hide-after="100"
                                  @confirm="deleteTrademark(row.id)">
                       <template #reference>
                           <el-button type="danger" :icon="Delete"></el-button>
                       </template>
                   </el-popconfirm>
               </template>
           </TablePlus>
       </el-card>

        <el-dialog
            v-model="dialogVisible"
            title="Tips"
            width="30%"
            :before-close="handleClose"
        >
            <span>This is a message</span>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="trademark">
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import type {TableConfig} from "@/components/el/TablePlus/src/props/config.ts"
import {onMounted, reactive, ref,computed} from "vue";
import {reqDeleteTrademark, reqHasTrademark} from "@/api/product/trademark/index.ts"
import type{Records,TradeMark} from "@/api/product/trademark/type.ts"
import {ElMessage} from "element-plus";
import {Delete, Edit} from "@element-plus/icons-vue";
onMounted(()=>{
    getHasTrademark();
})

let dialogVisible=ref(false);
const handleClose=(done)=>{
    console.log(1)
    //到时候可以用map实现点x号是否保留本次修改
    // dialogVisible.value=false;
}
const getHasTrademark=async (page=1)=>{
    paginationConfig["current-page"]=page;
    let result=await reqHasTrademark(page, paginationConfig["page-size"]);
    if (result.code===200){
        let data=result.data;
        tableData.value=data.records;
        paginationConfig.total=data.total;
    }else{
        ElMessage({
            type:'error',
            message:'获取数据失败'
        })
    }

}
const deleteTrademark=async (id)=>{
   let result=await reqDeleteTrademark(id);
    if (result.code===200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasTrademark(paginationConfig["current-page"])
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}
const tableConfig: TableConfig<TradeMark> = reactive({
    columns: [
        {
            types: "txt",
            prop: "id",
            label: '序号',
            width:100
        } ,
        {
            types: "txt",
            prop: "tmName",
            label: '品牌名称',
        },
        {
            types: "slot",
            label: '品牌LoGo',
            slotName:'logo'
        },
        {
            types: "slot",
            label: '品牌操作',
            slotName:'crud'
        }
    ]
})
const paginationConfig=reactive({
    'current-page':1,
    total:100,
    'page-size':3,
    events:{
    }
})
const tableData=ref<Records>([]);


</script>


<style scoped lang="scss">
</style>

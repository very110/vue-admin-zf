<template>
<div>
    <el-card>
        <Category :scene="scene"></Category>
    </el-card>
   <el-card style="margin-top:20px">
       <div v-show="scene===0">
           <el-button type="primary" :disabled="!categoryStore.c3Id" >添加属性</el-button>
           <TablePlus :data="spuTableData" :config="tableConfig" :paginationConfig="paginationConfig"
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
   </el-card>
</div>
</template>

<script setup lang="ts" name="spu">
import {reactive, ref} from "vue";
  import {Edit} from "@element-plus/icons-vue";
  import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
  import {useCategoryStore} from "@/store/module/category.ts";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {Attr} from "@/api/product/attr/type.ts";
  let scene =ref(0);
  let categoryStore=useCategoryStore();
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
            prop: "attrName",
        },
        {
            label: 'spu描述',
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
            label: 'spu操作',
            types: 'slot',
            slotName: 'myButton',
            width: 150
        }
    ]
})
  const paginationConfig = {
    hidden: true
}
  const spuTableData = ref([]);
</script>


<style scoped lang="scss">


</style>

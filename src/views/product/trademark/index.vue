<template>
    <div >
       <el-card>
           <el-button type="primary">添加品牌</el-button>
           <TablePlus :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig"
                      border style="margin:20px 0"
                      :row-style="{'height':'100px'}"
           >
           </TablePlus>
       </el-card>
    </div>
</template>

<script setup lang="ts" name="trademark">
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import type {TableConfig} from "@/components/el/TablePlus/src/props/config.ts"
import {onMounted, reactive, ref} from "vue";

interface TableData {
    date: string,
    name: string,
    address: string
}

const tableConfig: TableConfig<TableData> = reactive({
    columns: [
        {
            types: "txt",
            prop: "address",
            label: '序号',
            width:100
        } ,
        {
            types: "txt",
            prop: "date",
            label: '品牌名称',
        },
        {
            types: "txt",
            prop: "name",
            label: '品牌LoGo',
        },
        {
            types: "txt",
            prop: "name",
            label: '品牌操作',
        }
    ]
})
const paginationConfig=reactive({
    total:200,
    events:{
        'prev-click':()=>{
            console.log('prev-click')
        }
    }
})
const tableData:TableData[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 's',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 's',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 's',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 's',
    }
]


</script>


<style scoped lang="scss">
</style>

<template>
    <div >
        <TablePlus :data="tableData" :config="tableConfig"  ref="tabplus">
        </TablePlus>
        1234567890
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
            label: '地址',
        } ,
        {
            types: "txt",
            prop: "date",
            label: '日期',
        },
        {
            types: "callback",
            prop: "name",
            label: '名字',
            width:100,
            callback:(row)=>{
                return row.name
            }
        }
    ]
})

const tableData:TableData[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
]

const tabplus=ref();

</script>


<style scoped lang="scss">


</style>

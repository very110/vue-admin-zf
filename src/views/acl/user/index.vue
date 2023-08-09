<template>
  <div class="user">
      <el-card>
          <el-form :inline="true" class="form">
              <el-form-item label="用户名:">
                  <el-input placeholder="请你输入搜索用户名" ></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" size="default">搜索</el-button>
                  <el-button type="primary" size="default">重置</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      <el-card style="margin-top:20px;">
          <div style="margin: 5px">
              <el-button type="primary" size="default">添加用户</el-button>
              <el-button type="primary" size="default">批量删除</el-button>
          </div>

          <TablePlus :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig" @ChangeGetData="getHasUser">
            <template #operationDefault="{row}">
                <el-button :icon="Plus" type="primary" size="small"  >分配角色</el-button>
                <el-button :icon="Edit" type="primary" size="small" >编辑</el-button>
                <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px"
                               @confirm="">
                    <template #reference>
                        <el-button type="primary" size="small" icon="Delete" >删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
          </TablePlus>


      </el-card>
  </div>
</template>

<script setup lang="ts" name="user">
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import {onMounted, reactive, ref} from "vue";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {reqUserInfo} from "@/api/acl/user";
import {Edit, Plus, Search} from "@element-plus/icons-vue";
const tableData=ref([])
const tableConfig:TableConfig<any>={
    checkbox:true,
    columns:[
        {
            type:"index",
            label: '序号',
            width: 100
        },
        {
            types: "txt",
            prop: "username",
            label: '用户姓名',
            width: 100
        },
        {
            width: 100,
            types: "txt",
            prop: "name",
            label: '用户名称',
        } ,{
            types: "txt",
            prop: "roleName",
            label: '用户角色',
            width: 100
        },{
            types: "txt",
            prop: "createTime",
            label: '创建时间',
        },{
            types: "txt",
            prop: "updateTime",
            label: '更新时间',
            width: 100
        },
        {
            types:"slot",
            label:'操作',
            slotName:'operationDefault',
        }

    ]

}
const paginationConfig=reactive({
    'current-page': 1,
    total: 0,
    'page-size': 7,
    events: {}
})

onMounted(()=>{
    getHasUser()
})

const getHasUser=async (page=1)=>{
    paginationConfig["current-page"]=page;
    let result=await reqUserInfo(page,paginationConfig["page-size"]);
    if (result.code==200){
        paginationConfig.total=result.data.total;
        tableData.value=result.data.records;
    }
}

</script>


<style scoped lang="scss">

.form{
  display:flex;
  justify-content: space-between;
  align-items: center;
  height: 50px
;
}
</style>

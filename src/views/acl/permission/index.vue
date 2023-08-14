<template>
  <div class="permission">
     <el-card>
         <TablePlus  row-key="id" :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig" >
             <template #operation="{row}">
                 <el-button :icon="Plus" type="primary" size="small" @click="addMenu(row)" v-has="`btn.Permission.add`">添加菜单</el-button>
                 <el-button :icon="Edit" type="primary" size="small" @click="updateMenu(row)" v-has="`btn.Permission.update`">编辑</el-button>
                 <el-popconfirm :title="`你确定删除${row.name}?`" width="200px"
                                @confirm="deleteMenu(row)">
                     <template #reference>
                         <el-button type="primary" size="small" icon="Delete" v-has="`btn.Permission.remove`" >删除</el-button>
                     </template>
                 </el-popconfirm>
             </template>
         </TablePlus>
     </el-card>
      <el-dialog
              v-model="dialogVisible"
              :title="`${menuData.id?'更新':'添加'}菜单`"
              class="phone-W-60"
      >

          <template #default>
              <el-form ref="myForm" :model="menuData">
                  <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '必须输入名称', trigger: 'blur' }]">
                      <el-input v-model="menuData.name" ></el-input>
                  </el-form-item>
                  <el-form-item label="权限" prop="code" :rules="[{ required: true, message: '必须输入权限', trigger: 'blur' }]">
                      <el-input v-model="menuData.code"></el-input>
                  </el-form-item>

              </el-form>
          </template>
          <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="menuAddOrUpdate">
          确定
        </el-button>
        <el-button @click="dialogVisible = false">取消</el-button>

      </span>
          </template>
      </el-dialog>
  </div>
</template>

<script setup lang="ts" name="permission">

import {Edit, Plus} from "@element-plus/icons-vue";
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import {nextTick, onMounted, reactive, ref} from "vue";
import {reqAddOrUpdateMenu, reqAllPermisstion, reqDeleteMenu} from "@/api/acl/menu";
import {ElMessage} from "element-plus";
let myForm=ref();
const tableData=ref([]);
const paginationConfig = reactive({
    hidden:true
})
let dialogVisible=ref(false);
const menuData=reactive({
    code: '',
    level: 0, //几级菜单
    name: '', //菜单的名字
    pid: 0 ,//菜单的ID
})
const tableConfig={
    columns:[
        {
            types: "txt",
            prop: "name",
            label: '名称',
        },{
            types: "txt",
            prop: "code",
            label: '权限值',
        },
        {
            types: "txt",
            prop: "updateTime",
            label: '修改时间',
        },
        {
            types: 'slot',
            slotName:'operation'
        }
    ]
}

const getPermisstion=async ()=>{
    let result =await reqAllPermisstion()
    if (result.code==200){
        tableData.value=result.data;
    }
}
const updateMenu=(row)=>{
    dialogVisible.value=true;
    Object.assign(menuData,row);

    nextTick(()=>{
        myForm.value.clearValidate();
    })
}
const deleteMenu=async (row)=>{
    let result=await reqDeleteMenu(row.id);
    if (result.code==200){
        ElMessage({
            type:'success',
            message:`删除成功`
        })
        getPermisstion();

    }
}
onMounted(()=>{
    getPermisstion()
})
const addMenu=(row)=>{
    dialogVisible.value=true;
    delete menuData.id;
    Object.assign(menuData,{
        "code": "",
        "level": 0,
        "name": "",
        "pid": 0,
    })

    menuData.level=row.level+1;
    menuData.pid=row.id;

    nextTick(()=>{
        myForm.value.clearValidate();
    })
}
const menuAddOrUpdate=async ()=>{
    await myForm.value.validate();
    let result=await reqAddOrUpdateMenu(menuData);
    if (result.code==200){
        ElMessage({
            type:'success',
            message:`${menuData.id?'更新':'添加'}成功`
        })
        getPermisstion();
        dialogVisible.value=false;
    }
}
</script>


<style scoped lang="scss">


</style>

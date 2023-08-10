<template>
    <div class="role">
        <el-card>
            <el-form :inline="true" class="form">
                <el-form-item label="用户名:">
                    <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" @click="search">搜索</el-button>
                    <el-button type="primary" size="default" @click="keyword=''" :disabled="!keyword">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 20px">
            <el-button type="primary" :icon="Plus" style="margin-bottom: 15px" @click="addRole" v-has="`btn.Role.add`" >添加职位</el-button>
            <TablePlus :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig" @ChangeGetData="getHasRole">
                <template #operation="{row}">
                    <el-button v-has="`btn.Role.assgin`" :icon="Plus" type="primary" size="small" @click="assignPermissions(row)">分配权限</el-button>
                    <el-button v-has="`btn.Role.update`" :icon="Edit" type="primary" size="small" @click="updateRole(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定删除${row.roleName}?`" width="200px"
                                   @confirm="deleteRole(row)">
                        <template #reference>
                            <el-button v-has="`btn.Role.remove`" type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </TablePlus>
        </el-card>
        <el-dialog
                v-model="dialogVisible"
                :title="`${positionName.id?'修改':'添加'}职位`"
                width="30%"

        >
          <template #default>
              <el-form ref="myForm" :model="positionName">
                  <el-form-item label="职位名称" prop="roleName" :rules="[{ required: true, message: '必须输入职位名称', trigger: 'blur' }]">
                      <el-input v-model="positionName.roleName" ></el-input>
                  </el-form-item>
              </el-form>
          </template>

            <template #footer>
      <span class="dialog-footer">
           <el-button type="primary" @click="roleAddOrUpdate">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>

      </span>
            </template>
        </el-dialog>
        <el-drawer v-model="drawer" title="分配菜单与按钮的权限" :with-header="true">
            <el-tree
                    ref="myThee"
                    :props="treeProps"
                    :data="menuArr"
                    show-checkbox
                    node-key="id"
                    :default-expanded-keys="checkedDir"
                    :default-checked-keys="allMenuArr"
            />

            <template #footer>
                <el-button type="primary" @click="save">确定</el-button>
                <el-button @click="drawer = false">取消</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts" name="role">
import {nextTick, onMounted, reactive, ref} from "vue";
import {reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqDeleteRole, reqSetPermisstion} from "@/api/acl/role";
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {Edit, Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

let drawer=ref(false);
let keyword = ref('');
const paginationConfig = reactive({
    'current-page': 1,
    total: 0,
    'page-size': 7,
    events: {}
})
const tableData = ref([]);
const tableConfig: TableConfig<any> = {
    columns: [
        {
            type: "index",
            label: '序号',
            width: 100
        },
        {
            types: "txt",
            prop: "id",
            label: 'id',
            width: 100
        }, {
            types: "txt",
            prop: "roleName",
            label: '职位名称',
        }, {
            types: "txt",
            prop: "createTime",
            label: '创建时间',
            width: 100
        }, {
            types: "txt",
            prop: "updateTime",
            label: '更新时间',
            width: 100
        }, {
            types: "slot",
            label: '操作',
            slotName: 'operation'
        },

    ]
}
const dialogVisible = ref(false);
let myForm=ref();
const positionName = reactive({
    roleName: ''
});
let menuArr=ref([]);
let allMenuArr=ref([]);
const treeProps={
    children:'children',
    label:'name'
}
let myThee=ref();

let checkedDir=ref([]);

const getHasRole = async (page = 1) => {
    paginationConfig["current-page"] = page;
    let result = await reqAllRoleList(page, paginationConfig["page-size"], keyword.value);
    if (result.code == 200) {
        paginationConfig.total = result.data.total;
        tableData.value = result.data.records;
    }
}
const updateRole = (row) => {
    Object.assign(positionName, row);
    dialogVisible.value = true;

    nextTick(()=>{
        myForm.value.clearValidate();
    })
}
const assignPermissions=async (row)=>{
    drawer.value=true;
    Object.assign(positionName, row);
    let result=await reqAllMenuList(row.id);
    if (result.code==200){
        menuArr.value=result.data;
        allMenuArr.value=filterMenuArr(menuArr.value);
        checkedDir.value=filterDirArr(menuArr.value);
    }
}

const filterMenuArr=(allArr,initArr=[])=>{

    allArr.forEach(item=>{
        if (item.select&&(!item.children||item.children.length==0)){
            initArr.push(item.id);
        }
        if (item.select&&item.children&&item.children.length>0){

           filterMenuArr(item.children,initArr);
        }
    })
    return initArr;
}
const filterDirArr=(allArr,initArr=[])=>{
    for (const item of allArr) {
          if (item.select&&item.children&&item.children.length>0){
              initArr.push(item.id);
              filterDirArr(item.children,initArr);
          }
    }
    return initArr;
}
const deleteRole=async (row)=>{
   let result=await reqDeleteRole(row.id)
    if (result.code == 200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasRole(paginationConfig["current-page"])
    }
}
const search = () => {
    getHasRole();
    keyword.value = ''
}
const addRole=()=>{
    delete positionName.id;
    Object.assign(positionName,{roleName:''})
    dialogVisible.value = true;
    nextTick(()=>{
        myForm.value.clearValidate();
    })
}

const save=async ()=>{
    const id=positionName.id;
    let idArr=myThee.value.getCheckedKeys();
    let arr=myThee.value.getHalfCheckedKeys();
    let permissionsArr=[...idArr,...arr];
    let result=await reqSetPermisstion(id,permissionsArr);
    if (result.code==200){
        ElMessage({
            type:"success",
            message:'成功'
        })
        getHasRole(paginationConfig["current-page"]);
        drawer.value=false;
    }
}

const roleAddOrUpdate=async ()=>{
    let result = await reqAddOrUpdateRole(positionName);
    if (result.code == 200) {
        getHasRole(paginationConfig["current-page"]);
        ElMessage({
            type:'success',
            message:'成功'
        })
        dialogVisible.value=false;
    }
}
onMounted(() => {
    getHasRole()
})
</script>


<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

</style>

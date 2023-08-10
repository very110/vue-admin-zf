<template>
  <div class="user">
      <el-card>
          <el-form :inline="true" class="form" >
              <el-form-item label="用户名:">
                  <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button  type="primary" size="default" @click="search" >搜索</el-button>
                  <el-button type="primary" size="default" @click="resetKeyword" :disabled="!keyword">重置</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      <el-card style="margin-top:20px;">
          <div style="margin: 5px">
              <el-button type="primary" size="default" @click="addUser" v-has="`btn.User.add`">添加用户</el-button>
              <el-button type="primary" size="default" @click="batchdDlete" v-has="`btn.User.remove` " :disabled="!idArr.length>0">批量删除</el-button>
          </div>

          <TablePlus @selection-change="selectChange" :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig" @ChangeGetData="getHasUser">
            <template #operationDefault="{row}">
                <el-button :icon="Plus" v-has="`btn.User.assgin`" type="primary" size="small"  @click="setRole(row)">分配角色</el-button>
                <el-button :icon="Edit" v-has="`btn.User.update`" type="primary" size="small" @click="roleUpdate(row)">编辑</el-button>
                <el-popconfirm :title="`你确定删除${row.username}?`" width="200px"
                               @confirm="deleteUser(row)">
                    <template #reference>
                        <el-button type="primary" size="small" icon="Delete" v-has="`btn.User.remove`">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
          </TablePlus>
      </el-card>
      <el-drawer v-model="drawer" title="分配角色" :with-header="true">

          <template #footer>
              <el-button type="primary" @click="confirmClick">确定</el-button>
              <el-button @click="drawer = false" >取消</el-button>
          </template>
          <el-form >
              <el-form-item label="用户姓名">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="职位列表">
                  <el-checkbox
                      v-model="checkAll"
                      :indeterminate="isIndeterminate"
                      @change="handleCheckAllChange"
                  >全选</el-checkbox
                  >
                  <el-checkbox-group
                      v-model="assignRoles"
                      @change="handleCheckedCitiesChange"
                  >
                      <el-checkbox v-for="city in allRolesList" :key="city.id" :label="city">{{city.roleName}}</el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
          </el-form>
      </el-drawer>
      <el-drawer v-model="drawer1" :title="`${userParams.id?'修改':'添加'}角色`" :with-header="true">
          <el-form ref="myForm" :model="userParams">
              <el-form-item label="用户姓名" prop="username" :rules="[{ required: true, message: '必须输入用户姓名', trigger: 'blur' }]">
                  <el-input v-model="userParams.username" ></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" prop="name" :rules="[{ required: true, message: '必须输入用户昵称', trigger: 'blur' }]">
                  <el-input v-model="userParams.name"></el-input>
              </el-form-item>
              <el-form-item v-if="!userParams.id" label="用户密码" prop="name" :rules="[{ required: true, message: '必须输入用户密码', trigger: 'blur' }]">
                  <el-input v-model="userParams.password"></el-input>
              </el-form-item>
          </el-form>
          <template #footer>
              <el-button type="primary" @click="confirmUpdateAndAddClick">确定</el-button>
              <el-button @click="drawer1 = false" >取消</el-button>
          </template>
      </el-drawer>
  </div>
</template>

<script setup lang="ts" name="user">
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import {nextTick, onMounted, reactive, ref} from "vue";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {reqAddOrUpdate, reqAllRole, reqRemoveUser, reqSelectUser, reqSetUserRole, reqUserInfo} from "@/api/acl/user";
import {Edit, Plus, Search} from "@element-plus/icons-vue";
import {SetRoleData, User} from "@/api/acl/user/type.ts";
import {ElMessage} from "element-plus";
const tableData=ref([])
const myForm=ref();
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
let userParams = reactive<User>({
    username: '',
    name: '',
    password: ''
});
let drawer=ref(false);
let allRolesList=ref([]);
let assignRoles=ref([]);
const checkAll = ref(false);
const isIndeterminate = ref(true);
let drawer1=ref(false);
let keyword=ref('');
let idArr=ref([])

const setRole=async (row)=>{
   Object.assign(userParams,row);
    let result = await reqAllRole(userParams.id as number);
    if (result.code==200){
        allRolesList.value=result.data.allRolesList;
        assignRoles.value=result.data.assignRoles;
        drawer.value=true;
    }
}
const resetKeyword=()=>{
    keyword.value='';
}
onMounted(()=>{
    getHasUser()
})
const selectChange=(selection)=>{
    idArr.value=selection.map(item=>item.id);


}
const batchdDlete=async()=>{
    let result=await reqSelectUser(idArr.value);
    if (result.code==200){
        ElMessage({
            type:'success',
            message:'批量删除成功'
        })
        getHasUser(paginationConfig["current-page"]);
    }
}
const search=()=>{
    getHasUser();
    keyword.value = '';
}
const addUser=()=>{
    delete userParams.id;
    userParams.username='';
    userParams.password='';
    userParams.name='';
    drawer1.value=true;

    nextTick(()=>{
        myForm.value.clearValidate();
    })
}
const getHasUser=async (page=1)=>{
    paginationConfig["current-page"]=page;
    let result=await reqUserInfo(page,paginationConfig["page-size"],keyword.value);
    if (result.code==200){
        paginationConfig.total=result.data.total;
        tableData.value=result.data.records;
    }
}

const confirmUpdateAndAddClick=async ()=>{
    await myForm.value.validate();
    let result =await reqAddOrUpdate(userParams);
    if (result.code==200){
        drawer1.value=false;
        ElMessage({
            type:'success',
            message:'成功'
        })
        getHasUser(paginationConfig["current-page"]);
    }
}

const deleteUser=async (row)=>{
    let result=await reqRemoveUser(row.id);
    if (result.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasUser(paginationConfig["current-page"]);
    }
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === allRolesList.value.length;
    isIndeterminate.value =checkedCount !== assignRoles.value.length;
}
const handleCheckAllChange = (val: boolean) => {
    assignRoles.value = val ? allRolesList.value:[];
    isIndeterminate.value=val;
}
const roleUpdate=(row)=>{
    Object.assign(userParams,row);
    nextTick(()=>{
        myForm.value.clearValidate();
    })
    drawer1.value=true;
}
const confirmClick=async ()=>{

    let data={
        userId:userParams.id,
        roleIdList:assignRoles.value.map(item=>item.id)
    };
    console.log(data);

    let result=await reqSetUserRole(<SetRoleData>data);
    if (result.code==200){
        ElMessage({
            type:'success',
            message:'成功'
        })
        getHasUser(paginationConfig["current-page"]);
        drawer.value=false;
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

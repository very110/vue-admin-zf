<template>
    <div>
        <el-card style="width: 100%;height: 100%;">
            <el-button type="primary" @click="addTrademark">添加品牌</el-button>
            <TablePlus :data="tableData" :config="tableConfig" :paginationConfig="paginationConfig"
                       border style="margin:20px 0"
                       :row-style="{'height':'100px'}"
                       @ChangeGetData="getHasTrademark"
            >
                <template #logo="{row}">
                    <img :src="row.logoUrl" style="width: 100px;height: 100px; object-fit: cover">
                </template>

                <template #crud="{row}">
                    <el-button type="primary" :icon="Edit" @click="updateTrademark(row)"></el-button>
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
                :title="trademarkParams.id?'添加品牌':'修改品牌'"
                :before-close="handleClose"
        >
            <FormPlus  :formData="trademarkParams" :formConfig="formConfig" :rules="rules" ref="myForm">

            </FormPlus>
        </el-dialog>


    </div>
</template>

<script setup lang="ts" name="trademark">
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import FormPlus from "@/components/el/FormPlus/src/index.vue";
import type {TableConfig} from "@/components/el/TablePlus/src/props/config.ts"
import type {FormConfig} from "@/components/el/FormPlus/src/type.ts";
import {onMounted, reactive, ref, computed, nextTick} from "vue";
import {reqAddAndUpdateTrademark, reqDeleteTrademark, reqHasTrademark} from "@/api/product/trademark/index.ts"
import type {Records, TradeMark} from "@/api/product/trademark/type.ts"
import {ElMessage, FormRules, UploadFile, UploadFiles} from "element-plus";
import {Delete, Edit} from "@element-plus/icons-vue";

onMounted(() => {
    getHasTrademark();
})
const myForm=ref();
const handleClose = (done) => {

    dialogVisible.value=false;
    myForm.value.myFrom.resetFields();
}
const getHasTrademark = async (page = 1) => {
    paginationConfig["current-page"] = page;
    let result = await reqHasTrademark(page, paginationConfig["page-size"]);
    if (result.code === 200) {
        let data = result.data;
        tableData.value = data.records;
        paginationConfig.total = data.total;
    } else {
        ElMessage({
            type: 'error',
            message: '获取数据失败'
        })
    }

}
const deleteTrademark = async (id) => {
    let result = await reqDeleteTrademark(id);
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasTrademark(paginationConfig["current-page"])
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
const tableConfig: TableConfig<TradeMark> = reactive({
    columns: [
        {
            types: "txt",
            prop: "id",
            label: '序号',
            width: 100
        },
        {
            types: "txt",
            prop: "tmName",
            label: '品牌名称',
        },
        {
            types: "slot",
            label: '品牌LoGo',
            slotName: 'logo'
        },
        {
            types: "slot",
            label: '品牌操作',
            slotName: 'crud'
        }
    ]
})
const paginationConfig = reactive({
    'current-page': 1,
    total: 100,
    'page-size': 3,
    events: {}
})
const tableData = ref<Records>([]);

let dialogVisible = ref(false);
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
const formConfig: FormConfig<TradeMark> = reactive({
    formItems: [
        {
            type: "slot",
            itemBind: {
                label: '品牌名称',
                prop: "tmName",
                'label-width':'100px'
            },
            element: {elementName: 'el-input', vModel: "tmName",placeholder:'请输入品牌名称','input-style':{width:'80%'}}
        },
        {
            type:"upload",
            itemBind: {
                'label-width':"100px",
                label: '品牌Logo',
                prop: "logoUrl",
            },
            options:{
                imgUrl:computed(()=>trademarkParams.logoUrl),
                action:'/api/admin/product/fileUpload',
                onSuccess(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles){
                    trademarkParams.logoUrl = response.data;
                },
                beforeUpload(rawFile){
                    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
                        if (rawFile.size / 1024 / 1024 < 4) {
                            return true;
                        } else {
                            ElMessage({
                                type: 'error',
                                message: '上传文件大小小于4M'
                            })
                            return false;
                        }
                    } else {
                        ElMessage({
                            type: 'error',
                            message: "上传文件格式务必PNG|JPG|GIF"
                        })
                        return false;
                    }
                }
            }
        }
    ],
    confirmAndReset:{
        align:'right',
        async validateSuccess(){
            dialogVisible.value=false;
            let result =await reqAddAndUpdateTrademark(trademarkParams);
            if (result.code==200){
                getHasTrademark(paginationConfig["current-page"]);
                ElMessage({
                    type: 'success',
                    message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
                });
            }else{
                return Promise.reject(new Error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败'))
            }

        }
    }
})
const validateLogo=(rule: any, value: any, callback: any)=>{
    if (value) {
        callback();
    } else {
        callback(new Error('LOGO图片务必上传'))
    }
}
const rules: FormRules = {
    tmName: [
        {required: true,message:'请输入品牌名称',trigger:'blur'},
        {min:2,message:'名称需要大于俩位',trigger:'blur'}
    ],
    logoUrl:[
        {required:true,validator:validateLogo,trigger:'blur'}
    ]
}
const updateTrademark=(row)=>{
    dialogVisible.value=true;
    trademarkParams.tmName='';
    trademarkParams.logoUrl='';
    nextTick(()=>{
        Object.assign(trademarkParams,row)
    })
}
const addTrademark=()=>{
    dialogVisible.value=true;
    delete trademarkParams.id;
    trademarkParams.tmName='';
    trademarkParams.logoUrl='';
}



</script>


<style scoped lang="scss">
</style>

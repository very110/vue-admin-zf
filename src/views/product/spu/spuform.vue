<template>
<div>
    <FormPlus  :formConfig="formConfig" :formData="fromData" ref="myFormPlus">
        <template #uploadSpu>
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                       :on-preview="handlePictureCardPreview"  :before-upload="handlerUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;" />
            </el-dialog>
        </template>
        <template #uploadSpuAttr>
            <el-select v-model="saleAttrIdAndValueName"
                       :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'">
                <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
                           :label="item.name"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" style="margin-left:10px"
                       type="primary" size="default" icon="Plus">添加属性</el-button>
            <TablePlus  :data="saleAttr" :config="tableConfig" :paginationConfig="paginationConfig" style="margin-top: 10px;">
                <template #spuAttr="{row}">

                    <el-popconfirm :title="`确定要删除${row.tmName}吗?`"
                                   :hide-after="100"
                                   @confirm="">
                        <template #reference>
                            <el-button type="danger" :icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>

            </TablePlus>

            <div style="margin-top:10px">
                <el-button type="primary">确定</el-button>
                <el-button>取消</el-button>
            </div>
        </template>
    </FormPlus>
</div>
</template>

<script setup lang="ts" name="spuForm">
import {computed, reactive, ref, toRef, toRefs} from "vue";
import {HasSaleAttr, SaleAttr, SpuData, SpuImg, Trademark} from "@/api/product/spu/type.ts";
import {reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList} from "@/api/product/spu";
import {FormConfig} from "@/components/el/FormPlus/src/type.ts";
import {ElMessage} from "element-plus";
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {Delete} from "@element-plus/icons-vue";

let spuParams = ref<SpuData>({
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
});

let saleAttr = ref<SaleAttr[]>([]);

let imgList = ref<SpuImg[]>([]);
let saleAttrIdAndValueName = ref<string>('')
let AllTradeMark=ref<Trademark[]>([]);
let allSaleAttr = ref<HasSaleAttr[]>([]);
let myFormPlus=ref();
let dialogImageUrl = ref<string>('')
let fromData=reactive({
    ...toRefs(spuParams.value),
    saleAttrIdAndValueName,
    imgList
})



const formConfig:FormConfig<any>=reactive({
        formItems:[
            {
                itemBind:{
                    prop:'spuName',
                    label:'SPU名称',
                    rules:[{trigger:'blur',required:true,message:'必填'}]
                },
                element:{
                    elementName:'el-input',
                    'input-style':{width:'60%'},
                    vModel:'spuName',
                    placeholder:'请输入Spu名称',

                },
                type:'slot'
            },
            {
                itemBind:{
                    label:'SPU品牌',
                    rules:[{trigger:'blur',required:true,message:'必填'}],
                    prop:'tmId'
                },
                type:"select",
                options:{
                    value:toRef(fromData,'tmId'),
                    label:'请选择spu品牌',
                    arrOptions:computed(()=>AllTradeMark.value),
                    subValue:'id',
                    subLabel:'tmName'
                }
            },
            {
                itemBind:{
                    label:'SPU描述',
                    prop: 'description',
                    rules:[{trigger:'blur',required:true,message:'必填'}],
                },
                type:'slot',
                element:{elementName: 'el-input',vModel: 'description',type:"textarea", placeholder:'请输入Spu描述',}

            },
            {
                itemBind:{
                    label:'SPU图片',
                    rules:[{trigger:'blur',validator:(rule, value, callback)=>{
                            return value.length>=1?callback():callback(new Error('必须上传至少一张图片'))
                            }
                    },{trigger:'blur',required:true,message:'必填'}],
                    prop: 'imgList'
                },
                type:'slot',
                element:{slotName:['default'],mySlotName:['uploadSpu'],elementName: 'div',}
            },
            {
                itemBind:{
                    label:'SPU销售属性'
                },
                type:'slot',
                element:{slotName:['default'],mySlotName:['uploadSpuAttr'],elementName: 'div',style:{width:'60%'}}
            },
        ],

    }
)

const tableConfig:TableConfig<any>={
    columns:[
        {
            type: "index",
            prop: "id",
            label: '序号',
            width: 100
        },
        {
            types: "txt",
            prop: "saleAttrName",
            label: '销售属性名称',
        },
        {
          label:'销售属性值',
            types:"tag",
            callback:(row,item)=>{
                return row.spuSaleAttrValueList?.map((item,index)=>{
                    return {
                        name:item.saleAttrValueName,
                        bind:{
                            closable:true
                        },
                        events:{
                            close:()=>{
                                console.log(1)
                            }
                        }
                    }
                })
            },
            newTag:true,
            newTagBlur:(row)=>{
              let name=row.saleAttrValue;
                if (!name?.trim()){
                    ElMessage({
                        type:'warning',
                        message:'不能为空'
                    })
                    return;
                }
                let repect=row.tagArr?.some((item)=>{
                    return item.name===name;
                })
                if (repect){
                    ElMessage({
                        type:'warning',
                        message:'不能有重复值'
                    })
                    return;
                }
                row.tagArr.push({
                    name
                })
                row.flag=false;

            },
            newTagModel:'saleAttrValue'
        },
        {
            label:'操作',
            width: 100,
            types:'slot',
            slotName:'spuAttr'
        },

    ]
}
const paginationConfig={
    hidden:true
}
let unSelectSaleAttr = computed(() => {
    //全部销售属性:颜色、版本、尺码
    //已有的销售属性:颜色、版本
    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName;
        });
    })
    return unSelectArr;
})
let dialogVisible=ref(false)
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
    //对话框弹出来
    dialogVisible.value = true;
}
const handlerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件务必PNG|JPG|GIF'
        })
        return false;
    }
}
const initSpuParams=async ()=>{
    Object.assign(spuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    });
   let result=await reqAllTradeMark();
    let result1=await reqAllSaleAttr();
    AllTradeMark.value=result.data;
    allSaleAttr.value=result1.data;
}
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    //追加到数组当中
    saleAttr.value.push(newSaleAttr);
    //清空收集的数据
    saleAttrIdAndValueName.value = '';

}
defineExpose({initSpuParams});
</script>


<style scoped lang="scss">


</style>
<script setup>
</script>

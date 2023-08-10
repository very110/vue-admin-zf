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
                <template #spuAttr="{row,$index}">

                    <el-popconfirm :title="`确定要删除${row.saleAttrName}属性吗?`"
                                   :hide-after="100"
                                   @confirm="deleteSaleAttr(row,$index)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" ></el-button>
                        </template>
                    </el-popconfirm>
                </template>

            </TablePlus>

            <div style="margin-top:10px">
                <el-button type="primary" @click="save" :disabled="formChanged">确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </template>
    </FormPlus>
</div>
</template>

<script setup lang="ts" name="spuForm">
import {computed, nextTick, reactive, ref, toRef, toRefs, watch} from "vue";
import {HasSaleAttr, SaleAttr, SpuData, SpuImg, Trademark} from "@/api/product/spu/type.ts";
import {
    reqAddOrUpdateSpu,
    reqAllSaleAttr,
    reqAllTradeMark,
    reqSpuHasSaleAttr,
    reqSpuImageList
} from "@/api/product/spu";
import {FormConfig} from "@/components/el/FormPlus/src/type.ts";
import {ElMessage} from "element-plus";
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {Delete} from "@element-plus/icons-vue";

const emit=defineEmits(['changeScene']);
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
let fromData=reactive({});
let initFromData =ref('');
let formChanged=computed(()=>{

    return JSON.stringify(fromData)+JSON.stringify(saleAttr.value)===initFromData.value;
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
                element:{slotName:['default'],mySlotName:['uploadSpuAttr'],elementName: 'div',style:{width:'80%'}}
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
            options:{
                events:({row,index})=>{
                    return {
                        close:()=>{
                            console.log(index)
                            row.tagArr.splice(index,1);
                        }
                    }
                },
                bind:{
                    closable:true
                },
            },
            showVal:'saleAttrValueName',
            callback:(row,item)=>{
              let result=row.spuSaleAttrValueList?.map((item2,index)=>{
                  return {
                      [item.showVal]:item2.saleAttrValueName,
                      baseSaleAttrId:item2.baseSaleAttrId,
                  }
              });
              if (result){
                  row.spuSaleAttrValueList=result
              }
                return result
            },
            newTag:true,
            newTagBlur:(row,item)=>{
              let name=row.saleAttrValue;
              let id=row.baseSaleAttrId
                if (!name?.trim()){
                    ElMessage({
                        type:'warning',
                        message:'不能为空'
                    })
                    return;
                }
                let repect=row.tagArr?.some((item1)=>{
                    return item1.saleAttrValueName===name;
                })
                if (repect){
                    ElMessage({
                        type:'warning',
                        message:'不能有重复值'
                    })
                    return;
                }
                row.tagArr.push({
                    saleAttrValueName:name,
                    baseSaleAttrId:id,
                })
                delete row.flag;
               Reflect.deleteProperty(row,item.newTagModel);
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

    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name  != item1.saleAttrName;
        });
    })
    return unSelectArr;
})
let dialogVisible=ref(false)
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
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
const initSpuParams=async (c3Id)=>{
    myFormPlus.value.myFrom.clearValidate();

    Object.assign(spuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    });
    delete spuParams.value.id
    Object.assign(fromData,{
        ...toRefs(spuParams.value),

        imgList
    })
   let result=await reqAllTradeMark();
    let result1=await reqAllSaleAttr();
    imgList.value = [];
    saleAttr.value = [];
    saleAttrIdAndValueName.value  = '';
    AllTradeMark.value=result.data;
    allSaleAttr.value=result1.data;
    spuParams.value.category3Id=c3Id;
}
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr);
    saleAttrIdAndValueName.value = '';
}
const cancel= () => {

    emit('changeScene',{flag:0,param:'update'})
}

const save=async () => {
        await myFormPlus.value.myFrom.validate();
    let cloneSaleAttr=JSON.parse(JSON.stringify(saleAttr.value));
    spuParams.value.spuSaleAttrList=cloneSaleAttr.map(item=>{
            delete item.tagArr;
            return item
    });
    spuParams.value.spuImageList=imgList.value.map(item=>({imgName:item.name,imgUrl:item.url}))
    let result=await reqAddOrUpdateSpu(spuParams.value);
    if(result.code==200){
        emit('changeScene',{flag:0,param:'add'});
        ElMessage({
            type:'success',
            message:`成功${spuParams.value.id?'修改':'添加'}`
        })
        imgList.value=[];
    }
}


const initHasSpuData = async (spu: SpuData) => {
    myFormPlus.value.myFrom.clearValidate();
    spuParams.value = spu;
    let result = await reqAllTradeMark();
    let result1 = await reqSpuImageList((spu.id as number));
    let result2= await reqSpuHasSaleAttr((spu.id as number));
    let result3= await reqAllSaleAttr();
    AllTradeMark.value = result.data;
    imgList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    Object.assign(fromData,toRefs(spuParams.value),{imgList});

    saleAttr.value = result2.data;
    allSaleAttr.value = result3.data;
    nextTick(()=>{
        initFromData.value=JSON.stringify(fromData)+JSON.stringify(saleAttr.value);
    })
}

const deleteSaleAttr=(row,index)=>{
    saleAttr.value.splice(index,1);
}
defineExpose({initSpuParams,initHasSpuData});
</script>


<style scoped lang="scss">


</style>

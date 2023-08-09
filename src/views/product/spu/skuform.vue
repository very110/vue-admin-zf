<template>
  <div class="SkuForm">
        <FormPlus :formData="formData" :formConfig="formConfig" ref="myForm">
            <template #platformDefault>
                <el-form :inline="true">
                    <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
                        <el-select v-model="item.attrIdAndValueId">
                            <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue, index) in item.attrValueList"
                                       :key="attrValue.id" :label="attrValue.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
            <template #saleDefault>
                <el-form :inline="true">
                    <el-form-item :label="item.saleAttrName" v-for="(item, index) in saleArr" :key="item.id">
                        <el-select v-model="item.saleIdAndValueId">
                            <el-option :value="`${item.id}:${saleAttrValue.id}`"
                                       v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                                       :label="saleAttrValue.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
            <template #imgDefault>
                <TablePlus ref="myTable" :data="imgArr" :config="tableConfig" :paginationConfig="paginationConfig" style="width: 80%;">
                    <template #imgDefault="{row}">
                        <img :src="row.imgUrl" alt="" style="max-width: 100px;">
                    </template>
                    <template #operationDefault="{row}">
                        <el-button type="primary" @click="handlerOperation(row)" size="small">设置默认</el-button>
                    </template>
                </TablePlus>
            </template>
        </FormPlus>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
  </div>
</template>

<script setup lang="ts" name="skuForm">
import {reactive, ref, toRef, toRefs} from "vue";
import {SkuData} from "@/api/product/spu/type.ts";
import TablePlus from "@/components/el/TablePlus/src/TablePlus.vue";
import {FormConfig} from "@/components/el/FormPlus/src/type.ts";
import {reqAttr} from "@/api/product/attr";
import {reqAddSku, reqSpuHasSaleAttr, reqSpuImageList} from "@/api/product/spu";
import {TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
import {ElMessage} from "element-plus";
let attrArr=ref([]);
let emit=defineEmits(['changeScene'])
let saleArr=ref([]);
let imgArr=ref([])

const tableConfig:TableConfig<any>={
      columns:[
          {
              label:'图片',
              types:'slot',
              slotName:'imgDefault'
          },{
              label:'名称',
              types:'txt',
              prop:'imgName'
          },{
              label:'操作',
              types:'slot',
              slotName:'operationDefault'
          },
      ],
    checkbox:true
}
const myTable=ref(null);
const myForm=ref(null)

const cancel=()=>{
    myForm.value.myFrom.clearValidate();
    emit('changeScene',{flag:0,param:'update'})
}
const handlerOperation=(row)=>{
    imgArr.value.forEach(item=>{
        myTable.value.elTable.toggleRowSelection(item,false)
    })
    myTable.value.elTable.toggleRowSelection(row,true)
    skuParams.skuDefaultImg=row.imgUrl;
}

const paginationConfig={
    hidden:true
}

let skuParams = reactive<SkuData>({
    //父组件传递过来的数据
    "category3Id": "",//三级分类的ID
    "spuId": "",//已有的SPU的ID
    "tmId": "",//SPU品牌的ID
    //v-model收集
    "skuName": "",//sku名字
    "price": "",//sku价格
    "weight": "",//sku重量
    "skuDesc": "",//sku的描述

    "skuAttrValueList": [//平台属性的收集
    ],
    "skuSaleAttrValueList": [//销售属性
    ],
    "skuDefaultImg": "",//sku图片地址
})
let formData=reactive({
    ...toRefs(skuParams),
})
let formConfig:FormConfig<any>={
    formItems:[
        {
            itemBind:{
                label:'SKU名称',
                rules:[{trigger:'blur',required:true,message:'必填'}],
                prop:'skuName'
            },
            element:{
                elementName:'el-input',
                'input-style':{width:'60%'},
                vModel:'skuName',
                placeholder:'请输入SKu名称',
            },
            type:'slot'
        },
        {
            itemBind:{
                rules:[{trigger:'blur',required:true,message:'必填'}],
                prop:'price',
                label:'价格(元)',
            },
            element:{
                elementName:'el-input',
                'input-style':{width:'60%'},
                vModel:'price',
                placeholder:'价格(元)',
            },
            type:'slot'
        },
        {
            itemBind:{
                label:'重量(g)',
                rules:[{trigger:'blur',required:true,message:'必填'}],
                prop:'weight'
            },
            element:{
                elementName:'el-input',
                'input-style':{width:'60%'},
                vModel:'weight',
                placeholder:'重量(g)',
            },
            type:'slot'
        }, {
            itemBind:{
                label:'sku描述',
            },
            element:{
                elementName:'el-input',
                'input-style':{width:'80%'},
                vModel:'skuDesc',
                placeholder:'sku描述',
                type:"textarea"
            },
            type:'slot'
        }, {
            itemBind:{
                label:'平台属性',
            },
            element:{
                elementName:'div',
                slotName:['default'],
                mySlotName:['platformDefault']
            },
            type:'slot'
        },
        {
            itemBind:{
                label:'销售属性',
            },
            element:{
                elementName:'div',
                slotName:['default'],
                mySlotName:['saleDefault']
            },
            type:'slot'
        },{
            itemBind:{
                label:'图片名称',
            },
            element:{
                elementName:'div',
                style:'width:100%',
                slotName:['default'],
                mySlotName:['imgDefault']
            },
            type:'slot'
        },

    ]
}
const save=async()=>{
    await myForm.value.myFrom.validate();
    skuParams.skuAttrValueList=attrArr.value.map(item=>{
        if (item.attrIdAndValueId){
            let [attrId, valueId]=item.attrIdAndValueId.split(':');
            return{
                attrId,
                valueId
            }
        }

    }).filter(Boolean);

    skuParams.skuSaleAttrValueList=saleArr.value.map(item=>{
        if (item.saleIdAndValueId){
            let [saleAttrId, saleAttrValueId]=item.saleIdAndValueId.split(':')
            return {
                saleAttrId,
                saleAttrValueId
            }
        }
    }).filter(Boolean);

    let result=await reqAddSku(skuParams);
    if (result.code==200){
        ElMessage({
            type:'success',
            message:'添加sku成功'
        })
    }else{
        ElMessage({
            type:'success',
            message:result.message
        })
    }
    emit('changeScene',{flag:0,param:'update'})

}
const initData=async (c1Id,c2Id,row)=>{
    skuParams.spuId=row.id;
    skuParams.category3Id=row.category3Id;
    skuParams.tmId=row.tmId;
    skuParams.skuName='';
    skuParams.weight='';
    skuParams.skuDesc='';
    skuParams.price='';
    let result: any = await reqAttr(c1Id, c2Id, row.category3Id);
    //获取对应的销售属性
    let result1: any = await reqSpuHasSaleAttr(row.id);
    //获取照片墙的数据
    let result2: any = await reqSpuImageList(row.id);
    attrArr.value=result.data;
    saleArr.value=result1.data;
    imgArr.value=result2.data;
}
defineExpose({initData})
</script>


<style scoped lang="scss">


</style>

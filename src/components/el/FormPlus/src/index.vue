<template>
  <div class="formPlus">
      <el-form :model="formData" v-bind="$attrs" ref="myElForm">
             <el-form-item v-for="(formItem,index) in formConfig.formItems"
                           v-bind="formItem.bind"
                           ref="elFormItems"
                           :key="index">
                    <Component v-if="formItem.type==='slot'" :is="formItem.element?.elementName" v-bind="formItem.element" v-model="formData[formItem.element?.vModel]">
                                <p v-if="formItem.element?.label">{{formItem.element?.label}}</p>
                                <template v-for="(item,index) in formItem.element?.slotName" #[item]="scope">
                                    <slot :name="formItem.element?.mySlotName?.[index]" v-bind="scope||{}"></slot>
                                </template>
                    </Component>
             </el-form-item>

            <el-form-item v-if="formConfig.confirmAndReset">
                <div class="ggc" :style="{justifyContent:align}">
                    <el-button type="primary" @click="submitForm">确定</el-button>
                    <el-button @click="resetForm(myElForm)">重置</el-button>
                </div>
            </el-form-item>
      </el-form>
  </div>
</template>

<script setup lang="ts" name="FormPlus">
import type{FormConfig} from "@/components/el/FormPlus/src/type.ts"
import {onMounted, reactive, ref, toRef, toRefs, watch,computed} from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import {ElMessage} from "element-plus";
// noinspection TypeScriptValidateTypes
 const props= withDefaults(defineProps<{
      formData:Object,
     formConfig:FormConfig<any>
  }>(),{
      formData:()=>{},
     formConfig:()=>{}
  })
const {formData,formConfig}=toRefs(props)
const myElForm=ref<FormInstance>();
const elFormItems=ref(null);

const alignEnum ={
    left:'flex-start',
    center:'center',
    right:'flex-end',
}
const align= computed(()=>{
    return alignEnum[formConfig.value.confirmAndReset?.align];
})

const resetForm=(elForm:FormInstance)=>{
    if (!elForm) return;
    elForm.resetFields();
}
const submitForm=async (elForm:FormInstance)=>{
    if (!elForm) return;

   try {
       await elForm.validate();
       formConfig.value.confirmAndReset?.validateSuccess();
   }catch (e) {
       ElMessage({
           type:'error',
           message:e.message
       })
   }
}
</script>


<style scoped lang="scss">


.ggc{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>

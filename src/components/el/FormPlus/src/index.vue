<template>
  <div class="formPlus">
      <el-form :model="formData" v-bind="$attrs" ref="myElForm">
             <el-form-item v-for="(formItem,index) in formConfig.formItems"
                           v-bind="formItem.itemBind"
                           ref="elFormItems"
                           :key="index">
                    <Component v-if="formItem.type==='slot'" :is="formItem.element?.elementName" v-bind="formItem.element" v-model="formData[formItem.element?.vModel]">
                                <p v-if="formItem.element?.label">{{formItem.element?.label}}</p>
                                <template v-for="(item,index) in formItem.element?.slotName" #[item]="scope">
                                    <slot :name="formItem.element?.mySlotName?.[index]" v-bind="scope||{}"></slot>
                                </template>
                    </Component>
                 <el-upload
                         v-if="formItem.type==='upload'"
                         class="avatar-uploader"
                         :action="formItem.options.action"
                         :show-file-list="false"
                         :on-success="formItem.options.onSuccess"
                         :before-upload="formItem.options.beforeUpload"
                         v-bind="formItem.options.bind"
                 >
                     <img v-if="formItem.options.imgUrl" :src="formItem.options.imgUrl" class="avatar" />
                     <el-icon v-else class="avatar-uploader-icon"><Component :is="formItem.options.icon?formItem.options.icon:'Plus'"></Component></el-icon>
                 </el-upload>

             </el-form-item>
            <el-form-item v-if="formConfig.confirmAndReset" style="width: 100%;">
                <div class="ggc" :style="{justifyContent:align}">
                    <el-button type="primary" @click="submitForm">确定</el-button>
                    <el-button @click="resetForm">重置</el-button>
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

const resetForm=()=>{
    if (!myElForm) return;
    console.log(1)
   myElForm.value.resetFields()
}
const submitForm=async ()=>{
    if (!myElForm) return;
       await myElForm.value?.validate()
       try {
           formConfig.value.confirmAndReset?.validateSuccess();
       }catch (e) {
           ElMessage({
               type: 'success',
               message:e.message
           });
       }

}
defineExpose({
    'myFrom':myElForm
})
</script>


<style scoped lang="scss">


.ggc{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 20vw;/* px-to-viewport-ignore */
    height: 20vw;
    max-width: 178px;
    max-height: 178px;
    text-align: center;
}
</style>

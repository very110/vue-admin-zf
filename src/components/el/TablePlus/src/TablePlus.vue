<template>
  <div>
      <el-table :data="data"
                :highlight-current-row="true"
                v-bind="$attrs"
                ref="MyTable">
          <el-table-column type="selection" v-if="config.checkbox" width="35"></el-table-column>
                  <el-table-column ref="MyColumns" v-for="(item, index) in config.columns"
                                   :key="index"
                                   align="center"
                                   v-bind="item">
                      <template #default="{row}">
                          <p v-if="item.types==='callback'">{{item.callback(row)}}</p>
                          <slot :name="item.slotName" v-if="item.slotName" :row="row"></slot>
                      </template>
                      <template #header="{column}" v-if="item.slotHeader">
                          <slot :name="item.slotHeader" :column="column"></slot>
                      </template>
                  </el-table-column>
                <template v-for="(value,name) in $slots" #[name]>
                        <slot :name="name"></slot>
                </template>
      </el-table>
      <el-pagination class="scale"
                     style="justify-content: center;"
                     background
                     :hide-on-single-page="true"
                     layout="prev,pager,next,->,total,sizes,jumper"
                     v-if="!paginationConfig.hidden"
                     @size-change="sizeChange"
                     @current-change="emit('ChangeGetData',paginationConfig['current-page'])"
                     v-bind="paginationConfig"
                     :page-sizes="[3,6,9,12]"
                     v-model:page-size="paginationConfig['page-size']"
                     v-model:current-page="paginationConfig['current-page']"
                     v-on="paginationConfig.events||{}"/>
  </div>
</template>

<script setup lang="ts" name="TablePlus">
import {onMounted, reactive, ref, toRefs, useAttrs, useSlots,computed} from "vue";
import type{TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
const emit=defineEmits(['ChangeGetData'])
// noinspection TypeScriptValidateTypes
const props=withDefaults(defineProps<
    {
        data:Array<any>,
        config:TableConfig<any>,
        paginationConfig:Object,
    }
>(),{
    data:()=>[],
    config:()=>{},
    paginationConfig:()=>{},
})
const sizeChange=(pageSize)=>{
    emit('ChangeGetData');
}
let {data,config,paginationConfig}=toRefs(props);
const MyTable=ref(null);
const MyColumns=ref(null);
defineExpose({
    'elTable':MyTable,
})

</script>


<style scoped lang="scss">

@for $i from 0 to 2{

  @media (width>$i * 600px) and (width<600px + $i * 200){
    .scale{
      transform:scale(.6 + $i * 0.2);
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes fade {
    0%{
      opacity: 0;
      transform:translateX(-30px);
    }
  100%{
    opacity: 1;

  }
}



</style>


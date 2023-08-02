<template>
  <div>
      <el-table :data="data"
                :highlight-current-row="true"
                v-bind="$attrs"
                ref="MyTable">
          <el-table-column ref="MyColumns" v-for="(item, index) in config.columns"
                           :key="index"
                           align="center"
                           v-bind="item"
            >
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
      <el-pagination class="scale" style="justify-content: center;" background layout="prev,pager,next,->,total,sizes,jumper" :total="100" v-if="!paginationConfig.hidden" v-bind="paginationConfig"  v-on="paginationConfig.events||{}"/>
  </div>
</template>

<script setup lang="ts" name="TablePlus">
import {onMounted, reactive, ref, toRefs, useAttrs, useSlots} from "vue";
import type{TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
const emit=defineEmits(['']);

// noinspection TypeScriptValidateTypes
const props=withDefaults(defineProps<
    {
        data:Array<any>,
        config:TableConfig<any>,
        paginationConfig:Object
    }
>(),{
    data:()=>[],
    config:()=>{},
    paginationConfig:()=>{}
})


const {data,config,paginationConfig}=toRefs(props);
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




</style>


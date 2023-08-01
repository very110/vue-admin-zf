<template>
  <div >
      <el-table :data="data"
                :stripe="true"
                v-bind="$attrs"
                ref="MyTable">
          <el-table-column ref="MyColumns" v-for="(item, index) in config.columns"
                           :key="index"
                           v-bind="item"
            >
          <template #default="{row}">
<!--             <p v-if="item.types==='txt'">{{row[item.prop]}}</p>-->
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
  </div>
</template>

<script setup lang="ts" name="TablePlus">
import {onMounted, reactive, ref, toRefs, useSlots} from "vue";
import type{TableConfig} from "@/components/el/TablePlus/src/props/config.ts";
const emit=defineEmits(['']);
const slots = defineSlots<{
    empty(): any
}>()
const props=defineProps<
    {
      data:[],
      config:TableConfig<any>
    }
>()
const {data,config}=toRefs(props);
const MyTable=ref(null);
const MyColumns=ref(null);


defineExpose({
    'elTable':MyTable,
    'elColumns':MyColumns
})
</script>


<style scoped lang="scss">


</style>


<template>
  <template v-for="(item,index) in menuList">
      <template v-if="!item.children">
          <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="itemMenuClick">
              <el-icon>
                  <component :is="item.meta.icon"></component>
              </el-icon>
              <template #title><span>{{item.meta.title}}</span></template>
          </el-menu-item>
      </template>

      <template v-if="item.children?.length===1">
          <el-menu-item :index="item.path" @click="itemMenuClick">
              <el-icon>
                  <component :is="item.children[0].meta.icon"></component>
              </el-icon>
              <template #title><span>{{item.children[0].meta.title}}</span></template>
          </el-menu-item>
      </template>

      <template v-if="item.children?.length>1">
          <el-sub-menu :index="item.path">
              <template #title>
                  <el-icon><component :is="item.meta.icon"></component></el-icon>
                  <span>{{item.meta.title}}</span>
              </template>
              <Menu :menuList="item.children"></Menu>
          </el-sub-menu>
      </template>

  </template>
</template>

<script setup lang="ts" name="Menu">
import type{RouteRecordRaw} from "vue-router";

import {onMounted} from "vue";
import useLayOutSettingStore from "@/store/module/setting.ts";
let layoutOutSettings= useLayOutSettingStore();
let {menuList=[]}=defineProps<{
    menuList:RouteRecordRaw
}>()

const itemMenuClick=()=>{
    if (window.innerWidth<=990){
        layoutOutSettings.fold=true
    }
}

</script>


<style scoped lang="scss">
.menuList{

}

</style>

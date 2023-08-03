<template>
    <div class="zz">
        <div class="layout-container" :class="{closeMenu:LayOutSettingStore.fold}">
            <div class="logo">
                <Logo></Logo>
            </div>
            <div class="tabBar">
                <TabBar></TabBar>
            </div>
            <div class="menu" >
               <div class="el-deep">
                   <div class="menu-text">MENU</div>
                   <el-menu
                       :default-active="$router.path"
                       :collapse="LayOutSettingStore.fold"
                       @open="menuHandleOpen"
                       @close="menuHandleClose"
                       router
                       :background-color="themeColor.menuAndTabbarBG"
                       :text-color="themeColor.textColor"
                   >
                       <Menu :menuList="constRoutes"></Menu>

                   </el-menu>
               </div>
            </div>
            <div class="main" style="overflow: auto">
                    <Main></Main>
            </div>
            <div class="mask" @click="LayOutSettingStore.fold=!LayOutSettingStore.fold"></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="layout">
  import Logo from './logo/index.vue';
  import TabBar from './tabBar/index.vue';
  import Main from "./main/index.vue"
  import Menu from './menu/index.vue';
  import useLayOutSettingStore from "@/store/module/setting.ts";
  import {themeColor} from "@/utils/themes.ts";
  import {constRoutes} from "@/router/routes.ts"
  import {useRoute} from "vue-router";
    let LayOutSettingStore=useLayOutSettingStore();
  const menuHandleOpen=()=>{}
  const menuHandleClose=()=>{}
  let $router =useRoute();

</script>


<style scoped lang="scss">
@import "@/styles/variable";
.el-deep{
    &:deep(.el-menu){
        border: none;
    }
    &:deep(.el-menu .el-menu-item:hover){
       background-color: initial;
        @include themeColors{
            background-image: getThemeValues(hoverMenuItem);
        }

    }
}
.layout-container {
    transition:.5s;
    *{
        user-select: none;
    }
  position: relative;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns:$base-menu-width 1fr;
  grid-template-rows: $base-tabbar-height 1fr;

  .logo {
      transition:.3s linear;
      width: 100%;
      overflow: hidden;
    background-image: linear-gradient(to right bottom, #0396FF , #ABDCFF);
  }

  .menu {
      z-index: 999;
      width: 100%;
    @include themeColors {
      background-color: getThemeValues(menuAndTabbarBG);
    }
      overflow-x:hidden;
      overflow-y: auto;
      .el-deep{
          margin-top: 20%;
      }

      .menu-text{
          @include themeColors{
              color: getThemeValues(textColor);
          }
          font-size: 11px;
          margin-left: 10%;
          margin-bottom: 10px;

      }
  }

  .tabBar {
    @include themeColors {
      background-color: getThemeValues(menuAndTabbarBG);
    }
  }

  .main {
      position: relative;
        padding: 20px;
  }
}
.layout-container.closeMenu{
    grid-template-columns:70px 1fr;
}

@media (width <= 990px){
    .layout-container{
        grid-template-columns:0 1fr;
    }
    .layout-container.closeMenu{
        grid-template-columns:0 1fr;
    }
    .menu:not(.layout-container.closeMenu .menu) {
        /* px-to-viewport-ignore-next */
        width: 250px;

        z-index: 999;
        transition: 1s;
        transform: translateX(0px);
    }
    .logo:not(.layout-container.closeMenu .logo){
        transition: 1s;
        /* px-to-viewport-ignore-next */
        width: 250px;
        z-index: 999;
        transform: translateX(0px);
    }
    .mask:not(.layout-container.closeMenu .mask) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color:rgba(0,0,0,.5);
        z-index: 998;
    }
}
@keyframes qr {
    0%{opacity: 0;
    }
}

</style>


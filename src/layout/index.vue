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
                       <Menu :menuList="UserStore.menuRoutes"></Menu>

                   </el-menu>
               </div>
            </div>
            <div class="main" style="overflow: auto">
                    <Main></Main>
            </div>
            <div class="mask" @click="LayOutSettingStore.fold=!LayOutSettingStore.fold"></div>
        </div>
        <Mask
                @confirm="maskConfirm"
                @clearMask="maskClear"
                v-if="!oneLayout&&maskStore.status"
                :width="curElement?.width+10"
              :height="curElement?.height+10" :left="curElement?.left-5" :top="curElement?.top-5"
              :message="curElement?.message"></Mask>
    </div>
</template>

<script setup lang="ts" name="layout">
  import Logo from './logo/index.vue';
  import TabBar from './tabBar/index.vue';
  import Main from "./main/index.vue"
  import Menu from './menu/index.vue';
  import useLayOutSettingStore from "@/store/module/setting.ts";
  import {themeColor} from "@/utils/themes.ts";

  import {useRoute} from "vue-router";
  import {useUserStore} from "@/store/module/user.ts";
  import {useMaskStore} from "@/store/module/mask.ts";
  import {ref, watch} from "vue";
    let LayOutSettingStore=useLayOutSettingStore();
  const menuHandleOpen=()=>{}
  const menuHandleClose=()=>{}
  let $router =useRoute();
const UserStore=useUserStore();
  let maskStore=useMaskStore();
  maskStore.requiredQuantity=4;
  let curElement =ref(null);
  let firstElement =null;
  let oneLayout=localStorage.getItem('Layout')||false;

  const maskConfirm=()=>{
      firstElement.style.zIndex=0;
      firstElement =maskStore.maskPop();
      curElement.value=firstElement.getBoundingClientRect();
      firstElement.style.zIndex=9999;
      Object.assign(curElement.value,{message:firstElement.message})
  }

  const maskClear=()=>{
      firstElement.style.zIndex=0;
      if (!oneLayout){
          localStorage.setItem('Layout', 'Layout');
      }
      maskStore.$reset();
  }


  let maskWatch=watch(()=>maskStore.maskQueue.length,()=>{

      if (maskStore.requiredQuantity==maskStore.maskQueue.length) maskStore.status=true;

      if (maskStore.status){
          setTimeout(()=>{
              firstElement=maskStore.maskPop();
              curElement.value=firstElement.getBoundingClientRect();
              firstElement.style.zIndex=9999;
              Object.assign(curElement.value,{message:firstElement.message})
              maskWatch();
          },600)
      }

  })
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
     @include themeColors{
         background-color: getThemeValues(mainBg);
     }
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


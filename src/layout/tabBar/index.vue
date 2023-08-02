<template>
  <div class="tab-content" style="transform-origin: right top">
      <div class="left">
          <el-icon :size="18" :color="themeColor.textColor" class="hover-icon" @click="LayOutSettingStore.fold=!LayOutSettingStore.fold"><component :is="LayOutSettingStore.fold?'Expand':'Fold'"></component></el-icon>
          <div class="text-icon">
              <div class="el-deep">
                  <el-breadcrumb separator-icon="ArrowRight">
                      <el-breadcrumb-item  v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
                          <div class="hover-icon">
                              <el-icon :size="18" :color="themeColor.textColor">
                                  <component :is="item.meta.icon"></component>
                              </el-icon>
                              <span >{{item.meta.title}}</span>
                          </div>
                      </el-breadcrumb-item>
                  </el-breadcrumb>
              </div>

          </div>

      </div>
      <div class="right">
          <div class="smallFeature">
                <div class="el-deep">
                    <el-input v-model="filterKey"  placeholder="搜索">
                        <template #prefix>
                            <el-icon :size="18" :color="themeColor.textColor">
                                <Search />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
              <el-button size="small"  circle  title="刷新表格数据"  :color="themeColor.bgColor" @click="clickRefresh"><el-icon size="16" :color="themeColor.textColor"><Refresh></Refresh></el-icon></el-button>
              <el-button size="small"  title="全屏" circle @click="fullScreen" :color="themeColor.bgColor"><el-icon :size="16" :color="themeColor.textColor"><FullScreen /></el-icon></el-button>
              <el-button size="small"  title="切换主题" circle @click="switchTheme" :color="themeColor.bgColor"><el-icon :size="16" :color="themeColor.textColor"><component :is="theme==='dark'?'MoonNight':'Sunny'"></component></el-icon></el-button>
          </div>
          <div class="exitLogin">
              <el-dropdown  :show-timeout="100">
                  <div class="avatar">
                      <img :src="userStore.avatar">
                      <span>{{userStore.username}}</span><el-icon class="el-icon--right" size="16" :color="themeColor.textColor"><arrow-down /></el-icon>
                  </div>

                  <template #dropdown>
                      <el-dropdown-menu>
                          <el-dropdown-item @click="ElMessage('暂未开发,时间匆忙')">个人设置</el-dropdown-item>
                          <el-dropdown-item @click="exitLogin" divided>退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                  </template>
              </el-dropdown>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts" name="tabBar">

  import {themeColor,getTheme,setTheme} from "@/utils/themes.ts";
  import {REMOVE_TOKEN}  from "@/utils/token.ts"
  import useLayOutSettingStore from "@/store/module/setting.ts";
  import {useRoute,useRouter} from "vue-router";
  import {ElMessage} from "element-plus";
  import {nextTick, ref} from "vue";
  import {useUserStore} from "@/store/module/user.ts";
  let theme=getTheme();
  let $route =useRoute();
  let $router=useRouter();
  let LayOutSettingStore=useLayOutSettingStore();
  let filterKey =ref('');
  let userStore=useUserStore();
  const switchTheme=()=>{
      theme=theme==='dark'?'light':'dark';
      setTheme(theme);
  }
  console.log(userStore)

  const fullScreen=()=>{
      let flag=document.fullscreenElement;
      if (flag){
          document.exitFullscreen();
      }
      document.documentElement.requestFullscreen();
  }

  const clickRefresh=()=>{
      LayOutSettingStore.refsh=true;
        nextTick(()=>{
            LayOutSettingStore.refsh=false;

        })
  }
  const exitLogin=async ()=>{
       try {
           await userStore.userLogout();
       }catch (e){
           ElMessage({
               type:'warning',
               message: e.message
           })
       }
      await $router.push({path:'/login'});

  }

</script>


<style scoped lang="scss">
@import "@/styles/variable";

.el-deep{
    &:deep(.hover-icon){
        height: 100%;
        width: fit-content;
        display: flex;
        align-items: center;
        gap:0 2px;
        cursor: pointer;
        @include themeColors{
            color: getThemeValues(textColor);
        }
        &:hover>span,&:hover>i{
            color: #499dff;
            transition: .3s;
        }
    }
    &:deep(.el-input__wrapper){
        width: 35px;
        height: 25px;
        border-radius: 55px;
        @include themeColors{
            color: getThemeValues(textColor);
            background-color: getThemeValues(bgColor);
            min-width: 0;
        }
        &:focus-within{
            min-width: 70px !important;

            transition: .3s;
            width: 150px;
        }
        input{
            @include themeColors{
                color: getThemeValues(textColor);
            }
        }
    }

}
.tab-content{
  @include themeColors{
      color: getThemeValues(textColor);
  }
  width: 100%;
  height: 100%;
  display: flex;
  .left{
      *{
          user-select: none;
      }
    .text-icon{
      display: flex;
      align-items: center;
        gap: 0 2px;
        @media (width<=440px) {
           display: none;
        }
    }
      i:hover{
          color: #499dff;
          transition: .3s;
          cursor: pointer;
      }
    margin-left: 20px;
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 10px;
  }


    .right{
        *{
            user-select: none;
        }
        .smallFeature{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0 10px;
        }
        height: 100%;
        width: fit-content;
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 0 30px;
        padding-right:30px;
        .exitLogin{
            display: flex;
            align-items: center;
            height: 100%;
            cursor: pointer;
            .avatar{
              display: flex;
              width: 100%;
              height: 100%;
              justify-content: space-evenly;
              align-items: center;
                gap: 0 5px;
                @include themeColors{
                    color:getThemeValues(textColor)
                }
                img{
                  border-radius:50%;
                    /* px-to-viewport-ignore-next */
                    width: 30px;
                    height: 30px;
                    object-fit: cover;
                    object-position: center center;
                }
            }
        }
    }
}

</style>

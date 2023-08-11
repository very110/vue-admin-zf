<template>
    <div class="tab-content" style="transform-origin: right top">
        <div class="left">
            <el-icon :size="18" :color="themeColor.textColor" class="hover-icon"
                     @click="LayOutSettingStore.fold=!LayOutSettingStore.fold">
                <component :is="LayOutSettingStore.fold?'Expand':'Fold'"></component>
            </el-icon>
            <div class="text-icon">
                <div class="el-deep">
                    <el-breadcrumb separator-icon="ArrowRight">
                        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title"
                                            :to="item.path">
                            <div class="hover-icon">
                                <el-icon :size="18" :color="themeColor.textColor">
                                    <component :is="item.meta.icon"></component>
                                </el-icon>
                                <span>{{ item.meta.title }}</span>
                            </div>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

            </div>

        </div>
        <div class="right">
            <div class="smallFeature">
                <div class="el-deep">
                   <div class="search">
                       <el-input :style="{width:inputWidth,'z-index':inputZIndex}" v-model="filterKey" placeholder="搜索" @focus="handlerFocus">
                           <template #prefix>
                               <el-icon :size="18" :color="themeColor.textColor">
                                   <Search/>
                               </el-icon>
                           </template>
                       </el-input>
                       <div class="dropdown" v-show="dropdown">
                           <div  v-show="searchHistory.length>0">
                               <div class="title" ><div class="title-left">搜索历史</div><div class="title-right" @click="clearHistory">清空</div></div>
                               <div class="history">
                                   <ul>
                                       <li v-for="(item,index) in searchHistoryCom" :key="$v1()">
                                           <el-tag  closable @close="handleClose(item,index)">
                                               <router-link :style="{'text-decoration':'none',color:'#000'}" @click="jumpClick(item)" :to="item.path">{{item.meta.title}}</router-link>
                                           </el-tag>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                           <div class="result">
                               <div v-show="searchResult.length>0">搜索结果</div>
                               <ul v-show="searchResult.length>0">
                                   <li v-for="(item,index) in searchResult" :key="$v1()">
                                       <el-tag>
                                           <router-link :style="{'text-decoration':'none',color:'#000'}" @click="jumpClick(item)" :to="item.path">{{item.meta.title}}</router-link>
                                       </el-tag>
                                   </li>
                               </ul>
                               <p v-show="searchResult.length<=0">没有搜索到,请换个关键字搜索</p>
                           </div>
                       </div>
                   </div>
                    <div class="mask" @click="disappearClick" v-show="dropdown"></div>
                </div>
                <el-button size="small" circle title="刷新表格数据" :color="themeColor.bgColor" @click="clickRefresh">
                    <el-icon size="16" :color="themeColor.textColor">
                        <Refresh></Refresh>
                    </el-icon>
                </el-button>
                <el-button size="small" title="全屏" circle @click="fullScreen" :color="themeColor.bgColor">
                    <el-icon :size="16" :color="themeColor.textColor">
                        <FullScreen/>
                    </el-icon>
                </el-button>
                <el-button size="small" title="切换主题" circle @click="switchTheme" :color="themeColor.bgColor">
                    <el-icon :size="16" :color="themeColor.textColor">
                        <component :is="theme==='dark'?'MoonNight':'Sunny'"></component>
                    </el-icon>
                </el-button>
            </div>
            <div class="exitLogin">
                <el-dropdown :show-timeout="100">
                    <div class="avatar">
                        <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.RR6081d7yzmAye6o8mNUggAAAA?w=200&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7">
                        <span>{{ userStore.username }}</span>
                        <el-icon class="el-icon--right" size="16" :color="themeColor.textColor">
                            <arrow-down/>
                        </el-icon>
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
import {getTheme, setTheme, themeColor} from "@/utils/themes.ts";
import useLayOutSettingStore from "@/store/module/setting.ts";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {computed, nextTick, reactive, ref} from "vue";
import {useUserStore} from "@/store/module/user.ts";



let theme = getTheme();
let $route = useRoute();
let $router = useRouter();
let LayOutSettingStore = useLayOutSettingStore();
let filterKey = ref('管理');
let userStore = useUserStore();
let dropdown=ref(false);
let inputWidth=ref('35px');
let inputZIndex=ref(0);
let searchHistory=ref(JSON.parse(localStorage.getItem('searchHistory'))||[]);

let searchHistoryCom= computed(()=>{

    return searchHistory.value;
})
const handlerFocus = () => {
    dropdown.value=true;
    inputWidth.value='130px';
    inputZIndex.value=9999;
}
const disappearClick=()=>{
    dropdown.value=false;
    inputWidth.value='35px';
    inputZIndex.value=0;
}

const switchTheme = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
}
const handleClose=(item,index)=>{
    let arr:[]=JSON.parse(localStorage.getItem('searchHistory'))||[];
    arr.splice(index,1);
    searchHistory.value.splice(index,1);
    localStorage.setItem('searchHistory',JSON.stringify(arr));
}
const clearHistory=()=>{
    localStorage.removeItem('searchHistory');
    searchHistory.value=[];
}
const jumpClick=(item)=>{
    let arr:[]=JSON.parse(localStorage.getItem('searchHistory'))||[];
    let index=-1;
    if (!arr.some((item1,index1)=>{
        if (item.meta.title==item1.meta.title){
            index=index1;
            return true;
        }
    })){
        searchHistory.value.unshift(item);
        arr.unshift(item);
        localStorage.setItem('searchHistory',JSON.stringify(arr));
    }else{
        searchHistory.value.splice(index,1);
        searchHistory.value.unshift(item);
        arr.splice(index,1);
        arr.unshift(item);
        localStorage.setItem('searchHistory',JSON.stringify(arr));
    }
}
const searchResult =computed(()=>{
    return filterMenuSearch(userStore.menuRoutes,filterKey.value);
})
const filterMenuSearch=(allMenu,keyword,initArr=[])=>{
    allMenu.forEach(item=>{
        if (item.children&&item.children.length>0){
           filterMenuSearch(item.children,keyword,initArr)
        }
        let lowerName=item.meta?.title?.toLowerCase();
        let hidden=item.meta?.hidden;
        if (!hidden&&lowerName&&keyword&&lowerName.includes(keyword)){
            initArr.push(item);
        }
    })
    return initArr;
}


const fullScreen = () => {
    let flag = document.fullscreenElement;
    if (flag) {
        document.exitFullscreen();
    }
    document.documentElement.requestFullscreen();
}

const clickRefresh = () => {
    LayOutSettingStore.refsh = true;
    nextTick(() => {
        LayOutSettingStore.refsh = false;

    })
}
const exitLogin = async () => {
    try {
        await userStore.userLogout();
    } catch (e) {
        ElMessage({
            type: 'warning',
            message: e.message
        })
    }
    await $router.push({path: '/login'});

}

</script>


<style scoped lang="scss">
@import "@/styles/variable";

.mask{
    position:fixed;
    left:0;
    top: 0;
    z-index: 1999;
    width: 100vw;
    height: 100vh;
}
.el-deep {

  &:deep(.hover-icon) {
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 0 2px;
    cursor: pointer;
    @include themeColors {
      color: getThemeValues(textColor);
    }

    &:hover > span, &:hover > i {
      color: #499dff;
      transition: .3s;
    }
  }

    &:deep(.el-input) {
        transition: .5s linear;
    }
  &:deep(.el-input__wrapper) {
    width: 35px;
    height: 25px;
    border-radius: 55px;
    @include themeColors {
      color: getThemeValues(textColor);
      background-color: getThemeValues(bgColor);
      min-width: 0;
    }

    &:focus-within {
      //min-width: 70px;
      //transition: .3s;
      //width: 150px;
    }

    input {
      @include themeColors {
        color: getThemeValues(textColor);
      }
    }
  }

 .search{

        @include themeColors {
            color: getThemeValues(textColor);
        }
        position:relative;
        .dropdown{
            position:absolute;
            /* px-to-viewport-ignore-next */
            padding: 20px;
            top:150%;
            z-index: 9999;
            @include themeColors {
                background-color: getThemeValues(searchBg);
            }
            left: 50%;
            width: 200%;
            min-width: 220px;
            .title{
                display:flex;
                justify-content: space-between;

                .title-right{
                    cursor: pointer;
                    font-size:11px;
                    font-weight: 200;
                }
            }
            .result{
                margin-top: 10px;
                p{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            ul{
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                padding: 10px;
                justify-content: space-between;
                li:only-child,li:last-child{
                }
            }

            transform: translateX(-50%);
            &::after{
                content: '';
                position: absolute;

                width: 0px;
                height:0px;
                /* px-to-viewport-ignore-next */
                border-left: 10px solid transparent;
                /* px-to-viewport-ignore-next */
                border-right: 10px solid transparent;
                z-index: -1;
                left: 50%;
                /* px-to-viewport-ignore-next */
                top: -8px;
                transform:translateX(-50%);
                @include themeColors {
                    /* px-to-viewport-ignore-next */
                    border-bottom: 10px solid getThemeValues(searchBg);

                }
            }
        }

    }

}

.tab-content {
  @include themeColors {
    color: getThemeValues(textColor);
  }
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    * {
      user-select: none;
    }

    .text-icon {
      display: flex;
      align-items: center;
      gap: 0 2px;
      @media (width<=450px) {
        display: none;
      }
    }

    i:hover {
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


  .right {
    * {
      user-select: none;
    }

    .smallFeature {
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
    padding-right: 30px;

    .exitLogin {
      display: flex;
      align-items: center;
      height: 100%;
      cursor: pointer;

      .avatar {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
        gap: 0 5px;
        @include themeColors {
          color: getThemeValues(textColor)
        }

        img {
          border-radius: 50%;
          /* px-to-viewport-ignore-next */
          width: 40px;
          height: 40px;
          object-fit: cover;
          object-position: center center;
        }
      }
    }
  }
}

</style>

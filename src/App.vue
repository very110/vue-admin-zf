<template>
    <div class="App">
        <router-view v-slot="{ Component }">
            <Transition name="fade" appear>
                <component :is="Component"/>
            </Transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">

import {getTheme,setTheme} from "@/utils/themes.ts";
import {Action, ElMessage, ElMessageBox} from "element-plus";

let theme=getTheme();
setTheme(theme);



const offlineTasks=()=>{
    ElMessage({
        type:"error",
        message:'当前网络异常请检查网络'
    })
}

const  networkRecovery=()=>{
    ElMessageBox.confirm(
        '网络恢复是否重新加载?',
        '通知',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type:"success",
                message:'正在重新加载中'
            })
            location.reload();

        }).catch(()=>{
        return;
    })
}

if (!window.navigator.onLine){
    offlineTasks();
}

window.addEventListener('online',networkRecovery)

window.addEventListener('offline',offlineTasks)

// console.log()
</script>



<style scoped lang="scss">

.fade-enter-active{
   animation:bounce-in .5s linear;
}
//.fade-leave-active{
//    transition: 0s !important;
//}

@keyframes bounce-in {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
        opacity:1;
    }
}


</style>
<style lang="scss">
@import "@/styles/variable";
::-webkit-scrollbar {
    width: 2px;
}

@media (width <= 900px) {
    .phone-W-60{
        width: 60% !important;
    }
}




.el-card__body{
    @include themeColors{
        background-color: getThemeValues(menuAndTabbarBG);
    }

}
.el-card{
    @include customTheme(light){
        border: 1px solid var(--el-card-border-color);
    }
    @include customTheme(dark){
        border: 1px solid #242c51;
        box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.12);
        background-color: initial;
    }
}

.el-form .el-form-item__label{
    @include themeColors{
        color: getThemeValues(textColor);
    }
}
</style>

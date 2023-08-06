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
<style>
::-webkit-scrollbar {
    width: 2px;
}


</style>

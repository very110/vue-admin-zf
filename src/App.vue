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
let theme=getTheme();
setTheme(theme);


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

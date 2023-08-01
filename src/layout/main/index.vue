<template>
    <div>
        <router-view v-slot="{ Component ,route}">
            <Transition name="fade" appear>
                <component :is="!LayOutSettingStore.refsh?Component:''" :key="route.path"/>
            </Transition>
        </router-view>
    </div>
</template>

<script setup lang="ts" name="Main">
import useLayOutSettingStore from "@/store/module/setting.ts";
let LayOutSettingStore = useLayOutSettingStore();
</script>


<style scoped lang="scss">
.fade-enter-active{
  animation:shadow .5s ease-out;
}
.fade-leave-active{
    position: absolute;
    animation:shadow .25s ease-out reverse;
}
@keyframes shadow {
    0%{
      transform:translateX(-20px);
      opacity: 0;
    }
  100%{
    transform:translateX(0px);
    opacity: 1;
  }
}

</style>

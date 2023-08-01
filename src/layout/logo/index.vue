<template>
  <div class="wrapper">

      <svg-icon :name="settings.logo" width="3vw" height="3vw"  class="error"></svg-icon>
      <span class="text" ref="txt" :style="{opacity:show?'0':'1',position:show?'absolute':'initial',transition:show?'.3s':'2s'}">{{settings.title}}</span>
  </div>
</template>

<script setup lang="ts" name="logo">
    import settings from "@/setting.ts";
    import {onMounted, watch} from "vue";
    import {ref} from "vue";
    import useLayOutSettingStore from "@/store/module/setting.ts";
    let txt=ref<HTMLSpanElement>();
    onMounted(()=>{
        if ("style" in txt.value) {
          txt.value.style["-webkit-background-clip"] = 'text';
        }
    })
    let LayOutSettingStore=useLayOutSettingStore()
    let show=ref(LayOutSettingStore.fold);
    watch(LayOutSettingStore,(b)=>{
        if (!b.fold){
            setTimeout(()=>{
                show.value=LayOutSettingStore.fold;
            },500)
        }else{
            show.value=LayOutSettingStore.fold;
        }
    })


</script>


<style scoped lang="scss">

.wrapper{
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
  .text{
    -webkit-background-clip:text;
    position: relative;
    color: transparent;
    background: linear-gradient(to bottom, #fff, #fff), linear-gradient(90deg, #F0FF00,white,#58CFFB);
    background-repeat: no-repeat;
    background-size: 100% 100%, 0 100%;
    background-position:100% 100%,0 100%;
    animation:txt 2s  infinite linear alternate;
  }
}
@keyframes txt {

    100%{
      --my-color1:340deg;
      background-size: 0 100%, 110% 100%;
    }
}

</style>

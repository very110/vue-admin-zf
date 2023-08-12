<template>
  <div class="mask-warp">
    <div class="mask" :style="{width:w+'px',height:w+'px',left:left+'px',top:top+'px'}">
        <el-tooltip
                :visible="true"
                    :effect="effect"
                    :teleported="false"
                    :offset="50">
            <template #content>
                <div class="text" style="width: 200px">
                    <span>{{message}}</span>
                    <div>
                        <el-button type="primary" size="small" round @click="confirmClick">{{mask.maskQueue.length>=1?'下一步':'明白了'}}</el-button>
                        <el-button type="primary" size="small" round @click="clearMaskClick">跳过</el-button></div>
                </div>
            </template>
            <div class="gg"></div>
        </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts" name="Mask">
import {computed, toRefs} from "vue";
import {getTheme, themeColor} from "@/utils/themes.ts";
import {useMaskStore} from "@/store/module/mask.ts";
let effect=getTheme();
let mask=useMaskStore();
const props = withDefaults(defineProps<{
    width:string|number,
    height:string|number,
    left:string|number,
    top:string|number,
    message:string
}>(), {
    width: '0',
    height:'0',
    left:'0',
    top:'0',
    message:'hello world'
})

const emit=defineEmits(['confirm','clearMask'])

const confirmClick=()=>{
    if (mask.maskQueue.length<=0){
        clearMaskClick()
    }else{
        emit('confirm');
    }

}
const clearMaskClick=()=>{
    emit('clearMask');
}

const {width,height,left,top,message}=toRefs(props);
let w=computed(()=>{
    return Math.max(width.value,height.value);
})


</script>


<style scoped lang="scss">

.text{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.mask-warp{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 999;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);

  .mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    outline: 200vmax solid rgba(0,0,0,.5);
    border-radius: 50%;
    transition: .4s linear;

    .gg{
      width: 100%;
      position:absolute;
      left:0%;
      top: 40%;
    }
  }
}

</style>

<style>
.mask-show{
    position:relative;
}
</style>

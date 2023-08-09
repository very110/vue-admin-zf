<template>
        <div>
            <div class="loginRoot">
                <div class="shell">
                    <div class="container a-container" :class="{'is-txl':toggleFlag}" id="a-container">
                        <el-form class="form" label-width="120px">
                            <h2 class="form_title title">创建账号</h2>

                            <div class="form_icons">
                                <el-icon :size="30" :color="themeColor.textColor">
                                    <GoldMedal/>
                                </el-icon>
                                <el-icon :size="30" :color="themeColor.textColor">
                                    <Cpu/>
                                </el-icon>
                                <el-icon :size="30" :color="themeColor.textColor">
                                    <Watch/>
                                </el-icon>

                            </div>
                            <span class="form_span">选择注册方式和电子邮箱注册</span>
                            <div class="el-deep">

                                <el-input v-model="submitFormDataRegin.username"
                                          class="form_input" placeholder="用户名"
                                          clearable>
                                    <template #prefix>
                                        <el-icon :size="20" :color="themeColor.textColor">
                                            <GoldMedal/>
                                        </el-icon>
                                    </template>
                                </el-input>
                                <el-input v-model="submitFormDataRegin.password"
                                          class="form_input" placeholder="密码"
                                          clearable>
                                    <template #prefix>
                                        <el-icon :size="20" :color="themeColor.textColor">
                                            <GoldMedal/>
                                        </el-icon>
                                    </template>
                                </el-input>
                                <el-input v-model="submitFormDataRegin.repeatPassword"
                                          class="form_input" placeholder="再次输入密码"
                                          clearable>
                                    <template #prefix>
                                        <el-icon :size="20" :color="themeColor.textColor">
                                            <GoldMedal/>
                                        </el-icon>
                                    </template>
                                </el-input>
                            </div>
                            <button class="form_button button submit" @click="ElMessage({
                                message: '此功能暂未开放',
                                type: 'warning',
                        })">SIGN UP
                            </button>
                            <!--                    <input type="" class="form_input" placeholder="Name">-->
                            <!--                    <input type="" class="form_input" placeholder="Name">-->

                        </el-form>

                    </div>
                    <div class="container b-container" :class="{'is-txl':toggleFlag,'is-z':toggleFlag}" id="b-container">
                        <!--                <form action=""  id="b-form">-->
                        <el-form class="form" label-width="120px" :rules="rules" :model="submitFormData" ref="loginForms">
                            <h2 class="form_title title">登入账号</h2>
                            <div class="form_icons">
                                <el-icon :size="30" :color="themeColor.textColor">
                                    <GoldMedal/>
                                </el-icon>
                                <el-icon :size="30" :color="themeColor.textColor">
                                    <Cpu/>
                                </el-icon>
                                <el-icon :size="30" :color="themeColor.textColor">
                                    <Watch/>
                                </el-icon>

                            </div>
                            <span class="form_span">选择登录方式和电子邮箱登录</span>
                            <div class="el-deep">
                                <el-form-item prop="username">
                                    <el-input v-model="submitFormData.username"
                                              class="form_input" placeholder="用户名"
                                              clearable>
                                        <template #prefix>
                                            <el-icon :size="20" :color="themeColor.textColor">
                                                <User />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="password">
                                    <el-input v-model="submitFormData.password"
                                              class="form_input" placeholder="密码"
                                              clearable
                                              show-password
                                    >
                                        <template #prefix>
                                            <el-icon :size="20" :color="themeColor.textColor">
                                                <Lock />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>

                            </div>
                            <!--                    <input type="" class="form_input" placeholder="Name">-->
                            <!--                    <input type="" class="form_input" placeholder="Name">-->
                            <a href="javascript:void(0)" class="form_link">忘记密码?</a>
                            <div class="el-deep">
                                <el-button class="form_button button submit" :loading="loading"
                                           @click.prevent="submitForm(loginForms)">SIGN IN
                                </el-button>
                            </div>
                        </el-form>
                    </div>
                    <div class="switch" id="switch-cnt" :class="{'is-gx':toggleFlag,'is-txr':toggleFlag}">
                        <div class="switch_circle" :class="{'is-txr':toggleFlag}"></div>
                        <div class="switch_circle switch_circle-t" :class="{'is-txr':toggleFlag}"></div>
                        <div class="switch_container" id="switch-c1" :class="{'is-hidden':toggleFlag}">
                            <div class="blendingParent">
                                <h2 class="switch_title title blending">Welcome Back！</h2>
                            </div>
                            <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
                            <button class="switch_button button switch-btn" @click="toggleFlag=!toggleFlag">SIGN IN</button>
                        </div>

                        <div class="switch_container" id="switch-c2" :class="{'is-hidden':!toggleFlag}">
                            <div class="blendingParent">
                                <h2 class="switch_title title blending">Hello Friend！</h2>
                            </div>
                            <p class="switch_description description">
                                去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
                            <button class="switch_button button switch-btn" @click.prevent="toggleFlag=!toggleFlag">SIGN UP
                            </button>
                        </div>
                    </div>
                </div>

                <div class="warp-mask" v-if="myMaskFlag">
                    <div class="mask">
                        <el-tooltip :visible="true"
                                    :effect="effect"
                                    placement="left-start"
                                    :offset="10">
                            <template #content>
                                <div class="text"><el-icon :color="themeColor.textColor" size="20">
                                    <Sunny v-if="effect==='light'"/><Moon v-else/></el-icon>
                                    <span>萌新点击此处球体中心也可切换主题模式</span>
                                    <el-button type="primary" size="small" round @click="closeTooltip">知道了</el-button>
                                </div>

                            </template>
                            <div class="gg"></div>
                        </el-tooltip>
                    </div>
                </div>
                <div class="switchTheme" @click="switchTheme(effect)" v-else></div>
            </div>
        </div>
</template>

<script setup lang="ts" name="login">
import {onMounted, reactive, ref} from "vue";
import type {FormInstance, FormRules} from "element-plus"
import {ElMessage, ElNotification} from 'element-plus'
import {themeColor} from "@/utils/themes.ts";
import {useUserStore} from "@/store/module/user.ts";
import {useRoute, useRouter} from "vue-router";
import jsonp from "jsonp";
import {getTheme,setTheme} from '@/utils/themes.ts';
import {useIsNewUser}  from "@/hooks/isNewUser.ts"


let effect=getTheme();
let myMaskFlag=ref(false);

useIsNewUser(myMaskFlag,'login');

let switchLeft=ref( effect==='dark' ? '95%' : '50%');

let $router = useRouter();
let $route = useRoute();

let loading = ref(false);
let toggleFlag = ref(true);
let submitFormData = reactive({
    username: 'admin',
    password: 'atguigu123',
})
let submitFormDataRegin = reactive({
    username: '',
    password: '',
    repeatPassword: '',
})

let loginForms = ref<FormInstance>();

let isLocation = ref(false);

const useStore = useUserStore();

interface coords {
    latitude: number,//经度
    longitude: number//纬度
}

let coords: coords = {
    latitude: 0,
    longitude: 0
}
onMounted(()=>{
    navigator.geolocation.getCurrentPosition((res: any) => {
        coords.latitude = res.coords.latitude;
        coords.longitude = res.coords.longitude;
        isLocation.value = true;
    }, (err) => {
        ElNotification({
            title: 'Success',
            message: '你拒绝了或未开启定位',
            type: 'warning',
            duration: 1500
        })
        isLocation.value = false;
    })
})


let rules: FormRules = {
    username: [
        {required: true, message: '输入账号', trigger: 'blur'},
        {min: 5, max: 15, message: '大于5 小于15', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '输入密码', trigger: 'blur'},
        {min: 6, max: 18, message: '大于6 小于18', trigger: 'blur'},
    ]
};

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    if (loading.value) return;
    await formEl.validate();
    loading.value = true;
    try {
        await useStore.userLogin(submitFormData);
        let redirect = $route.query.redirect;
        console.log()
        let time:string|number=new Date().getHours();
        if (time>18){
            time='晚上好';
        }else if(time>12){
            time='中午好';
        }else{
            time='早上好'
        }
        if (isLocation.value) {

            jsonp(`https://api.map.baidu.com/reverse_geocoding/v3/?ak=${import.meta.env.VITE_BAIDU_API}&output=json&coordtype=wgs84ll&location=${coords.latitude},${coords.longitude}`, {
                timeout: 3000,
            }, (err, data) => {
                if (err) {

                } else {


                    let address = data.result.addressComponent.province + data.result.addressComponent.city;
                    ElNotification({
                        title: 'Success',
                        dangerouslyUseHTMLString: true,
                        message: `<div>欢迎回来 来自${address}的用户</div> ${time}`,
                        type: 'success',
                        duration: 1500

                    })
                }
            });
        } else {
            ElNotification({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: `<div>欢迎回来 亲爱的用户</div> \n${time}`,
                type: 'success',
                duration: 1500
            })
        }
        $router.push({
            path: redirect as string || '/'
        })
        loading.value = false;

    } catch (e: any) {
        loading.value = false;
        ElNotification({
            title: 'Error',
            message: e.message,
            type: 'error',
            duration: 2500
        })
    }
}

const closeTooltip=()=>{
    myMaskFlag.value=false;
}

const switchTheme=(theme:string)=>{
    effect=effect==='dark' ? 'light' : 'dark';
    switchLeft.value=effect==='dark' ? '95%' : '50%';
    setTheme(effect);
}

// 点击切换
</script>


<style scoped lang="scss">
@import "@/styles/variable";

@property --my-color {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
@property --my-color1 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
@property --my-color2 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
@property --my-color3 {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
@property --my-color4 {
  syntax: '<color>';
  inherits: false;
  initial-value: red;
}

.text{
    @include themeColors(){
        color:getThemeValues(textColor)
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.switchTheme{
    position: fixed;
    z-index: 999;
    left:v-bind(switchLeft);
    top: 0;
    width: 10vmax;
    height: 7vmax;
    transform: translateX(-50%);
    cursor: pointer;
}

.warp-mask{
    position: fixed;
    width: 100vw;
    height: 100vh;
}

.mask {
  position: fixed;
  z-index: 999;
  left: v-bind(switchLeft);
  top: 0;
  background-clip: padding-box;
  width: 10vmax;
  height: 9vmax;
    border-radius: 50%;
  box-sizing: initial;
  transform: translateX(-50%);
    outline: 200vmax solid rgba(0,0,0,.5);
    .gg{
        width: 100%;
        position:absolute;
        left:0;
        top: 50%;
    }//处理Tooltip位置
}

.loginRoot {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: --my-color 1.5s, --my-color1 1.5s, --my-color2 1.5s, --my-color3 1.5s, --my-color4 2.5s;

  @include customTheme(dark) {
    --my-color: 100%;
    --my-color1: 97%;
    --my-color2: 96%;
    --my-color3: 94%;
    --my-color4: #435298;
    background-image: radial-gradient(circle at var(--my-color1) 9%, rgba(230, 230, 230, .4) 0.5%, rgba(0, 0, 0, .1) .6%, transparent 0), radial-gradient(circle at var(--my-color2) 3%, rgba(230, 230, 230, .4) 1%, rgba(0, 0, 0, .1) 1.1%, transparent 0), radial-gradient(circle at var(--my-color3) 7%, rgba(230, 230, 230, .4) 0.8%, rgba(0, 0, 0, .1) 0.9%, transparent 0), radial-gradient(circle at var(--my-color) 0%, #fdfdfd 8%, #E6E6E6 10%, var(--my-color4) 12%);;
  }
  @include customTheme(light) {
    --my-color: 50%;
    --my-color1: 50%;
    --my-color2: 50%;
    --my-color3: 50%;
    --my-color4: #44c944;
    background-image: radial-gradient(circle at var(--my-color1) 9%, rgba(230, 230, 230, 0) 0.5%, rgba(0, 0, 0, .1) .6%, transparent 0), radial-gradient(circle at var(--my-color2) 3%, rgba(230, 230, 230, 0) 1%, rgba(0, 0, 0, .1) 1.1%, transparent 0), radial-gradient(circle at var(--my-color3) 7%, rgba(230, 230, 230, 0) 0.8%, rgba(0, 0, 0, .1) 0.9%, transparent 0), radial-gradient(circle at var(--my-color) 0, red 5%, yellow 15%, var(--my-color4) 30%);
  }

}

.loginRoot * {
  user-select: none;
}

/* 设置响应式 */
@media (max-width: 1700px) {
  .shell {
    transform: scale(0.8);
  }
}

@media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}



.shell {
  position: relative;
  overflow: hidden;
  width: 1000px;
  min-width: 1000px;
  height: 600px;
  min-height: 600px;
  padding: 25px;
  transition: .3s;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 20px;
  @include themeColors {
    background-color: getThemeValues(loginBg);
    color: getThemeValues(textColor)
  }
;
  @include customTheme(dark) {
    box-shadow: 10px 10px 10px lighten(#242c51, 30%), -10px -10px 10px lighten(#242c51, 5%);
  }
  @include customTheme(light) {
    background-color: #ecf0f3;
  }
}


.shell * {
  transition: background-color, box-shadow, color .3s;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 100%;
  position: absolute;
  top: 0;
  padding: 25px;
  background-color: inherit;
  transition: 1.25s;
}

.form {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.iconfont {
  margin: 0 5px;
  border: rgba(0, 0, 0, 0.5) 2px solid;
  border-radius: 50%;
  font-size: 25px;
  padding: 3px;
  opacity: 0.5;
  transition: 0.1s;
}

.iconfont:hover {
  cursor: pointer;
  opacity: 1;
  transition: .15s;
}


.el-deep {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  &:deep(.form_input) {

    width: 350px;
    height: 40px;
    outline: none;
    border: none;
    padding-left: 15px;
    font-size: 13px;
    letter-spacing: 0.15px;
    margin: 4px 0;
    background-color: inherit;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    @include customTheme(dark) {
      box-shadow: inset 2px 2px 4px lighten(#242c51, 30%), inset -2px -2px 4px lighten(#242c51, 5%);
    }

    .el-input__wrapper {
      background-color: inherit;
      box-shadow: none;
      padding: 0;

      .el-input__inner {
        color: inherit;
        font-weight: 600;
        height: 100%;
        padding-left: 15px;
        font-size:16px;
        &:focus {
          box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
          @include customTheme(dark) {
            box-shadow: inset 4px 4px 4px lighten(#242c51, 40%), inset -4px -4px 4px lighten(#242c51, 15%) !important;
          }
        }
      }

      .el-input__suffix-inner {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }

    }

  }

}


.form_span {
  margin: 30px 0 12px;
}

.form_link {
  color: inherit;
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 30px;
  text-decoration: none;
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: inherit;
  letter-spacing: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 50px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  border: none;
  cursor: pointer;
  outline: none;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -11px 16px #f9f9f9;
  @include customTheme(dark) {
    box-shadow: 8px 8px 16px lighten(#242c51, 20%), -8px -11px 16px lighten(#242c51, 5%);
  }
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  z-index: 0;
  left: calc(100% - 600px);
}

.switch {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100%;
  padding: 50px;
  z-index: 200;
  background-color: inherit;
  overflow: hidden;
  transition: 1.25s;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
  @include customTheme(dark) {
    box-shadow: 4px 4px 10px lighten(#242c51, 30%), -4px -4px 10px lighten(#242c51, 5%);
  }
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: inherit;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  @include customTheme(dark) {
    box-shadow: inset 8px 8px 12px lighten(#242c51, 30%), inset -8px -8px 12px lighten(#242c51, 5%);
  }
  bottom: -60%;
  left: -60%;
  transition: box-shadow .5s, left 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch-btn {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  @include customTheme(dark) {
    box-shadow: 6px 6px 10px lighten(#242c51, 30%), -6px -6px 10px lighten(#242c51, 5%);
  }
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  @include customTheme(dark) {
    box-shadow: 2px 2px 6px lighten(#242c51, 30%), -2px -2px 6px lighten(#242c51, 5%);
  }
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
}

.is-txl {
  left: 0;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {

  opacity: 0;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

.form_icons {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0 20px;
}

.blendingParent {
  filter: contrast(200%);

  .blending {
    letter-spacing: -18px;
    filter: blur(5px);
    animation: blending 2s infinite ease-out alternate;
    transform: scale(0.6);

  }
}

@keyframes blending {


  100% {
    letter-spacing: 0px;
    filter: blur(0px);
    transform: scale(1);

  }
}

@keyframes is-gx {

  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>

<template>
<div class="container">
    <div class="wrapper">
          <div class="wrapper-pc">
              <div class="pc-camera"></div>
              <div class="pc">
                  <div class="pc-bg">
                      <div class="pc-bg-top">
                          <span>GAME OVER</span>
                          <!--                    <SvgIcon prefix></SvgIcon>-->
                          <svg-icon name="menu" width="2vw" height="2vw"></svg-icon>
                      </div>
                      <div class="pc-bg-bottom">
                          <div class="bb">
                              <div class="b">
                                  <div class="size">
                                      <span>4</span>
                                      <svg-icon name="skeleton" width="7vw" height="7vw"  class="error"></svg-icon>
                                      <span>4</span>
                                  </div>
                                  <div class="text">
                                      您访问的页面找不到了 请点击按钮返回首页
                                  </div>
                              </div>
                          </div>
                          <el-button color="#253243"  round size="large" class="button" @click="$router.push({path:'/'})">回到首页</el-button>
                      </div>
                  </div>
              </div>
              <div class="pc-mask"></div>
          </div>
        <div class="theBase">
        </div>
        <div class="whiteBase">
            <div class="baseTop">
                    <div class="mouth"></div>
            </div>
            <div class="baseBottom">
                <div class="halfLeft"></div>
                <div class="halfCenter"></div>
                <div class="halfRight"></div>
            </div>
            <div class="whiteBase shadow" style="width: 100%;">

                <div class="baseBottom">
                    <div class="halfLeft"></div>
                    <div class="halfRight"></div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script setup lang="ts" name="404">
import {useRoute, useRouter} from "vue-router";

  let $router = useRouter();

  console.log(useRoute().meta.hidden)
</script>


<style scoped lang="scss">

.container {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
       position: relative;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        width: 85vw;
        height: 90vh;
      .wrapper-pc{
          position: relative;
        .pc-camera{
          position: absolute;
          width: 14px;
          height: 1vw;
            min-width:8px;
            min-height:8px;
          left: 50%;
          top: 5px;
          transform:translateX(-50%) ;
          background-color: #404344;
          box-shadow: inset 1px 0 1px 1px #000,inset -1px 0 1px 1px rgba(255,255,255,.5);
          z-index: 999;
          border-radius: 50%;
          &:after{
            position:absolute;
            content: "";
            inset: 5px;
            background-color: white;
            border-radius: 50%;
            opacity: .1;
            filter: blur(1px);
          }
        }
        .pc{
          position: relative;
          z-index: 10;
          width: 800px;
          height: 500px;
          border: 20px solid #010001;
          border-top-width:25px;
          border-bottom-width:25px;
          border-top-left-radius:20px;
          border-top-right-radius:20px;
          border-bottom-right-radius:20px;
          border-bottom-left-radius:20px;
          overflow: hidden;
          color:#253144;
          box-shadow:0 0 1px 1px #000;

        }
        .pc-mask{
          position: absolute;
          left: 60%;
          top: 0;
          width: 50%;
          height: 500px;
          z-index: 19;
          transform-origin:left top;
          background-image: linear-gradient(to right top,transparent,rgba(255,255,255,1));
          transform: rotate(-49deg);
            mask-image: linear-gradient(to right top,transparent 10%,#fff 2%, #fff 70%,transparent);
          &:after{
            position:absolute;
            content: '';
              width: 78%;
              height: 100%;
              left:0;
              top: 0px;
            transform-origin:left top;
            transform: rotate(49deg) translateY(2px) translateX(2px);
              border: 1px solid rgba(255,255,255,.4);
                border-radius: 20px;
              border-top-left-radius:0 ;
              border-left:none ;
              border-right-color:rgba(255,255,255,.2) ;
              border-bottom:none ;
              box-shadow: inset 0 0 2px white;
          }
          }
      }


    }
}
.theBase{
  width: 800px;
  height: 30px;min-height: 30px;
  background-color: #444C4FFF;
  position: relative;
  top: -15px;
  z-index: 1;
    border-radius: 0 0 5px 5px;
    &:before{
        content:'';
        position: absolute;
        width: 80%;
        height: 12px;
        bottom:0;
        left:50%;
        transform:translateX(-50%);
        background-color:#444c4f;
        box-shadow: inset 2px 2px 2px  black,inset -2px -2px 2px  black;
        border-radius: 10px;
    }
}
.whiteBase{
    position: relative;
    top: -15px;
    width: 90%;
    height: 100px;
    .baseTop{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 18px;
        background-color:#eff1f3;
        border-radius: 2px;
        .mouth{
            position: absolute;
            left: 50%;
            top: 0px;
            transform: translateX(-50%);
            width:130px;
            height: 12px;
            background-color: #e4e4e5;
            border-radius:0px 0px 20px 20px;
            box-shadow: inset 5px 3px 3px rgba(0,0,0,.4),inset -3px -3px 3px rgba(0,0,0,.4);
        }
        &:after,&:before{
            position: absolute;
            content: '';
            width: 50px;
            height: 100%;
            color:transparent;
            background-image: linear-gradient(to right,rgba(140, 140, 140,1) 5%,white 20%,rgba(140, 140, 140,1) 50%,rgba(140, 140, 140,.2) 80%, transparent 100%);
        }

        &:before{
            top: 0;
            left: 0;
        }
        &:after{
            right: 0;
            top: 0;
            transform: rotate(-180deg);
        }
    }
    .baseBottom{
        position: relative;
        width: 100%;
        height:18px;

        &:after{
            all:inherit;
            position:absolute;
            content:'';
            top: 50%;

        }


        .halfLeft,.halfRight{
            position: absolute;
            width: 50%;
            height:16px;
            transform-origin: left top;
            border-radius:0 0 13px 13px;
            background-image: linear-gradient(to bottom, darken(#eff1f3,30%) 50%,#6e7273 80%, #000);
        }
        .halfLeft{
            left: 0;
            transform: skewX(45deg);
        }
        .halfRight{
            right: 0;
            transform: skewX(-45deg);
        }
    }
}

.shadow{
    border-radius: 10px;
    position: absolute;
    top: 0;
    left:0px;
    transform: rotate(-180deg) translateY(50%) ;
    color: transparent;
    filter:contrast(5);
    opacity: .6;
    mask-image: linear-gradient(to top,#000 80%,transparent);
    .halfLeft,.halfRight{
        background-image: linear-gradient(to bottom, #000 50%,#000 80%, #000) !important;
    }
}

.error{
  margin: 10px;
  position: relative;
}
.error:after{
  position: absolute;
  content: "";
  opacity: 0;
  //color: ;
  background-image: linear-gradient(45deg, transparent, transparent 50%, red 50%,black 61%, transparent 0), linear-gradient(135deg, transparent, transparent 36%, red 38%, black 51%, transparent 0);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: fade .5s infinite alternate;
  filter:drop-shadow(0 0 2px red);
}

@keyframes fade{
    100%{
      opacity: 1;
    }
}
.pc-bg{
  font-family: STCaiyun,serif;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color:#f8e71e;
    outline: 30px solid #1a001a;
    border-radius: 10px;
    padding: 10px;
    &-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 30px;
        font-weight: 900;
    }

    &-bottom{
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      flex-direction:column;
      gap: 20px 0;
      .button{
        font-family: STCaiyun,serif;

        width: 180px;
      }
        .bb{
            width: 50%;
            height: 55%;
            background-color:#fafdff;
            box-shadow: 0 0 2px #000000;
            padding: 7px;
            .b{
                width: 100%;
                height: 100%;
                border: 5px solid #121f29;
                display: flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                .size{
                  color:#253544;
                    width: 100%;
                    display: flex;
                    font-size:8vw;
                    justify-content: center;
                    align-items: center;


                }
                .text{
                    margin:10px;
                }
            }
        }
    }

}

</style>

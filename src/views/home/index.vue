<template>
  <div >
      <div class="header">
          <el-card class="left-userInfo" :body-style="{height:'100%'}">
              <div class="userInfo">
                  <div class="left-userName">
                      <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.RR6081d7yzmAye6o8mNUggAAAA?w=200&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7">
                      <div class="text"><span>姓名:admin</span><span>简介:见过css,听说过js</span></div>
                  </div>
                  <div class="right-userName">
                      <div>github地址: <a href="https://github.com/very110" target="_blank" class="bgUnderline">https://github.com/very110</a></div>
                      <div>gitee地址: <a href="https://gitee.com/zhao-feng-zhang" target="_blank" class="bgUnderline">https://gitee.com/zhao-feng-zhang</a></div>
                  </div>
              </div>
          </el-card>
          <el-card :body-style="{height:'100%'}">
                <div class="ggc"><svg-icon name="love" width="5vw" height="3vw"></svg-icon><span>关注人数</span></div>
              <el-divider />
              <div class="ggc2">99999999</div>
          </el-card><el-card :body-style="{height:'100%'}">
                <div class="ggc"><svg-icon name="collcet" width="5vw" height="3vw"></svg-icon><span>收藏人数</span></div>
              <el-divider />
              <div class="ggc2">99999999</div>
          </el-card><el-card :body-style="{height:'100%'}">
                <div class="ggc"><svg-icon name="views" width="5vw" height="3vw"></svg-icon><span>访问人数</span></div>
              <el-divider />
              <div class="ggc2">99999999</div>
          </el-card>
          <el-card :body-style="{height:'100%'}">
              <div class="ggc">
                  <svg-icon name="message" width="5vw" height="3vw"></svg-icon>
                  <span>系统消息</span></div>
              <el-divider/>
              <div class="ggc2">99999999</div>
          </el-card>
      </div>

      <div class="home">
          <el-card  class="my-card">
              <div class="map">
                  <div id="container" ref="chartsDOM">
                  </div>
                  <div class="refresh" ref="refresh" @click="CoordsStore.getCoords(initMap)">
                      <svg-icon name="refresh" width="2vw" height="2vw"></svg-icon>
                  </div>
              </div>
          </el-card>
          <el-card class="my-card" >
              <div id="pieChart" ref="pieChart" v-resize="handlers"></div>
          </el-card>
          <el-card class="my-card">
              <div id="LineChart" ref="LineChart" v-resize="handlers1"></div>
          </el-card>
          <el-card class="my-card">
              <div id="histogram" ref="histogram" v-resize="handlers2"></div>
          </el-card>
      </div>

  </div>
</template>

<script setup lang="ts" name="home">
import {reqGetXiaMen} from "@/api/mapGetLocation/xiamenMap.ts";
import * as echarts from "echarts"
import {onMounted, ref} from "vue";
import {useCoordsStore} from "@/store/module/coords.ts";


let data=reqGetXiaMen();
let chartsDOM=ref();
let pieChart=ref();
let LineChart=ref();
let histogram=ref();
let local=null;
let CoordsStore=useCoordsStore();
let refresh=ref();

onMounted(()=> {
    initMap(CoordsStore.latitude,CoordsStore.longitude,CoordsStore.formatted_address);
    if (!CoordsStore.formatted_address){
        CoordsStore.getCoords(initMap);
    }
    initChart();
    initLineChart();
    initHistogram();
})

const handlers=()=>{
    var myChart = echarts.init(pieChart.value);
    myChart.resize();
}
const handlers1=()=>{
    var myChart = echarts.init(LineChart.value);
    myChart.resize();
}
const handlers2=()=>{
    var myChart = echarts.init(histogram.value);
    myChart.resize();
}


const initMap=(latitude,longitude,formatted_address)=>{
    let map = new BMap.Map("container");
    function ZoomControl(){
        // 设置默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new BMap.Size(10, 10);
    }
// 通过JavaScript的prototype属性继承于BMap.Control
    ZoomControl.prototype = new BMap.Control();
    ZoomControl.prototype.initialize = function(map) {
        refresh.value.style.opacity='1';
        map.getContainer().appendChild(refresh.value);
        return refresh.value;
    }

        var myZoomCtrl = new ZoomControl();
        // 创建Map实例
    map.addControl(myZoomCtrl);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.GeolocationControl());
    map.centerAndZoom(new BMap.Point(longitude||116.404,latitude||39.915),8);  //初始化时，即可设置中心点和地图缩放级别。
    map.enableScrollWheelZoom(true);
    map.disableDragging();     //禁止拖拽
    setTimeout(function(){
        map.enableDragging();   //两秒后开启拖拽
        //map.enableInertialDragging();   //两秒后开启惯性拖拽
    }, 1000);
     local = new BMap.LocalSearch(map, {
        renderOptions:{map: map}
    });
}

const initChart=()=>{
    var myChart = echarts.init(pieChart.value);
    var option;

    option = {
        title: {
            subtext: '用户分布',
            left: 'center',
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                color: '#B0CEFC'  // 图例文字颜色
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '福建' },
                    { value: 735, name: '上海' },
                    { value: 580, name: '广东' },
                    { value: 484, name: '北京' },
                    { value: 444, name: '深圳' },

                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    option && myChart.setOption(option);

}

const initLineChart=()=>{
    var myChart = echarts.init(LineChart.value);
    var option;
    option = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['北京', '上海', '广东', '深圳', '福建'],
            textStyle: {
                color: '#B0CEFC'  // 图例文字颜色
            }
        },
        toolbox: {
            feature: {

            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '北京',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '上海',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '广东',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '深圳',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '福建',
                type: 'line',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    option && myChart.setOption(option);

}

const initHistogram=()=>{
    var myChart = echarts.init(histogram.value);
    var option;
    option = {
        title: [
            {
                text: '极坐标分布'
            }
        ],
        polar: {
            radius: [30, '80%']
        },
        angleAxis: {
            max: 4,
            startAngle: 75
        },
        radiusAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd']
        },
        tooltip: {},
        series: {
            type: 'bar',
            data: [2, 1.2, 2.4, 3.6],
            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle',
                formatter: '{b}: {c}'
            }
        }
    };

    option && myChart.setOption(option);

}

</script>


<style scoped lang="scss">
@import "@/styles/variable";
.my-card{
  width: fit-content;
  height: fit-content;
}
.bgUnderline{
    line-height: 1.5;
    background-image: linear-gradient(to right,red,yellow,blue);
    background-size: 0% 3px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: .3s linear;
}
.bgUnderline:hover{
    background-size: 100% 3px;
}
.refresh{
  width: fit-content;
  cursor:pointer;
  opacity: 0;

}
.home{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
}
#container,#pieChart,#LineChart,#histogram{
  width: 450px;
  height: 400px;
  resize: horizontal;
  overflow: scroll !important;
  min-width: 250px;

    &::-webkit-scrollbar{
        /* px-to-viewport-ignore-next */
        width: 20px;
        height: 20px;
    }

    &::-webkit-resizer{
        @include themeColors{
            background-color:getThemeValues(menuAndTabbarBG)
        }
        background-image:url("/drop.svg");
        background-blend-mode:hard-light;
        background-size:100% 100%;
        background-repeat: no-repeat;

    }
}



.header{
    display: grid;
    //grid-template-areas:
    //"l r1 r2 r3"
    //"l r4 r5 r6";
    grid-auto-rows:160px;
    grid-template-columns:repeat(4,1fr) ;
    grid-template-rows:repeat(2,160px) ;
    gap: 20px;

  .left-userInfo{
      //grid-area: l;
      grid-row: 1 / 3;
      grid-column: 1 / 3;
    height: 100%;

    .userInfo{
        display: flex;
      height: 100%;
      .left-userName{
          position: relative;
        width: 50%;
          height: 100%;
          display: flex;
            flex-direction: column;
          justify-content: center;
          gap: 10px;
          &::before{
              content: '';
              position: absolute;
              right: 10%;
              top: 10%;
              width: 2px;
              height: 80%;
              @include themeColors{
                  background-color: getThemeValues(borderColor);
              }

          }
          img{
              /* px-to-viewport-ignore-next */
              width: 10vw;
              height: 10vw;
              border-radius: 50%;
          }
          .text{
              font-size: 12px;
              font-weight: 100;
              width: 50%;
              display: flex;
              justify-content: center;
              flex-direction: column;
              gap: 10px;
              margin-top: 20px;
                @include themeColors{
                    color: getThemeValues(textColor);
                }
          }
      }
        .right-userName{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction:column;
            gap: 10px;
            justify-content: space-around;

            @include themeColors{
                color: getThemeValues(textColor);
            }
            a{
                word-break: break-all;
                @include themeColors{
                color: getThemeValues(textColor);
            }

            }
        }
    }
  }

    .ggc{
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include themeColors{
            color: getThemeValues(textColor);
        }
    }
    .ggc2{
        display: flex;
        font-size:24px;
        justify-content: center;
        align-items: center;
        @include themeColors{
            color: getThemeValues(textColor);
        }
    }
}

@media (width<500px) {
    .header{
        grid-template-columns:repeat(2,1fr);
        grid-auto-rows: 400px;
    }

}
</style>

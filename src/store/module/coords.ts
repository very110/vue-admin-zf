import {defineStore} from "pinia"
import {ElNotification} from "element-plus";
import jsonp from "jsonp";

export const useCoordsStore = defineStore('Coords', {
    state: () => {
        return {
            latitude:null,
            longitude:null,
            formatted_address:null
        }
    },
    actions: {
        getCoords(initMap:any){
            navigator.geolocation.getCurrentPosition((res: any) => {
                this.latitude = res.coords.latitude;
                this.longitude = res.coords.longitude;

                jsonp(`https://api.map.baidu.com/reverse_geocoding/v3/?ak=${import.meta.env.VITE_BAIDU_API}&output=json&coordtype=wgs84ll&location=${res.coords.latitude},${res.coords.longitude}`, {
                    timeout: 1000,
                }, (err, data) => {
                    if (err) {
                        initMap()
                    } else {
                        this.formatted_address=data.result.formatted_address;
                        initMap(this.latitude,this.longitude,this.formatted_address)
                    }
                })
            },
                (err) => {
                    initMap()
                ElNotification({
                    title: 'Success',
                    message: '你拒绝了或未开启定位,默认定位北京',
                    type: 'warning',
                    duration: 1500
                })
            })
        }
    },
    getters: {}
})


import axios from "axios";

export const reqGetXiaMen=()=>axios.get('https://geo.datav.aliyun.com/areas_v3/bound/350000_full.json');


import { createApp } from "vue";
import App from "./App.vue";
import '@/styles/index.scss';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
import router from "@/router";
import store from "@/store/index.ts"
import '@/router/permisstion.ts'
const app = createApp(App);
app.use(store)
app.use(ElementPlus, {
  locale: zhCn,
});
import gloablComponent from './components/index';
app.use(gloablComponent);
app.use(router);
import {directiveResize} from "@/directive/resize.ts";
import {directiveFocus} from "@/directive/focus.ts";
directiveResize(app);
directiveFocus(app);
app.mount("#app");


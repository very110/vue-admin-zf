import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';
import FormPlus from "./el/FormPlus/src/index.vue";
import TablePlus from "./el/TablePlus/src/TablePlus.vue";
import Category from "./Category/index.vue"
import Mask from "./mask/index.vue";
const components: { [name: string]: Component } = { SvgIcon,FormPlus,TablePlus,Category,Mask};
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })


        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}

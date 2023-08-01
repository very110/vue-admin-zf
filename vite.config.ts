import { defineConfig, loadEnv } from "vite";
import type{ConfigEnv} from "vite";
import pxtovw from 'postcss-px-to-viewport-8-plugin';
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import vue from "@vitejs/plugin-vue";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import {viteMockServe} from "vite-plugin-mock";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import postcssPresetEnv from "postcss-preset-env"
// https://vitejs.dev/config/

const loder_pxtovw = pxtovw({
  viewportWidth: 1280,
  viewportUnit: 'vw',
  propList: ['*','!height','!font','!grid-template-rows','!min-width'],
  exclude:[/src\/views\/login/i,/node_modules/i],
})
export default defineConfig(({ command, mode }:ConfigEnv) => {
  console.log(`现在是${command}模式`);
  const env = loadEnv(mode, process.cwd());


  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: process.env.NODE_ENV === "development",
      }),
      VueSetupExtend(),
      createHtmlPlugin({
        inject: {
          data: {
            logo: env.VITE_APP_LOGO,
            title:env.VITE_APP_TITLE,
          },
        },
      }),

    ],
    css:{
      postcss: {
        plugins: [postcssPresetEnv({

        }),loder_pxtovw]
      },
      preprocessorOptions:{
        devSourcemap:true,
        scss:{
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        }
      }
    }
  };
})

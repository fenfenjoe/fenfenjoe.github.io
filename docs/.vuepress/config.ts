
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { sidebar } from './sidebar'
import { navs } from './nav'
//import { pluginBackToTop } from '@vuepress/plugin-back-to-top'
//import { lastUpdated } from '@vuepress/last-updated'
//import { pluginMediumZoom } from '@vuepress/plugin-medium-zoom'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance"
import { componentsPlugin } from "vuepress-plugin-components"

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        lastUpdated: true, //文章添加最近更新时间
        logo: '/images/favicon.ico', //导航栏logo
        navbar: navs,
        sidebar: sidebar
    }),
    title: '粉粉蕉的笔记本',
    description: 'Just playing around',
    //base: '/note/',  //基础路径
    head: [
      ['link',{rel: 'icon', href: '/images/favicon.ico'}]  //网站图标
    ],
    plugins:[
        mdEnhancePlugin({
            katex: true,  //数学公式
            echarts: true,  //各种统计图
            figure: true, //图片显示标题
            mermaid: true, //各种流程图
            alert: true, //GFM提示功能
            gfm: true, //github flavored Markdown
            hint: true,
        }), //markdown功能增强插件
        componentsPlugin({
            components:[
                "BiliBili",
            ]
        })
    ]
})
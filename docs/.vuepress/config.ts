
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
import { searchPlugin } from '@vuepress/plugin-search'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'


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
      ['link',{rel: 'icon', href: '/images/favicon.ico'}],  //网站图标
      ['link',{rel: 'stylesheet', href: '/css/index.css'}]  //自定义的样式
    ],
    plugins:[
        mdEnhancePlugin({
            //katex: true,  //数学公式
            echarts: true,  //各种统计图
            //figure: true, //图片显示标题
            mermaid: true, //各种流程图
            //alert: true, //GFM提示功能
            //gfm: true, //github flavored Markdown
            //hint: true,
        }), //markdown功能增强插件
        componentsPlugin({
            components:[
                "BiliBili",
            ]
        }),
        searchPlugin({}), //搜索引擎插件，会生成本地索引文件，若网站文章过多，建议切换成docSearch插件
        markdownMathPlugin({}), //数学公式
        markdownExtPlugin({}), //脚注、GFM等组件
        markdownHintPlugin({
              hint: true,// 启用提示容器，默认启用
              alert: true,// 启用 GFM 警告
            }),
        markdownImagePlugin({
              // 启用 figure
              figure: true,
              // 启用图片懒加载
              lazyload: true,
              // 启用图片标记
              mark: true,
              // 启用图片大小
              size: true,
            }),
    ]
})
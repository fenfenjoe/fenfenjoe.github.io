
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { sidebar } from './sidebar'
import { navs } from './nav'
//import { pluginBackToTop } from '@vuepress/plugin-back-to-top'
//import { lastUpdated } from '@vuepress/last-updated'
//import { pluginMediumZoom } from '@vuepress/plugin-medium-zoom'
//import { mdEnhancePlugin } from "vuepress-plugin-md-enhance"
import { searchPlugin } from '@vuepress/plugin-search'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
//import { commentPlugin } from '@vuepress/plugin-comment'
// Waline评论直接在 Layout.vue 中集成，不再使用 vuepress-plugin-comment-plus（不支持VuePress 2）

export default defineUserConfig({
    bundler: viteBundler(),
    layouts: {
        '/': './layouts/Layout.vue',
    },
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
      ['link',{rel: 'stylesheet', href: '/css/index.css'}],  //自定义的样式
      // Waline 评论系统（使用本地 UMD 文件）
      ['link', {rel: 'stylesheet', href: '/waline.css'}],
      ['script', {}, `
        (function() {
          // 主页不显示评论框，其他页面都显示
          var path = location.pathname || '/';
          if (path === '/' || path === '/index.html') return;

          // 动态加载 waline.umd.js，加载完毕后初始化
          var script = document.createElement('script');
          script.src = '/waline.umd.js';
          script.onload = function() {
            // UMD 在浏览器中会把自身挂到 window.Waline
            var W = window.Waline;
            if (!W || !W.init) {
              console.error('[Waline] window.Waline not found after script load');
              return;
            }
            var el = document.getElementById('waline-container');
            if (!el) {
              el = document.createElement('div');
              el.id = 'waline-container';
              el.style.cssText = 'max-width:800px;margin:2rem auto;padding:0 1rem;';
              document.body.appendChild(el);
            }
            W.init({
              el: '#waline-container',
              serverURL: 'https://azilnote-vercel.vercel.app/',
            });
          };
          script.onerror = function() {
            console.error('[Waline] failed to load /waline.umd.js');
          };
          document.head.appendChild(script);
        })();
      `],
    ],
    plugins:[
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
        markdownChartPlugin({
              // 启用 Echarts
              echarts: true,
            }),

    ]
})
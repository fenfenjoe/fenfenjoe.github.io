<template>
  <ParentLayout>
    <template #page-bottom>
      <div id="waline-container" />
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 保存 Waline 实例，用于销毁和重建
let walineInstance: { destroy: () => void } | null = null

function isHomePage(path: string): boolean {
  return path === '/' || path === '/index.html'
}

async function initWaline(path: string) {
  // 主页不显示评论框
  if (isHomePage(path)) {
    if (walineInstance) {
      walineInstance.destroy()
      walineInstance = null
    }
    return
  }

  // 等待 DOM 更新，确保 #waline-container 已挂载
  await new Promise<void>(resolve => setTimeout(resolve, 0))

  const el = document.getElementById('waline-container')
  if (!el) return

  // 销毁旧实例（SPA 路由切换时）
  if (walineInstance) {
    walineInstance.destroy()
    walineInstance = null
  }

  // 加载 Waline 脚本（若已加载则直接使用 window.Waline）
  const W = (window as any).Waline
  if (!W || !W.init) {
    // 脚本尚未加载，动态加载后再初始化
    await new Promise<void>((resolve, reject) => {
      if (document.querySelector('script[src="/waline.umd.js"]')) {
        // 已插入但还在加载中，轮询等待
        const timer = setInterval(() => {
          if ((window as any).Waline?.init) {
            clearInterval(timer)
            resolve()
          }
        }, 50)
        return
      }
      const script = document.createElement('script')
      script.src = '/waline.umd.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('[Waline] failed to load /waline.umd.js'))
      document.head.appendChild(script)
    })
  }

  const Waline = (window as any).Waline
  if (!Waline?.init) {
    console.error('[Waline] window.Waline not found')
    return
  }

  walineInstance = Waline.init({
    el: '#waline-container',
    serverURL: 'https://azilnote-vercel.vercel.app/',
  })
}

onMounted(() => {
  initWaline(route.path)
})

// SPA 路由切换时重新初始化
watch(() => route.path, (newPath) => {
  initWaline(newPath)
})

onUnmounted(() => {
  if (walineInstance) {
    walineInstance.destroy()
    walineInstance = null
  }
})
</script>

<style>
/* Waline 评论容器样式 - 与 [vp-content] 保持一致，自动跟随侧边栏偏移 */

#waline-container {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 2.5rem 2rem;
  box-sizing: border-box;
}

/* 移动端优化 */
@media (max-width: 719px) {
  #waline-container {
    padding: 0 1.5rem 2rem;
  }
}
</style>

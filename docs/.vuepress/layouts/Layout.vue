<template>
  <ParentLayout>
    <template #page-bottom>
      <div id="waline-container" />
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import { useRoutePath } from 'vuepress/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'

const routePath = useRoutePath()

function initWaline() {
  const path = routePath.value || '/'
  console.log('[Waline] initWaline called, path:', path)
  
  if (path === '/' || path === '/index.html') {
    console.log('[Waline] skipping home page')
    return
  }

  nextTick(() => {
    const container = document.getElementById('waline-container')
    console.log('[Waline] container found:', !!container)
    
    if (!container) {
      console.error('[Waline] container not found')
      return
    }

    const W = (window as any).Waline
    if (W && W.init) {
      console.log('[Waline] Waline already loaded, initializing')
      W.init({
        el: '#waline-container',
        serverURL: 'https://azilnote-vercel.vercel.app/',
      })
      return
    }

    const existingScript = document.querySelector('script[src="/waline.umd.js"]')
    if (existingScript) {
      console.log('[Waline] script already exists, waiting for load')
      existingScript.addEventListener('load', function() {
        const W2 = (window as any).Waline
        if (W2 && W2.init) {
          W2.init({
            el: '#waline-container',
            serverURL: 'https://azilnote-vercel.vercel.app/',
          })
        }
      })
      return
    }

    console.log('[Waline] creating script element')
    const script = document.createElement('script')
    script.src = '/waline.umd.js'
    script.onload = function() {
      console.log('[Waline] script loaded')
      const W3 = (window as any).Waline
      if (W3 && W3.init) {
        W3.init({
          el: '#waline-container',
          serverURL: 'https://azilnote-vercel.vercel.app/',
        })
      }
    }
    script.onerror = function() {
      console.error('[Waline] failed to load /waline.umd.js')
    }
    document.head.appendChild(script)
  })
}

onMounted(() => {
  console.log('[Waline] onMounted called')
  initWaline()
})

watch(
  routePath,
  (newPath) => {
    console.log('[Waline] route changed:', newPath)
    initWaline()
  }
)
</script>

<style>
#waline-container {
  max-width: var(--content-width);
  margin: 2rem auto;
  padding: 0 2.5rem;
  box-sizing: border-box;
}

@media (max-width: 959px) {
  #waline-container {
    padding: 0 2rem;
  }
}

@media (max-width: 719px) {
  #waline-container {
    padding: 0 1.5rem;
  }
}
</style>

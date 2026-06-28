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
import { init } from '@waline/client'
import '@waline/client/style'

const routePath = useRoutePath()

function initWaline() {
  const path = routePath.value || '/'
  
  if (path === '/' || path === '/index.html') {
    return
  }

  nextTick(() => {
    const container = document.getElementById('waline-container')
    if (!container) return

    init({
      el: '#waline-container',
      serverURL: 'https://azilnote-vercel.vercel.app/',
    })
  })
}

onMounted(() => initWaline())

watch(
  routePath,
  () => initWaline()
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

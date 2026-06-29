<template>
  <ParentLayout>
    <template #page-bottom>
      <div ref="walineRef" class="waline-container" />
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, shallowRef } from 'vue'
import { useRoute } from 'vuepress/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { init } from '@waline/client'
import '@waline/client/style'

const route = useRoute()
const walineRef = shallowRef<HTMLElement>()
const walineInstance = shallowRef(null)

function initWaline() {
  const path = route.path || '/'
  
  if (path === '/' || path === '/index.html') {
    if (walineInstance.value) {
      walineInstance.value.destroy()
      walineInstance.value = null
    }
    return
  }

  setTimeout(() => {
    if (!walineRef.value) return

    if (!walineInstance.value) {
      walineRef.value.innerHTML = ''
      walineInstance.value = init({
        el: walineRef.value,
        serverURL: 'https://azilnote-vercel.vercel.app/',
      })
    } else {
      walineInstance.value.update({
        path: path,
      })
    }
  }, 300)
}

onMounted(() => initWaline())

onBeforeUnmount(() => {
  if (walineInstance.value) {
    walineInstance.value.destroy()
    walineInstance.value = null
  }
})

watch(
  () => route.path,
  () => {
    console.log('route path changed:', route.path)
    initWaline()
  }
)
</script>

<style>
.waline-container {
  max-width: var(--content-width);
  margin: 2rem auto;
  padding: 0 2.5rem;
  box-sizing: border-box;
}

@media (max-width: 959px) {
  .waline-container {
    padding: 0 2rem;
  }
}

@media (max-width: 719px) {
  .waline-container {
    padding: 0 1.5rem;
  }
}
</style>

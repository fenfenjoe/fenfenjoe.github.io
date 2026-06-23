<template>
  <ParentLayout>
    <template #page-bottom>
      <div id="waline-container" />
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
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

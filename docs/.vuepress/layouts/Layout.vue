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
/* Waline 评论容器样式 - 自适应侧边栏 */

#waline-container {
  width: 100%;
  margin: 2rem 0;
  padding: 0 2.5rem;
  box-sizing: border-box;
}

/* 移动端优化 */
@media (max-width: 719px) {
  #waline-container {
    padding: 0 1.5rem;
  }
}
</style>

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
  padding: 0;
  box-sizing: border-box;
}

/* 确保评论容器内部的 Waline 组件也能正确自适应 */
#waline-container > div {
  width: 100%;
}
</style>

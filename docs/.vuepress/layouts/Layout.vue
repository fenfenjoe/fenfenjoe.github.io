<template>
  <ParentLayout>
    <template #page-bottom>
      <div id="valine-vuepress-comment" />
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<style scoped>
.theme-container {
  min-height: 100vh;
}
#valine-vuepress-comment {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>

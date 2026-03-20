<template>
  <div class="theme-container">
    <DefaultTheme.Layout />
    <div id="valine-vuepress-comment" />
  </div>
</template>

<script setup lang="ts">
import DefaultTheme from 'vuepress-theme-default'
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

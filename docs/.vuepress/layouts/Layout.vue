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
#waline-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>

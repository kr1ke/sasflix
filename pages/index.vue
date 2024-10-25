<template>
  <div class="px-8 py-4">
    <h1 class="text-3xl font-bold text-accent-primary text-center pb-12">ikakprosto.ru</h1>
    <main class="flex justify-center items-start">
      <PostsList />
    </main>
  </div>
</template>
<script setup lang="ts">

import PostsList from '~/components/PostsList.vue';
</script>

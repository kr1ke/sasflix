<script setup lang="ts">
interface Props {
  date: string;
  tags: string[];
}

const { date, tags } = defineProps<Props>()
</script>
<template>
  <span class="text-sm text-gray-border">{{ date}}</span>
  <div class="flex items-center justify-start gap-1 pl-2.5">
    <span v-for="tag in tags" :key="tag" ref="#" class="tag">
      <span class="text-sm tracking-[-0.078px]">{{ tag }}</span>
    </span>
  </div>
</template>

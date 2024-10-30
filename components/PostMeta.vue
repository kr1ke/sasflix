<script setup lang="ts">
interface Props {
  date: string;
  tags: string[];
}

const { date, tags } = defineProps<Props>();
</script>
<template>
  <span class="text-sm leading-[10px] tracking-[-0.078px] text-gray-border">{{
    date
  }}</span>
  <div class="flex items-center justify-start gap-1 pl-2.5">
    <span v-for="tag in tags" :key="tag" ref="#" class="tag">
      <span class="text-sm tracking-[-0.078px]">{{ tag }}</span>
    </span>
  </div>
</template>
<style scoped>
.tag {
  @apply relative flex h-[18px] items-center rounded-[3px] bg-primary-gray p-1 text-secondary-black first:rounded-l-[0px] first:pl-0;

  &:first-child::before {
    content: '';
    position: absolute;
    left: -10px;
    width: 10px;
    height: 100%;
    background-image: url('../assets/icons/rounded-arrow.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>

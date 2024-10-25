<script setup lang="ts">
interface Props {
  title?: string;
  text?: string;
  tags?: string[];
}

const defaultTitle = 'defaultTitle';
const defaultText = 'defaultText';

const { title = defaultTitle, text = defaultText, tags } = defineProps<Props>();
</script>
<template>
  <div class="flex flex-col items-start">
    <h2 class="text-[28px] font-bold tracking-[-1.45px] text-primary-back">
      {{ title }}
    </h2>
    <p class="mt-4 text-xl text-primary-back">
      {{ text }}
    </p>
    <div class="mt-6 flex justify-start w-full gap-2">
      <nuxt-link
        to="/"
        class="text-accent-primary text-sm underline underline-offset-4 decoration-accent-secondary decoration-[0.5px]"
      >
        Open comments
      </nuxt-link>
      <span class="text-gray-border text-sm">Today</span>
      <div class="flex gap-1 items-center justify-start pl-2.5">
        <a
          v-for="(tag, index) in tags"
          :key="tag"
          href="#"
          class="tag"
        >
          <span class="tracking-[-0.078px] text-sm">{{ tag }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<style>
.tag {
  @apply first:pl-0 first:rounded-l-[0px] relative h-[18px] bg-primary-gray text-secondary-black flex items-center p-1 rounded-[3px];
  &:first-child::before {
    content: '';
    position: absolute;
    left: -9px;
    width: 10px;
    height: 100%;
    background-image: url('../assets/icons/rounded-arrow.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>

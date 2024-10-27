<script setup lang="ts">
import slugify from 'slugify';

import Like from 'assets/icons/like.svg';
import LikeActive from 'assets/icons/like-active.svg';
import Dislike from 'assets/icons/dislike.svg';
import DislikeActive from 'assets/icons/dislike-active.svg';
import PostMeta from '~/components/PostMeta.vue';

interface Props {
  id: number;
  title: string;
  text: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
    isLiked: boolean;
    isDisliked: boolean;
  };
}

const { title, text, tags, id } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'onLike' | 'onDislike', id: number): void;
}>();

const postSlug = slugify(title, { lower: true });
</script>
<template>
  <div class="flex flex-col items-start">
    <h2 class="text-[28px] font-bold tracking-[-1.45px] text-primary-back">
      {{ title }}
    </h2>
    <p class="mt-4 text-xl text-primary-back">
      {{ text }}
    </p>
    <div
      class="mt-6 flex w-full items-center justify-start gap-2 max-md:flex-wrap"
    >
      <div class="flex items-center gap-[1px]">
        <!--        ширина кнопок не фиксирована по макету -->
        <button
          class="flex h-[27px] items-center gap-1.5 rounded-l-[30px] bg-primary-gray py-2 pl-3 pr-2"
          :class="[{ 'bg-primary-red': reactions.isLiked }]"
          @click="emit('onLike', id)"
        >
          <span
            class="flex items-center gap-1"
            :class="[
              reactions.isLiked ? 'text-primary-white' : 'text-secondary-black',
            ]"
          >
            <LikeActive
              v-if="reactions.isLiked"
              class="w-[13px]"
              filled
              :font-controlled="false"
            />
            <Like v-else class="w-[13px]" filled :font-controlled="false" />
            <span class="text-sm tracking-[-0.078px] text-inherit">Like</span>
          </span>
          <span
            class="text-sm tracking-[-1px] text-gray-border"
            :class="{ 'text-primary-white': reactions.isLiked }"
            >{{ reactions.likes }}</span
          >
        </button>
        <button
          class="flex h-[27px] items-center gap-1.5 rounded-r-[30px] bg-primary-gray py-2 pl-3 pr-2"
          :class="[{ 'bg-secondary-black': reactions.isDisliked }]"
          @click="emit('onDislike', id)"
        >
          <span class="flex items-center gap-1">
            <DislikeActive
              v-if="reactions.isDisliked"
              class="w-[13px]"
              filled
              :font-controlled="false"
            />
            <Dislike v-else class="w-[13px]" filled :font-controlled="false" />
            <span
              class="text-sm tracking-[-0.078px]"
              :class="[
                reactions.isDisliked
                  ? 'text-primary-white'
                  : 'text-secondary-black',
              ]"
              >Trash</span
            >
          </span>
          <span
            class="text-sm tracking-[-1px]"
            :class="[
              reactions.isDisliked ? 'text-primary-white' : 'text-gray-border',
            ]"
            >{{ reactions.dislikes }}</span
          >
        </button>
      </div>
      <nuxt-link
        :to="{ name: 'post', params: { post: `${postSlug}-${id}` } }"
        class="text-sm text-accent-primary underline decoration-accent-secondary decoration-[0.5px] underline-offset-4"
      >
        Open comments
      </nuxt-link>
      <PostMeta :tags="tags" :date="'today'" />
    </div>
  </div>
</template>
<style>
.tag {
  @apply relative flex h-[18px] items-center rounded-[3px] bg-primary-gray p-1 text-secondary-black first:rounded-l-[0px] first:pl-0;

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

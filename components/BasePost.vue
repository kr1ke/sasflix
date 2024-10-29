<script setup lang="ts">
import slugify from 'slugify';

import PostMeta from '~/components/PostMeta.vue';
import PostReactions from '~/components/PostReactions.vue';

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
  showReactions?: boolean;
  showCommentsLink?: boolean;
  showMeta?: boolean;
}

const {
  title,
  text,
  tags,
  id,
  showReactions = true,
  showCommentsLink = true,
  showMeta = true,
} = defineProps<Props>();

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
      <PostReactions
        v-if="showReactions"
        :id="id"
        :reactions="reactions"
        @on-like="emit('onLike', id)"
        @on-dislike="emit('onDislike', id)"
      />
      <nuxt-link
        v-if="showCommentsLink"
        :to="{ name: 'post', params: { post: `${postSlug}-${id}` } }"
        class="text-sm text-accent-primary underline decoration-accent-secondary decoration-[0.5px] underline-offset-4"
      >
        Open comments
      </nuxt-link>
      <PostMeta v-if="showMeta" :tags="tags" :date="'Today'" />
    </div>
  </div>
</template>

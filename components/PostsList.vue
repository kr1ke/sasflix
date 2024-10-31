<script setup lang="ts">
import type { IPostsList } from '~/composables/usePosts';

import { usePostReactions } from '~/composables/usePostReactions';

const { onLike, onDislike } = usePostReactions();

const { fetchPosts } = usePosts();

const { data, status } = await useAsyncData<IPostsList>(
  () =>
    fetchPosts({
      query: {
        limit: 5,
      },
    }),
  {
    // добавляем isLiked и isDisliked к каждому посту
    transform: (data: IPostsList) => {
      return {
        ...data,
        posts: data.posts.map((post: IPost) => ({
          ...post,
          reactions: { ...post.reactions, isLiked: false, isDisliked: false },
        })),
      };
    },
  },
);
</script>

<template>
  <section
    v-if="status === 'success'"
    class="flex max-w-[676px] flex-col items-center gap-8"
  >
    <BasePost
      v-for="post in data.posts"
      :id="post.id"
      :key="post.id"
      :title="post.title"
      :text="post.body"
      :tags="post.tags"
      :reactions="post.reactions"
      @on-like="onLike(post)"
      @on-dislike="onDislike(post)"
    />
  </section>
</template>

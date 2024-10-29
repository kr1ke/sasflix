<template>
  <section
    v-if="status === 'success' && localPostsData"
    class="flex max-w-[676px] flex-col items-center gap-8"
  >
    <BasePost
      v-for="post in localPostsData.posts"
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

<script setup lang="ts">
import type { IPost, IPostsList } from '~/composables/usePosts';

import { usePostReactions } from '~/composables/usePostReactions';
const { onLike, onDislike } = usePostReactions();

const { fetchPosts } = usePosts();

const localPostsData = ref<IPostsList | null>(null);
const { status } = await useAsyncData(() =>
  fetchPosts({
    query: {
      limit: 5,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResponse: ({ response }: any) => {
      const postsData = response._data as IPostsList;
      localPostsData.value = {
        ...postsData,
        posts: postsData.posts.map((post: IPost) => ({
          ...post,
          reactions: { ...post.reactions, isLiked: false, isDisliked: false },
        })),
      };
    },
  }),
);
</script>

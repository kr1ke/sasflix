<template>
  <section
    v-if="status === 'success' && localPostsData"
    class="flex max-w-[676px] flex-col items-center gap-8"
  >
    {{localPostsData.posts[0]}}
    <BasePost
      v-for="post in localPostsData.posts"
      :id="post.id"
      :key="post.id"
      :title="post.title"
      :text="post.body"
      :tags="post.tags"
      :reactions="post.reactions"
      @on-like="onLike"
      @on-dislike="onDislike"
    />
  </section>
</template>

<script setup lang="ts">
import type { IPost, IPostsList } from '~/composables/usePosts';

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

const toggleReaction = (id: number, type: 'like' | 'dislike') => {
  if (!localPostsData.value) return;

  const post = localPostsData.value.posts.find((post) => post.id === id);
  if (!post) return;

  const { reactions } = post;

  // для лаков
  if (type === 'like') {
    if (reactions.isDisliked) {
      reactions.dislikes--;
      reactions.isDisliked = false;
    }
    if (reactions.isLiked) {
      reactions.likes--;
    } else {
      reactions.likes++;
    }
    reactions.isLiked = !reactions.isLiked;
  }
  // для дизлайков
  else if (type === 'dislike') {
    if (reactions.isLiked) {
      reactions.likes--;
      reactions.isLiked = false;
    }
    if (reactions.isDisliked) {
      reactions.dislikes--;
    } else {
      reactions.dislikes++;
    }
    reactions.isDisliked = !reactions.isDisliked;
  }
};

const onLike = (id: number) => {
  toggleReaction(id, 'like');
};

const onDislike = (id: number) => {
  toggleReaction(id, 'dislike');
};
</script>

<script setup lang="ts">
import type { IPost } from '~/composables/usePosts';

import { usePostReactions } from '~/composables/usePostReactions';
const { onLike, onDislike } = usePostReactions();
const { fetchPostItem } = usePosts();

const route = useRoute();
const { post } = route.params;

const getPostId = (): number => {
  const postId = post.toString().split('-').at(-1);
  if (!postId) return 0; // ошибка
  return Number(postId);
};

const postId: number = getPostId();

const { data:postItem, status } = await useAsyncData<IPost>(() =>
    fetchPostItem(postId),
  {
    // добавляем isLiked и isDisliked к посту
    transform: (data: IPost) => {
      const reactions = {
        ...data.reactions,
        isLiked: false,
        isDisliked: false,
      };
      return {
        ...data,
        reactions,
      } as IPost;
    },
  }
);
</script>
<template>
  <div>
    <main class="flex items-start justify-center">
      <div class="max-w-[676px]">
        <BasePost
          v-if="status === 'success'"
          :id="postItem.id"
          :key="postItem.id"
          class="py-2.5"
          :title="postItem.title"
          :text="postItem.body"
          :tags="postItem.tags"
          :reactions="postItem.reactions"
          :show-comments-link="false"
          @on-like="onLike(postItem)"
          @on-dislike="onDislike(postItem)"
        />
        <PostCommentsList :post-id="postId" />
      </div>
    </main>
  </div>
</template>

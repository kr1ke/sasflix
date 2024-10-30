<template>
  <div>
    <main class="flex items-start justify-center">
      <div class="max-w-[676px]">
        <BasePost
          v-if="status === 'success' && localPostItemData"
          :id="localPostItemData.id"
          :key="localPostItemData.id"
          class="py-2.5"
          :title="localPostItemData.title"
          :text="localPostItemData.body"
          :tags="localPostItemData.tags"
          :reactions="localPostItemData.reactions"
          :show-comments-link="false"
          @on-like="onLike(localPostItemData)"
          @on-dislike="onDislike(localPostItemData)"
        />
        <PostCommentsList :post-id="postId" />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import type { IPost } from '~/composables/usePosts';

import { usePostReactions } from '~/composables/usePostReactions';

const { onLike, onDislike } = usePostReactions();

const { fetchPostItem } = usePosts();

const localPostItemData = ref<IPost | null>(null);

const route = useRoute();
const { post } = route.params;

const getPostId = (): number => {
  const postId = post.toString().split('-').at(-1);
  if (!postId) return 0; // ошибка
  return Number(postId);
};

const postId: number = getPostId();

const { status } = await useAsyncData(() =>
  fetchPostItem(postId, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResponse: ({ response }: any) => {
      const reactions = {
        ...response._data.reactions,
        isLiked: false,
        isDisliked: false,
      };
      localPostItemData.value = {
        ...response._data,
        reactions,
      } as IPost;
    },
  }),
);
</script>

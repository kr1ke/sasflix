<template>
  <div>
    {{ postData }}
<!--    <BasePost />-->
    <hr>
    <div v-if="commentsStatus === 'success' && localCommentsData">
      {{localCommentsData}}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IPost } from '~/composables/usePosts';

const { fetchPostItem, fetchPostComments } = usePosts();

const localPostItemData = ref<IPost | null>(null);
const localCommentsData = ref<IPost | null>(null);

const route = useRoute();
const { post } = route.params;

const getPostId = (): number => {
  const postId = post.toString().split('-').at(-1);
  if (!postId) return 0; // ошибка
  return Number(postId);
};

const postId: number = getPostId();

const { data: postData } = await useAsyncData(() =>
  fetchPostItem(postId, {
    onResponse: ({ response }: any) => {
      localPostItemData.value = response._data as IPost;
    },
  }),
);

const { status:commentsStatus } = await useAsyncData(() =>
  fetchPostComments(postId, {
    onResponse: ({ response }: any) => {
      localCommentsData.value = response._data as IPost;
    },
  })
)
</script>

<script setup lang="ts">
import type { ICommentsData } from '~/composables/usePosts';
import { usePosts } from '~/composables/usePosts';

interface Props {
  postId: number;
}

const { postId } = defineProps<Props>();

const localCommentsData = ref<ICommentsData | null>(null);
const { fetchPostComments } = usePosts();
const { status } = await useAsyncData(() =>
  fetchPostComments(postId, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResponse: ({ response }: any) => {
      localCommentsData.value = response._data as ICommentsData;
    },
  }),
);

const commentsTitle = computed(() => {
  if (localCommentsData.value?.total === 1) {
    return '1 comment';
  }
  return `${localCommentsData.value?.total} comments`;
});
</script>
<template>
  <section v-if="status === 'success' && localCommentsData">
    <h3
      class="pt-8 text-[28px] font-bold tracking-[-1.45px] text-primary-black"
    >
      {{ commentsTitle }}
    </h3>
    <div>
      <PostCommentsListItem
        v-for="comment in localCommentsData.comments"
        :id="comment.id"
        :key="comment.id"
        :body="comment.body"
        :user="comment.user"
      />
    </div>
  </section>
</template>

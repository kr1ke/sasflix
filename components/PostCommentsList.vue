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
      localCommentsData.value = {
        ...response._data,
        comments: response._data.comments.map((comment: IComment) => ({
          ...comment,
          isDeleted: false,
        })),
      } as ICommentsData;
    },
  }),
);

const commentsTitle = computed(() => {
  if (localCommentsData.value?.total === 1) {
    return '1 comment';
  }
  return `${localCommentsData.value?.total} comments`;
});

const getCommentById = (id: number) => {
  return localCommentsData.value.comments.find((comment) => comment.id === id);
};

const softDeleteComment = (id: number) => {
  const comment = getCommentById(id);
  comment.isDeleted = true;
};

const softRestoreComment = (id: number) => {
  const comment = getCommentById(id);
  comment.isDeleted = false;
};
</script>
<template>
  <section v-if="status === 'success' && localCommentsData">
    <h3
      class="pt-8 text-[28px] font-bold leading-[24px] tracking-[-1.45px] text-primary-black"
    >
      {{ commentsTitle }}
    </h3>
    <div class="mt-6 flex flex-col items-start gap-6">
      <PostCommentsListItem
        v-for="comment in localCommentsData.comments"
        :id="comment.id"
        :key="comment.id"
        :is-deleted="comment.isDeleted"
        :body="comment.body"
        :user="comment.user"
        :date="'Today'"
        @on-delete-comment="softDeleteComment"
        @on-restore-comment="softRestoreComment"
      />
    </div>
  </section>
</template>

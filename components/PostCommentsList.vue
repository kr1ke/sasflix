<script setup lang="ts">
import type { ICommentsData } from '~/composables/usePosts';
import { usePosts } from '~/composables/usePosts';

interface Props {
  postId: number;
}

const { postId } = defineProps<Props>();

const { fetchPostComments } = usePosts();

const { data: postCommentsData, status } = await useAsyncData<ICommentsData>(
  () => fetchPostComments(postId),
  {
    transform: (data: ICommentsData) => {
      return {
        ...data,
        comments: data.comments.map((comment: IComment) => ({
          ...comment,
          isDeleted: false,
        })),
      };
    },
  },
);

const commentsTitle = computed(() => {
  if (postCommentsData.value?.total === 1) {
    return '1 comment';
  }
  return `${postCommentsData.value?.total} comments`;
});

const getCommentById = (id: number) => {
  return postCommentsData.value.comments.find((comment) => comment.id === id);
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
  <section v-if="status === 'success' && postCommentsData">
    <h3
      class="pt-8 text-[28px] font-bold leading-[24px] tracking-[-1.45px] text-primary-black"
    >
      {{ commentsTitle }}
    </h3>
    <div class="mt-6 flex flex-col items-start gap-6">
      <PostCommentsListItem
        v-for="comment in postCommentsData.comments"
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

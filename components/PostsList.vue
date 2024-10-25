<template>
  <section v-if="status === 'success'" class="flex flex-col gap-8 max-w-[676px] items-center">
    <BasePost
      v-for="post in postsData?.posts"
      :key="post.id"
      :title="post.title"
      :text="post.body"
      :tags="post.tags"
    />
  </section>
</template>

<script setup lang="ts">
const { fetchPosts } = usePosts();

const { data: postsData, status } = await useAsyncData(() =>
  fetchPosts({
    query: {
      limit: 5,
    },
  }),
);
</script>

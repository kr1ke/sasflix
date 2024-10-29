<script setup lang="ts">
import DefaultAvatar from '~/assets/icons/default-avatar.svg';
import type { ICommentUser } from '~/composables/usePosts';

interface Props {
  id: number;
  body: string;
  user: ICommentUser;
}

const { id, body, user } = defineProps<Props>();
</script>
<template>
  <div class="flex items-start justify-start gap-2">
    <div class="h-[46px] w-[46px]">
      <DefaultAvatar class="w-[46px] h-[46px]" filled :font-controlled="false" />
    </div>
    <div class="flex flex-col items-start">
      <p class="text-xl leading-5 tracking-[-1px] text-primary-black">
        {{ user.fullName }}
      </p>
      <p>{{ body }}</p>
    </div>
  </div>
</template>

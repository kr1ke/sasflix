<script setup lang="ts">
import DefaultAvatar from '~/assets/icons/default-avatar.svg';
import type { ICommentUser } from '~/composables/usePosts';

interface Props {
  id: number;
  body: string;
  user: ICommentUser;
  date: string;
  isDeleted: boolean;
}

const { id, isDeleted, body, user } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'onDeleteComment' | 'onRestoreComment', id: number): void;
}>();
</script>
<template>
  <div class="flex w-full items-start justify-start gap-2">
    <div class="h-[46px] w-[46px]">
      <DefaultAvatar class="h-full w-full" filled :font-controlled="false" />
    </div>
    <div class="flex w-full flex-col items-start">
      <p
        class="text-[20px] font-semibold leading-[14px] tracking-[-1px] text-primary-black"
      >
        {{ user.fullName }}
      </p>
      <div class="mt-3 flex items-start gap-2 self-stretch">
        <p
          v-if="isDeleted"
          class="text-[20px] font-normal leading-[20px] tracking-[-1px] text-primary-black"
        >
          This comment has been deleted.
        </p>
        <p
          v-else
          class="text-[20px] font-normal leading-[20px] tracking-[-1px] text-primary-black"
        >
          {{ body }}
        </p>
        <button
          v-if="isDeleted"
          class="text-[20px] leading-[20px] tracking-[-0.078px] text-accent-primary underline decoration-accent-secondary decoration-[0.5px] underline-offset-4"
          @click="emit('onRestoreComment', id)"
        >
          Return
        </button>
      </div>
      <!--      comments meta data-->
      <div v-if="!isDeleted" class="mt-[13px] flex items-center gap-5">
        <span
          class="text-sm leading-[12px] tracking-[-0.078px] text-gray-border"
          >{{ date }}</span
        >
        <button
          class="text-sm leading-[12px] tracking-[-0.078px] text-primary-red underline decoration-secondary-red decoration-[0.5px] underline-offset-4"
          @click="emit('onDeleteComment', id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

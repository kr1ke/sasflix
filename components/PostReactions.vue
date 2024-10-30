<script setup lang="ts">
import Like from '~/assets/icons/like.svg';
import LikeActive from '~/assets/icons/like-active.svg';
import Dislike from '~/assets/icons/dislike.svg';
import DislikeActive from '~/assets/icons/dislike-active.svg';

interface Props {
  id: number;
  reactions: {
    likes: number;
    dislikes: number;
    isLiked: boolean;
    isDisliked: boolean;
  };
}

const { reactions } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'onLike' | 'onDislike', id: number): void;
}>();
</script>

<template>
  <div class="flex items-center gap-[1px]">
    <!--        ширина кнопок не фиксирована по макету -->
    <button
      class="flex h-[27px] items-center gap-1.5 rounded-l-[30px] bg-primary-gray py-2 pl-3 pr-2"
      :class="[{ 'bg-primary-red': reactions.isLiked }]"
      @click="emit('onLike', id)"
    >
      <span class="flex items-center gap-1">
        <LikeActive
          v-if="reactions.isLiked"
          class="w-[13px]"
          filled
          :font-controlled="false"
        />
        <Like v-else class="w-[13px]" filled :font-controlled="false" />
        <span
          class="text-sm tracking-[-0.078px]"
          :class="[
            reactions.isLiked ? 'text-primary-white' : 'text-secondary-black',
          ]"
          >Like</span
        >
      </span>
      <span
        class="text-sm tracking-[-1px]"
        :class="[
          reactions.isLiked
            ? 'text-primary-white'
            : 'text-secondary-black opacity-30',
        ]"
        >{{ reactions.likes }}</span
      >
    </button>
    <button
      class="flex h-[27px] items-center gap-1.5 rounded-r-[30px] bg-primary-gray py-2 pl-3 pr-2"
      :class="[{ 'bg-secondary-black': reactions.isDisliked }]"
      @click="emit('onDislike', id)"
    >
      <span class="flex items-center gap-1">
        <DislikeActive
          v-if="reactions.isDisliked"
          class="w-[13px]"
          filled
          :font-controlled="false"
        />
        <Dislike v-else class="w-[13px]" filled :font-controlled="false" />
        <span
          class="text-sm tracking-[-0.078px]"
          :class="[
            reactions.isDisliked
              ? 'text-primary-white'
              : 'text-secondary-black',
          ]"
          >Trash</span
        >
      </span>
      <span
        class="text-sm tracking-[-1px]"
        :class="[
          reactions.isDisliked
            ? 'text-primary-white opacity-40'
            : 'text-secondary-black opacity-30',
        ]"
        >{{ reactions.dislikes }}</span
      >
    </button>
  </div>
</template>

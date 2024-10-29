import type { IPost } from '~/composables/usePosts';

export function useReactions(post:IPost) {
  const toggleReaction = (id: number, type: 'like' | 'dislike') => {
    if (!post) return;

    const { reactions } = post;

    // для лаков
    if (type === 'like') {
      if (reactions.isDisliked) {
        reactions.dislikes--;
        reactions.isDisliked = false;
      }
      if (reactions.isLiked) {
        reactions.likes--;
      } else {
        reactions.likes++;
      }
      reactions.isLiked = !reactions.isLiked;
    }
    // для дизлайков
    else if (type === 'dislike') {
      if (reactions.isLiked) {
        reactions.likes--;
        reactions.isLiked = false;
      }
      if (reactions.isDisliked) {
        reactions.dislikes--;
      } else {
        reactions.dislikes++;
      }
      reactions.isDisliked = !reactions.isDisliked;
    }
  };

  const onLike = (id: number) => {
    toggleReaction(id, 'like');
  };

  const onDislike = (id: number) => {
    toggleReaction(id, 'dislike');
  };

  return {
    onLike,
    onDislike
  };
}

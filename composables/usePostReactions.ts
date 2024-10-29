import type { IPost } from '~/composables/usePosts';

const usePostReactions = () => {
  const toggleReaction = (post: IPost, type: 'like' | 'dislike') => {
    if (!post) return;

    const { reactions } = post;

    // для лайков
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

  const onLike = (post: IPost) => {
    toggleReaction(post, 'like');
  };

  const onDislike = (post: IPost) => {
    toggleReaction(post, 'dislike');
  };

  return {
    toggleReaction,
    onLike,
    onDislike,
  };
};

export { usePostReactions };

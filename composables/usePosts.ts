import { useApi } from '~/composables/useApi';

interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
    isLiked: boolean;
    isDisliked: boolean;
  };
  views: number;
  userId: number;
}

interface IPostsList {
  limit: number;
  posts: IPost[];
  skip: number;
  total: number;
}

const usePosts = () => {
  const api = useApi();

  const fetchPosts = async (options = {}): Promise<IPostsList> => {
    return await api<IPostsList>(() => '/posts', options);
  };

  return {
    fetchPosts,
  };
};

export { usePosts };
export type { IPost, IPostsList };

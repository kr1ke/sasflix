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

  const fetchPostItem = async (id:number, options = {}): Promise<IPostsList> => {
    return await api<IPostsList>(() => `/post/${id}`, options);
  };

  const fetchPostComments = async (id:number, options = {}): Promise<IPostsList> => {
    return await api<IPostsList>(() => `/post/${id}/comments`, options);
  };

  return {
    fetchPosts,
    fetchPostItem,
    fetchPostComments
  };
};

export { usePosts };
export type { IPost, IPostsList };

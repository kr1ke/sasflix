import { useApi } from '~/composables/useApi';

// Posts types

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

// Comments types

interface ICommentUser {
  id: number;
  username: string;
  fullName: string;
}

interface IComment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  isDeleted?: boolean;
  user: ICommentUser;
}

interface ICommentsData {
  comments: IComment[];
  total: number;
  skip: number;
  limit: number;
}

const usePosts = () => {
  const api = useApi();

  const fetchPosts = async (options = {}): Promise<IPostsList> => {
    return await api<IPostsList>(() => '/posts', options);
  };

  const fetchPostItem = async (id: number, options = {}): Promise<IPost> => {
    return await api<IPost>(() => `/post/${id}`, options);
  };

  const fetchPostComments = async (
    id: number,
    options = {},
  ): Promise<ICommentsData> => {
    return await api<ICommentsData>(() => `/post/${id}/comments`, options);
  };

  return {
    fetchPosts,
    fetchPostItem,
    fetchPostComments,
  };
};

export { usePosts };
export type { IPost, IPostsList, ICommentsData, ICommentUser, IComment };

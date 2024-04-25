import { sub } from "date-fns";

export function formatPostsForUI(post, min) {
  const { userId, ...postInfo } = post;

  const formattedPost = {
    ...postInfo,
    author: Number(userId),
    date: sub(new Date(), { minutes: min }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  };
  return formattedPost;
}
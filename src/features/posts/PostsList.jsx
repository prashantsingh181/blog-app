import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  errorSelector,
  fetchPosts,
  postsSelector,
  statusSelector,
} from "./postsSlice";
import PostForm from "./PostForm";
import Posts from "./Posts";

export default function PostsList() {
  const dispatch = useDispatch();

  const posts = useSelector(postsSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => <Posts key={post.id} post={post} />);
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-200 text-cyan-800 flex flex-col items-center gap-4 py-10">
      <h2 className="text-2xl font-bold">Posts Component</h2>
      <PostForm />
      <div className="flex flex-col gap-4">{content}</div>
    </div>
  );
}

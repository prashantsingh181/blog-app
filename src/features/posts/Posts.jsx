import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";

const Posts = ({ post }) => {
  return (
    <article className="border-2 border-blue-800 px-6 py-4 rounded">
      <div className="flex flex-row gap-4 border-b border-b-blue-400 justify-between">
        <h3 className="text-xl font-bold">{post.title}</h3>
        <TimeAgo timeStamp={post.date} />
      </div>
      <p className="text-sm text-cyan-600 mb-2">
        <PostAuthor author={post.author} />
      </p>
      <p>{post.body.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default Posts;

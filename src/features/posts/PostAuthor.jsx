import React from "react";
import { useSelector } from "react-redux";
import { usersSelector } from "../users/usersSlice";

const PostAuthor = ({ author }) => {
  const users = useSelector(usersSelector);
  const user = users.find((user) =>  user.id === author);
  return <span> by {user ? user.name : "Unknown"}</span>;
};

export default PostAuthor;

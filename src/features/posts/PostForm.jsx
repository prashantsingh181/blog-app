import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "./postsSlice";
import { usersSelector } from "../users/usersSlice";

const PostForm = () => {
  const users = useSelector(usersSelector);

  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    author: "",
  });

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  function handleFormChange(event) {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    try {
      dispatch(
        createPost({
          title: formState.title,
          body: formState.content,
          userId: formState.author,
        })
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
    setFormState({ title: "", content: "", author: "" });
  }
  return (
    <section className="my-3">
      <form
        onSubmit={handleFormSubmission}
        className="flex flex-col gap-3 text-blue-900 border border-blue-800 px-8 py-4 rounded bg-blue-100 shadow-lg"
      >
        <label htmlFor="post-title">Title</label>
        <input
          type="text"
          name="title"
          id="post-title"
          className="py-1 px-2 rounded border border-cyan-300"
          value={formState.title}
          onChange={handleFormChange}
        />
        <label htmlFor="post-author">Author</label>
        <select
          id="post-author"
          name="author"
          className="py-1 px-2 rounded border border-cyan-300"
          value={formState.author}
          onChange={handleFormChange}
        >
          <option value="" disabled hidden></option>
          {userOptions}
        </select>
        <label htmlFor="post-content">Content</label>
        <textarea
          name="content"
          id="post-content"
          cols="30"
          rows="5"
          className="py-1 px-2 rounded border border-cyan-300"
          value={formState.content}
          onChange={handleFormChange}
        ></textarea>
        <button
          className="bg-blue-400 py-2 rounded border border-blue-500 disabled:bg-slate-300 disabled:border-slate-500"
          disabled={Object.values(formState).some((value) => !value)}
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default PostForm;

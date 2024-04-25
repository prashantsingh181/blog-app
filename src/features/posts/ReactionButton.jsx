import { useDispatch } from "react-redux";
import { addReaction } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const renderedReactions = Object.entries(post.reactions).map(
    ([reactionName, count]) => (
      <button
        key={reactionName}
        onClick={() => dispatch(addReaction(post.id, reactionName))}
      >
        {reactionEmoji[reactionName]} {count}
      </button>
    )
  );
  return <div className="flex flex-row gap-3 py-1">{renderedReactions}</div>;
};

export default ReactionButtons;

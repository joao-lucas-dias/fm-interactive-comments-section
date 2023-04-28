import IconButton from "@/components/UI/IconButton";
import { CommentType, Reply, User } from "@/models/types";
import { deleteComment } from "@/store/commentsSlice";

import classes from "./Actions.module.css";
import { useDispatch } from "react-redux";

const Actions: React.FC<{
	type: "comment" | "reply";
	parentComment: CommentType | null;
	user: User;
	loggedInUser: string;
	id: string;
}> = (props) => {
	const dispatch = useDispatch();

	const deleteCommentHandler = async () => {
		dispatch(deleteComment({ id: props.id, type: props.type }));

		if (props.type === "reply") {
			const comment: CommentType = props.parentComment!;
			const updatedComment: CommentType = {
				...comment,
				replies: comment.replies.filter((reply) => reply.id !== props.id)
			};

			const response = await fetch("/api/comments", {
				method: "PUT",
				body: JSON.stringify(updatedComment),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const data = await response.json();
		} else {
			const response = await fetch(`/api/comments/${props.id}`, {
				method: "DELETE"
			});

			const data = await response.json();
		}
	};

	return (
		<div className={classes.actions}>
			{props.loggedInUser === props.user.username ? (
				<>
					<IconButton type="delete" onClick={deleteCommentHandler} />
					<IconButton type="edit" />
				</>
			) : (
				<IconButton type="reply" />
			)}
		</div>
	);
};

export default Actions;

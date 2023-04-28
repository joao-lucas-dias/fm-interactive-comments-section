import IconButton from "@/components/UI/IconButton";
import { CommentType } from "@/models/types";
import { deleteAction } from "@/store/commentsSlice";
import { useDispatch } from "react-redux";

import classes from "./Actions.module.css";

const Actions: React.FC<{
	type: "comment" | "reply";
	data: any;
	loggedInUser: string;
	parentComment?: CommentType;
	onReplyClick: () => void;
}> = (props) => {
	const dispatch = useDispatch();

	const { id, user } = props.data;

	const addReplyHandler = () => {
		props.onReplyClick();
	};

	const deleteActionHandler = async () => {
		dispatch(deleteAction({ id: id, type: props.type }));

		if (props.type === "reply") {
			const parentComment: CommentType = props.parentComment!;
			const updatedComment: CommentType = {
				...parentComment,
				replies: parentComment.replies.filter((reply) => reply.id !== id)
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
			const response = await fetch(`/api/comments/${id}`, {
				method: "DELETE"
			});

			const data = await response.json();
		}
	};

	return (
		<div className={classes.actions}>
			{props.loggedInUser === user.username ? (
				<>
					<IconButton type="delete" onClick={deleteActionHandler} />
					<IconButton type="edit" />
				</>
			) : (
				<IconButton type="reply" onClick={addReplyHandler} />
			)}
		</div>
	);
};

export default Actions;

import Image from "next/image";
import Container from "../UI/Container";
import { CommentType, ReplyType, User } from "@/models/types";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addReplyAction } from "@/store/commentsSlice";

import shared_classes from "../../styles/shared.module.css";

const AddReply: React.FC<{
	loggedinUser: User;
	parentComment: CommentType;
	replyingTo: string;
	onReplyAdded: () => void;
}> = (props) => {
	const defaultValue = `@${props.replyingTo}, `;

	const [enteredText, setEnteredText] = useState(defaultValue);
	const dispatch = useDispatch();

	const { id, replies } = props.parentComment;

	const enterTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredText(event.target.value);
	};

	const addReplyHandler = async () => {
		const replyContent = enteredText.replace(`@${props.replyingTo}, `, "");

		const newReply: ReplyType = {
			id: `${id}_reply${replies.length + 1}`,
			user: props.loggedinUser,
			createdAt: "3 min ago",
			replyingTo: props.replyingTo,
			content: replyContent,
			score: 1
		};

		dispatch(addReplyAction({ parentComment: props.parentComment, replyData: newReply }));

		props.onReplyAdded();

		const updatedReplies: ReplyType[] = [...replies, newReply];

		const updatedComment: CommentType = {
			...props.parentComment,
			replies: updatedReplies
		};

		const response = await fetch("/api/comments", {
			method: "PUT",
			body: JSON.stringify(updatedComment),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json();
	};

	return (
		<Container>
			<textarea
				value={enteredText}
				onChange={(event) => enterTextHandler(event)}
				className={shared_classes.textarea}
			></textarea>
			<Image
				src={props.loggedinUser.image.webp}
				alt="User profile picture."
				className={shared_classes.image}
				width={2000}
				height={2000}
			/>
			<button
				onClick={addReplyHandler}
				disabled={enteredText.replace(`@${props.replyingTo}, `, "").length === 0}
				className={shared_classes.button}
			>
				Reply
			</button>
		</Container>
	);
};

export default AddReply;

import Image from "next/image";
import Container from "../UI/Container";
import { CommentType, ReplyType, User } from "@/models/types";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addReplyAction } from "@/store/commentsSlice";

import classes from "./AddReply.module.css";

const AddReply: React.FC<{
	loggedinUser: User;
	parentComment: CommentType;
	replyingTo: string;
	onReplyAdded: () => void;
}> = (props) => {
	const [enteredText, setEnteredText] = useState("");
	const dispatch = useDispatch();

	const { id, replies } = props.parentComment;

	const enterTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredText(event.target.value);
	};

	const addReplyHandler = async () => {
		const newReply: ReplyType = {
			id: `${id}_reply${replies.length + 1}`,
			user: props.loggedinUser,
			createdAt: "3 min ago",
			replyingTo: props.replyingTo,
			parentComment: props.parentComment,
			content: enteredText.replace(`@${props.replyingTo}, `, ""),
			score: 1
		};

		dispatch(addReplyAction(newReply));

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
				defaultValue={`@${props.replyingTo}, `}
				onChange={(event) => enterTextHandler(event)}
				className={classes.textarea}
			></textarea>
			<Image
				src={props.loggedinUser.image.webp}
				alt="User profile picture."
				className={classes.image}
				width={2000}
				height={2000}
			/>
			<button onClick={addReplyHandler} className={classes.button}>
				Reply
			</button>
		</Container>
	);
};

export default AddReply;

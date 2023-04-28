import Image from "next/image";
import Container from "./UI/Container";
import { CommentType, User } from "@/models/types";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "@/store/commentsSlice";

import classes from "./AddComment.module.css";

const AddComment: React.FC<{ loggedinUser: User; type: string }> = (props) => {
	const [enteredText, setEnteredText] = useState("");
	const dispatch = useDispatch();

	const enterTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredText(event.target.value);
	};

	const addCommentHandler = async () => {
		const newComment: CommentType = {
			user: props.loggedinUser,
			createdAt: "10 min ago",
			content: enteredText,
			score: 1,
			replies: []
		};

		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify(newComment),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json();

		dispatch(addComment({
			id: data.commentId,
			...newComment
		}));
	};

	return (
		<Container>
			<textarea
				value={enteredText}
				placeholder="Add a comment..."
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
			<button onClick={addCommentHandler} className={classes.button}>
				{props.type === "comment" ? "Send" : "Reply"}
			</button>
		</Container>
	);
};

export default AddComment;

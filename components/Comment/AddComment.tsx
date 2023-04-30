import Image from "next/image";
import Container from "../UI/Container";
import { User } from "@/models/types";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "@/store/commentsSlice";

import shared_classes from "../../styles/shared.module.css";

const AddComment: React.FC<{
	loggedinUser: User;
}> = (props) => {
	const [enteredText, setEnteredText] = useState("");
	const dispatch = useDispatch();

	const enterTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredText(event.target.value);
	};

	const addCommentHandler = async () => {
		const newComment = {
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

		dispatch(
			addComment({
				id: data.commentId,
				...newComment
			})
		);

		setEnteredText("");
	};

	return (
		<Container>
			<textarea
				placeholder="Add a comment..."
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
				onClick={addCommentHandler}
				disabled={enteredText.length === 0}
				className={shared_classes.button}
			>
				Send
			</button>
		</Container>
	);
};

export default AddComment;

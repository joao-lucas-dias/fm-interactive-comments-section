import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { editAction } from "@/store/commentsSlice";
import { CommentType, ReplyType } from "@/models/types";

import classes from "./Content.module.css";

const Content: React.FC<{
	type: "comment" | "reply";
	editing: boolean;
	data: any;
	parentComment?: CommentType;
	replyingTo: string;
	onContentUpdated: () => void;
}> = (props) => {
	const dispatch = useDispatch();
	const [enteredText, setEnteredText] = useState(props.data.content);

	const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredText(event.target.value);
	};

	const editContentHandler = async () => {
		// TODO: update changes on Redux
		dispatch(
			editAction({ type: props.type, data: props.data, updatedContent: enteredText })
		);

		props.onContentUpdated();

		// TODO: persist changes on mongodb
		let updatedComment: CommentType;

		if (props.type === "comment") {
			updatedComment = {
				...props.data,
				content: enteredText
			};
		} else {
			const updatedReplies = props.parentComment!.replies.map((reply) => {
				if (reply.id === props.data.id) {
					return {
						...reply,
						content: enteredText
					};
				}
				return reply;
			});

			updatedComment = {
				...props.parentComment!,
				replies: updatedReplies
			};
		}

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
		<>
			{props.editing ? (
				<>
					<textarea
						defaultValue={
							props.type === "reply"
								? `@${props.replyingTo} ${props.data.content}`
								: props.data.content
						}
						onChange={(event) => changeTextHandler(event)}
						className={`${classes.body} ${classes.textarea}`}
					></textarea>
					<button
						onClick={editContentHandler}
						disabled={enteredText.length === 0}
						className={classes.button}
					>
						Update
					</button>
				</>
			) : props.type === "comment" ? (
				<p className={classes.body}>{props.data.content}</p>
			) : (
				<p className={classes.body}>
					<span className={classes.reply_tag}>{`@${props.replyingTo} `}</span>
					{props.data.content}
				</p>
			)}
		</>
	);
};

export default Content;

import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { editAction } from "@/store/commentsSlice";
import { CommentType } from "@/models/types";

import classes from "./Content.module.css";
import shared_classes from "../../../styles/shared.module.css";

const Content: React.FC<{
	type: "comment" | "reply";
	editing: boolean;
	data: any;
	parentComment?: CommentType;
	replyingTo?: string;
	onContentUpdated: () => void;
}> = (props) => {
	const dispatch = useDispatch();

	const defaultValue: string =
		props.type === "reply"
			? `@${props.replyingTo} ${props.data.content}`
			: props.data.content;
	const [enteredText, setEnteredText] = useState(defaultValue);

	const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredText(event.target.value);
	};

	const editContentHandler = async () => {
		const updatedContent = enteredText.replace(`@${props.replyingTo} `, "");

		dispatch(
			editAction({
				type: props.type,
				data: props.data,
				parentComment: props.parentComment,
				updatedContent: updatedContent
			})
		);

		props.onContentUpdated();

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
						content: updatedContent
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
						value={enteredText}
						onChange={(event) => changeTextHandler(event)}
						className={`${classes.body} ${shared_classes.textarea}`}
					></textarea>
					<button
						onClick={editContentHandler}
						disabled={enteredText.length === 0}
						className={shared_classes.button}
					>
						Update
					</button>
				</>
			) : props.type === "comment" ? (
				<p className={`${shared_classes.text} ${classes.body}`}>{props.data.content}</p>
			) : (
				<p className={`${shared_classes.text} ${classes.body}`}>
					<span className={classes.reply_tag}>{`@${props.replyingTo} `}</span>
					{props.data.content}
				</p>
			)}
		</>
	);
};

export default Content;

import { useDispatch } from "react-redux";
import classes from "./ScoreCounter.module.css";
import { voteComment } from "@/store/commentsSlice";
import { CommentType, ReplyType } from "@/models/types";

const ScoreCounter: React.FC<{
	type: "comment" | "reply";
	data: any;
	parentComment?: CommentType;
}> = (props) => {
	const dispatch = useDispatch();

	const vote = async (voteType: "upvote" | "downvote") => {
		dispatch(voteComment({ type: props.type, id: props.data.id, voteType: voteType }));

		let updatedComment: CommentType;

		if (props.type === "comment") {
			updatedComment = { ...props.data };
			updatedComment.score += voteType === "upvote" ? 1 : -1;
		} else {
			const parentComment = { ...props.parentComment! };
			const replyIndex = parentComment.replies.findIndex(
				(reply) => reply.id === props.data.id
			);
			const updatedReply = {
				...parentComment.replies[replyIndex],
				score: parentComment.replies[replyIndex].score + (voteType === "upvote" ? 1 : -1)
			};
			const updatedReplies = [
				...parentComment.replies.slice(0, replyIndex),
				updatedReply,
				...parentComment.replies.slice(replyIndex + 1)
			];
			updatedComment = { ...parentComment, replies: updatedReplies };
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
		<div className={classes.score_counter}>
			<button onClick={() => vote("upvote")}>
				<svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
						fill="#C5C6EF"
					/>
				</svg>
			</button>
			<span>{props.data.score}</span>
			<button onClick={() => vote("downvote")}>
				<svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
						fill="#C5C6EF"
					/>
				</svg>
			</button>
		</div>
	);
};

export default ScoreCounter;

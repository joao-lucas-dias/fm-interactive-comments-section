import { CommentType, Reply, User } from "@/models/types";
import Container from "../UI/Container";
import IconButton from "../UI/IconButton";

import classes from "./Comment.module.css";
import ScoreCounter from "./ScoreCounter/ScoreCounter";
import Header from "./Header/Header";
import Actions from "./Actions/Actions";

const Comment: React.FC<{
	type: "comment" | "reply";
	data: any;
	parentComment: CommentType;
	loggedInUser: string;
}> = (props) => {
	const user: User = props.data.user;
	const replyingTo: string = props.data.replyingTo;
	const { createdAt, content, score } = props.data;

	return (
		<li className={classes.wrapper}>
			<Container>
				<Header user={user} loggedInUser={props.loggedInUser} createdAt={createdAt} />
				<div className={classes.body}>
					{props.type === "reply" && (
						<span className={classes.reply_tag}>{`@${replyingTo} `}</span>
					)}
					<span className={classes.content}>{content}</span>
				</div>
				<ScoreCounter type={props.type} data={props.data} />
				<Actions commentType={props.type} parentComment={props.type === "reply" ? props.parentComment : null} user={user} loggedInUser={props.loggedInUser} data={props.data} />
			</Container>
			{props.data.replies && props.data.replies.length > 0 && (
				<ul key={`${props.data.id}_replies`} className={classes.replies_list}>
					{props.data.replies.map((reply: Reply) => (
						<Comment
							key={reply.id}
							type="reply"
							parentComment={props.parentComment}
							data={reply}
							loggedInUser={props.loggedInUser}
						/>
					))}
				</ul>
			)}
		</li>
	);
};

export default Comment;

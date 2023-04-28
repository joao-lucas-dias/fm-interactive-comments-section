import { CommentType, ReplyType, User } from "@/models/types";
import Container from "../UI/Container";

import classes from "./Comment.module.css";
import ScoreCounter from "./ScoreCounter/ScoreCounter";
import Header from "./Header/Header";
import Actions from "./Actions/Actions";
import Reply from "./Reply/Reply";

const Comment: React.FC<{
	commentData: any;
	parentComment: CommentType;
	loggedInUser: string;
}> = (props) => {
	const user: User = props.commentData.user;
	const { createdAt, content, score } = props.commentData;

	return (
		<li className={classes.wrapper}>
			<Container>
				<Header user={user} loggedInUser={props.loggedInUser} createdAt={createdAt} />
				<div className={classes.body}>
					<span>{content}</span>
				</div>
				<ScoreCounter type="comment" data={props.commentData} />
				<Actions
					type="comment"
					parentComment={props.parentComment}
					user={user}
					loggedInUser={props.loggedInUser}
					id={props.commentData.id}
				/>
			</Container>
			{props.commentData.replies && props.commentData.replies.length > 0 && (
				<ul key={`${props.commentData.id}_replies`} className={classes.replies_list}>
					{props.commentData.replies.map((reply: ReplyType) => (
						<Reply
							key={reply.id}
							parentComment={props.parentComment}
							replyData={reply}
							loggedInUser={props.loggedInUser}
						/>
					))}
				</ul>
			)}
		</li>
	);
};

export default Comment;

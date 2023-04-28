import Container from "@/components/UI/Container";
import classes from "./Reply.module.css";
import Header from "../Shared/Header/Header";
import { CommentType, ReplyType, User } from "@/models/types";
import ScoreCounter from "../Shared/ScoreCounter/ScoreCounter";
import Actions from "../Shared/Actions/Actions";
import { useState } from "react";
import AddReply from "./AddReply";

const Reply: React.FC<{
	loggedInUser: User;
	parentComment: CommentType;
	replyData: ReplyType;
}> = (props) => {
	const [replying, setReplying] = useState(false);

	const { user, content, replyingTo, createdAt } = props.replyData;

	return (
		<li className={classes.replying}>
			<Container>
				<Header
					loggedInUser={props.loggedInUser.username}
					user={user}
					createdAt={createdAt}
				/>
				<p className={classes.body}>
					<span className={classes.reply_tag}>{`@${replyingTo} `}</span>
					{content}
				</p>
				<ScoreCounter
					type="reply"
					data={props.replyData}
					parentComment={props.parentComment}
				/>
				<Actions
					type="reply"
					data={props.replyData}
					loggedInUser={props.loggedInUser.username}
					parentComment={props.parentComment}
					onReplyClick={() => setReplying(true)}
				/>
			</Container>
			{replying && (
				<AddReply
					loggedinUser={props.loggedInUser}
					parentComment={props.parentComment}
					replyingTo={user.username}
					onReplyAdded={() => setReplying(false)}
				/>
			)}
		</li>
	);
};

export default Reply;

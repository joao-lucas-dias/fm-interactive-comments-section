import Container from "@/components/UI/Container";
import Header from "../Shared/Header/Header";
import { CommentType, ReplyType, User } from "@/models/types";
import ScoreCounter from "../Shared/ScoreCounter/ScoreCounter";
import Actions from "../Shared/Actions/Actions";
import { useState } from "react";
import AddReply from "./AddReply";
import Content from "../Shared/Content/Content";

import classes from "./Reply.module.css";

const Reply: React.FC<{
	loggedInUser: User;
	replyData: ReplyType;
}> = (props) => {
	const [replying, setReplying] = useState(false);
	const [editing, setEditing] = useState(false);

	const { user, content, replyingTo, createdAt, parentComment } = props.replyData;

	return (
		<li className={classes.replying}>
			<Container>
				<Header
					loggedInUser={props.loggedInUser.username}
					user={user}
					createdAt={createdAt}
				/>
				<Content
					type="reply"
					editing={editing}
					data={props.replyData}
					parentComment={parentComment}
					replyingTo={replyingTo}
					onContentUpdated={() => setEditing(false)}
				/>
				<ScoreCounter
					type="reply"
					data={props.replyData}
					parentComment={parentComment}
				/>
				{!editing && !replying && (
					<Actions
						type="reply"
						data={props.replyData}
						loggedInUser={props.loggedInUser.username}
						parentComment={parentComment}
						onReplyClick={() => setReplying(true)}
						onEditClick={() => setEditing(true)}
					/>
				)}
			</Container>
			{replying && (
				<AddReply
					loggedinUser={props.loggedInUser}
					parentComment={parentComment}
					replyingTo={replyingTo}
					onReplyAdded={() => setReplying(false)}
				/>
			)}
		</li>
	);
};

export default Reply;

import { CommentType, User } from "@/models/types";
import Container from "../UI/Container";
import ScoreCounter from "../Shared/ScoreCounter/ScoreCounter";
import Header from "../Shared/Header/Header";
import Actions from "../Shared/Actions/Actions";
import Reply from "../Reply/Reply";
import { useState } from "react";
import AddReply from "../Reply/AddReply";

import classes from "./Comment.module.css";
import Content from "../Shared/Content/Content";

const Comment: React.FC<{
	commentData: CommentType;
	loggedInUser: User;
}> = (props) => {
	const [replying, setReplying] = useState(false);
	const [editing, setEditing] = useState(false);

	const { id, user, createdAt, content, replies } = props.commentData;

	return (
		<li className={classes.wrapper}>
			<div className={classes.replying}>
				<Container>
					<Header
						user={user}
						loggedInUser={props.loggedInUser.username}
						createdAt={createdAt}
					/>
					<Content
						type="comment"
						editing={editing}
						data={props.commentData}
						replyingTo={user.username}
						onContentUpdated={() => setEditing(false)}
					/>
					<ScoreCounter type="comment" data={props.commentData} />
					{!editing && !replying && (
						<Actions
							type="comment"
							data={props.commentData}
							loggedInUser={props.loggedInUser.username}
							onReplyClick={() => setReplying(true)}
							onEditClick={() => setEditing(true)}
						/>
					)}
				</Container>
				{replying && (
					<AddReply
						loggedinUser={props.loggedInUser}
						parentComment={props.commentData}
						replyingTo={user.username}
						onReplyAdded={() => setReplying(false)}
					/>
				)}
			</div>
			{props.commentData.replies.length > 0 && (
				<ul key={`${id}_replies`} className={classes.replies_list}>
					{replies.map((reply) => (
						<Reply
							key={reply.id}
							loggedInUser={props.loggedInUser}
							replyData={reply}
						/>
					))}
				</ul>
			)}
		</li>
	);
};

export default Comment;

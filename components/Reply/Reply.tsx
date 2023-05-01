import Container from "@/components/UI/Container";
import Header from "../Shared/Header/Header";
import { CommentType, ReplyType, User } from "@/models/types";
import ScoreCounter from "../Shared/ScoreCounter/ScoreCounter";
import Actions from "../Shared/Actions/Actions";
import { useState } from "react";
import AddReply from "./AddReply";
import Content from "../Shared/Content/Content";
import { useDispatch } from "react-redux";
import { deleteAction } from "@/store/commentsSlice";
import Modal from "../UI/Modal";

import shared_classes from "../../styles/shared.module.css";

const Reply: React.FC<{
	loggedInUser: User;
	replyData: ReplyType;
	parentComment: CommentType;
}> = (props) => {
	const dispatch = useDispatch();
	const [replying, setReplying] = useState(false);
	const [editing, setEditing] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { id, user, replyingTo, createdAt } = props.replyData;

	const deleteReplyHandler = async () => {
		dispatch(deleteAction({ id: id, type: "reply" }));

		const reqBody = {
			updateType: "delete_reply",
			commentId: props.parentComment.id,
			replyId: id
		};

		const response = await fetch("/api/comments", {
			method: "PUT",
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json();
	};

	return (
		<>
			<Modal
				isOpen={showDeleteModal}
				type="comment"
				onClose={() => setShowDeleteModal(false)}
				onConfirmDelete={deleteReplyHandler}
			/>
			<li className={shared_classes.replying}>
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
						parentComment={props.parentComment}
						replyingTo={replyingTo}
						onContentUpdated={() => setEditing(false)}
					/>
					<ScoreCounter
						type="reply"
						data={props.replyData}
						parentComment={props.parentComment}
					/>
					{!editing && !replying && (
						<Actions
							type="reply"
							data={props.replyData}
							loggedInUser={props.loggedInUser.username}
							parentComment={props.parentComment}
							onReplyClick={() => setReplying(true)}
							onEditClick={() => setEditing(true)}
							onDeleteClick={() => setShowDeleteModal(true)}
						/>
					)}
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
		</>
	);
};

export default Reply;

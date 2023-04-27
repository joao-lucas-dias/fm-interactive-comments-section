import { Reply, User } from "@/models/types";
import Container from "../UI/Container";
import Image from "next/image";
import IconButton from "../UI/IconButton";

import classes from "./Comment.module.css";
import ScoreCounter from "./ScoreCounter/ScoreCounter";

const Comment: React.FC<{
	type: "comment" | "reply";
	data: any;
	loggedInUser: string;
}> = (props) => {
	const user: User = props.data.user;
	const replyingTo: string = props.data.replyingTo;
	const { createdAt, content, score } = props.data;

	return (
		<li className={classes.wrapper}>
			<Container>
				<div className={classes.header}>
					<Image
						src={user.image.webp}
						alt="User profile picture."
						className={classes.image}
						width={2000}
						height={2000}
					/>
					<span className={classes.user}>
						<span className={classes.user_name}>{user.username}</span>
						{props.loggedInUser === user.username && (
							<span className={classes.tag}>You</span>
						)}
					</span>
					<span className={classes.created_at}>{createdAt}</span>
				</div>
				<div className={classes.body}>
					{props.type === "reply" && (
						<span className={classes.reply_tag}>{`@${replyingTo} `}</span>
					)}
					<span className={classes.content}>{content}</span>
				</div>
				<ScoreCounter type={props.type} data={props.data} />
				<div className={classes.actions}>
					{props.loggedInUser === user.username ? (
						<>
							<IconButton type="delete" />
							<IconButton type="edit" />
						</>
					) : (
						<IconButton type="reply" />
					)}
				</div>
			</Container>
			{props.data.replies && props.data.replies.length > 0 && (
				<ul key={`${props.data.id}_replies`} className={classes.replies_list}>
					{props.data.replies.map((reply: Reply) => (
						<Comment
							key={reply.id}
							type="reply"
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

import { User } from "@/models/types";
import Container from "../UI/Container";
import Image from "next/image";
import IconButton from "../UI/IconButton";

import classes from "./Comment.module.css";
import ScoreCounter from "./ScoreCounter/ScoreCounter";

const Comment: React.FC<{
	type: "comment" | "reply";
	data: any;
	loggedinUser: string;
}> = (props) => {
	const user: User = props.data.user;
	const replyingTo: string = props.data.replyingTo;
	const { createdAt, content, score } = props.data;

	return (
		<li>
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
						{props.loggedinUser === user.username && (
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
				<ScoreCounter />
				<div className={classes.actions}>
					{props.loggedinUser === user.username ? (
						<>
							<IconButton type="delete" />
							<IconButton type="edit" />
						</>
					) : (
						<IconButton type="reply" />
					)}
				</div>
			</Container>
		</li>
	);
};

export default Comment;

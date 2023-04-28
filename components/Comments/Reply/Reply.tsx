import Container from "@/components/UI/Container";
import classes from "./Reply.module.css";
import Header from "../Header/Header";
import { CommentType, User } from "@/models/types";
import { Reply } from "@/models/types";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
import Actions from "../Actions/Actions";

const Reply: React.FC<{
	loggedInUser: string;
	parentComment: CommentType;
	replyData: Reply;
}> = (props) => {
	const { user, content, replyingTo, createdAt } = props.replyData;

	return (
		<li>
			<Container>
				<Header loggedInUser={props.loggedInUser} user={user} createdAt={createdAt} />
				<div className={classes.body}>
					<span className={classes.reply_tag}>{`@${replyingTo} `}</span>
					<span>{content}</span>
				</div>
				<ScoreCounter type="reply" data={props.replyData} parentComment={props.parentComment} />
				<Actions
					type="reply"
					parentComment={props.parentComment}
					user={user}
					loggedInUser={props.loggedInUser}
					id={props.replyData.id}
				/>
			</Container>
		</li>
	);
};

export default Reply;

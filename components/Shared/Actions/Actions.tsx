import IconButton from "@/components/UI/IconButton";
import { CommentType } from "@/models/types";

import classes from "./Actions.module.css";

const Actions: React.FC<{
	type: "comment" | "reply";
	data: any;
	loggedInUser: string;
	parentComment?: CommentType;
	onReplyClick: () => void;
	onEditClick: () => void;
	onDeleteClick: () => void;
}> = (props) => {
	return (
		<div className={classes.actions}>
			{props.loggedInUser === props.data.user.username ? (
				<>
					<IconButton type="delete" onClick={props.onDeleteClick} />
					<IconButton type="edit" onClick={props.onEditClick} />
				</>
			) : (
				<IconButton type="reply" onClick={props.onReplyClick} />
			)}
		</div>
	);
};

export default Actions;

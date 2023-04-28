import { CommentType, User } from "@/models/types";
import Comment from "./Comment";

import classes from "./CommentsList.module.css";

const CommentsList: React.FC<{ comments: CommentType[]; loggedInUser: User }> = (
	props
) => {
	return (
		<ul className={classes.comments_list}>
			{props.comments.map((comment) => (
				<Comment
					key={comment.id}
					commentData={comment}
					loggedInUser={props.loggedInUser}
				/>
			))}
		</ul>
	);
};

export default CommentsList;

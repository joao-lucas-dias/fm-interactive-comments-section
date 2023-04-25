import { CommentType } from "@/models/types";
import Comment from "./Comment";

import classes from "./CommentsList.module.css";

const CommentsList: React.FC<{ comments: CommentType[]; loggedInUser: string }> = (
	props
) => {
	return (
		<ul className={classes.comments_list}>
			{props.comments.map((comment) => (
				<>
					<Comment
						key={comment.id}
						type="comment"
						data={comment}
						loggedInUser={props.loggedInUser}
					/>
				</>
			))}
		</ul>
	);
};

export default CommentsList;

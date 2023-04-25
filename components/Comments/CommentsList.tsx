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
						loggedinUser={props.loggedInUser}
					/>
					{comment.replies.length > 0 && (
						<ul className={classes.replies_list}>
							{comment.replies.map((reply) => (
								<Comment
									key={reply.id}
									type="reply"
									data={reply}
									loggedinUser={props.loggedInUser}
								/>
							))}
						</ul>
					)}
				</>
			))}
		</ul>
	);
};

export default CommentsList;

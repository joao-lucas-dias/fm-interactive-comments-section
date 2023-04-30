import { CommentType, User } from "@/models/types";
import Comment from "./Comment";

const CommentsList: React.FC<{
	comments: CommentType[];
	loggedInUser: User;
}> = (props) => {
	return (
		<ul style={{ display: "grid", rowGap: "1em", listStyle: "none" }}>
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

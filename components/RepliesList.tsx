import { Reply } from "@/models/types";
import Comment from "./Comment";

import classes from "./RepliesList.module.css";

const RepliesList: React.FC<{ replies: Reply[] }> = (props) => {
	return (
		<ul className={classes.replies_list}>
			{props.replies.map((reply: Reply) => (
				<Comment
					key={reply.id}
					type="reply"
					data={reply}
					loggedinUser={props.loggedinUser}
				/>
			))}
		</ul>
	);
};

export default RepliesList;

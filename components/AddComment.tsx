import Image from "next/image";
import Container from "./UI/Container";
import { User } from "@/models/types";

import classes from "./AddComment.module.css";

const AddComment: React.FC<{ loggedinUser: User; type: string }> = (props) => {
	return (
		<Container>
			<textarea placeholder="Add a comment..." className={classes.textarea}></textarea>
			<Image
				src={props.loggedinUser.image.webp}
				alt="User profile picture."
				className={classes.image}
				width={2000}
				height={2000}
			/>
			<button className={classes.button}>
				{props.type === "comment" ? "Send" : "Reply"}
			</button>
		</Container>
	);
};

export default AddComment;

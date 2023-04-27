import Image from "next/image";
import { User } from "@/models/types";

import classes from "./Header.module.css";

const Header: React.FC<{ user: User; loggedInUser: string; createdAt: string }> = (
	props
) => {
	return (
		<div className={classes.header}>
			<Image
				src={props.user.image.webp}
				alt="User profile picture."
				className={classes.image}
				width={2000}
				height={2000}
			/>
			<span className={classes.user}>
				<span className={classes.user_name}>{props.user.username}</span>
				{props.loggedInUser === props.user.username && (
					<span className={classes.tag}>You</span>
				)}
			</span>
			<span className={classes.created_at}>{props.createdAt}</span>
		</div>
	);
};

export default Header;

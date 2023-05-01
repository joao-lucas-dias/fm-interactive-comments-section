import Image from "next/image";
import { User } from "@/models/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import classes from "./Header.module.css";
import shared_classes from "../../../styles/shared.module.css";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years"
  }
})

const Header: React.FC<{ user: User; loggedInUser: string; createdAt: string }> = (
	props
) => {
	const datePosted = new Date(props.createdAt);
	const relativeTime = dayjs(datePosted).fromNow();

	return (
		<div className={classes.header}>
			<Image
				src={props.user.image.webp}
				alt="User profile picture."
				className={shared_classes.image}
				width={2000}
				height={2000}
			/>
			<span className={classes.user}>
				<span className={classes.user_name}>{props.user.username}</span>
				{props.loggedInUser === props.user.username && (
					<span className={classes.tag}>You</span>
				)}
			</span>
			<span className={classes.created_at}>{relativeTime}</span>
		</div>
	);
};

export default Header;

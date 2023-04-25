import Head from "next/head";
import { GetStaticProps } from "next";
import { MongoClient } from "mongodb";
import { CommentType, User } from "@/models/types";
import AddComment from "@/components/AddComment";
import Comment from "../components/Comments/Comment";

import classes from "../styles/HomePage.module.css";

const LOGGEDIN_USER: User = {
	image: {
		png: "/images/avatars/image-juliusomo.png",
		webp: "/images/avatars/image-juliusomo.webp"
	},
	username: "juliusomo"
};

const HomePage: React.FC<{ comments: CommentType[] }> = (props) => {
	const sortedComments: CommentType[] = props.comments.sort(
		(comment1: CommentType, comment2: CommentType) => comment2.score - comment1.score
	);

	return (
		<>
			<Head>
				<title>FM - Interactive Comments Section</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/favicon-32x32.png" />
			</Head>
			<main className={classes.app}>
				<ul className={classes.comments_list}>
					{sortedComments.map((comment) => (
						<>
							<Comment
								key={comment.id}
								type="comment"
								data={comment}
								loggedinUser={LOGGEDIN_USER.username}
							/>
							{comment.replies.length > 0 && (
								<ul className={classes.replies_list}>
									{comment.replies.map((reply) => (
										<Comment
											key={reply.id}
											type="reply"
											data={reply}
											loggedinUser={LOGGEDIN_USER.username}
										/>
									))}
								</ul>
							)}
						</>
					))}
				</ul>
				<AddComment loggedinUser={LOGGEDIN_USER} type="comment" />
			</main>
			<footer style={{ marginTop: "2em", color: "black" }}>
				Challenge by{" "}
				<a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
					Frontend Mentor
				</a>
				. Coded by{" "}
				<a href="#" target="_blank">
					João Lucas Dias
				</a>
				.
			</footer>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const MONGODB_URI = process.env.MONGODB_URI!;

	const client = await MongoClient.connect(MONGODB_URI);

	const db = client.db("interactive-comments-section");

	const dataCollection = db.collection("comments");

	const data = await dataCollection.find().toArray();

	const comments: CommentType[] = data.map((comment) => {
		return {
			id: comment._id.toString(),
			user: comment.user,
			createdAt: comment.createdAt,
			content: comment.content,
			replies: comment.replies,
			score: comment.score
		};
	});

	client.close();

	return {
		props: {
			comments: comments
		}
	};
};

export default HomePage;

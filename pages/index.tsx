import Head from "next/head";
import { GetStaticProps } from "next";
import { MongoClient } from "mongodb";
import Comment from "@/models/types";

import classes from "../styles/HomePage.module.css";
import Container from "@/components/UI/Container";

const HomePage: React.FC<{ comments: Comment[] }> = (props) => {
	return (
		<>
			<Head>
				<title>FM - Interactive Comments Section</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/favicon-32x32.png" />
			</Head>
			<main className={classes.app}>
				<ul className={classes.comments_list}>
					{props.comments.map((comment) => (
						<li key={comment.id}>
							<Container>
								<p>{comment.user.username}</p>
								<p>{comment.content}</p>
							</Container>
						</li>
					))}
				</ul>
			</main>
			<footer style={{marginTop: "2em", color: "black"}}>
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

	const comments: Comment[] = data.map((comment) => {
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

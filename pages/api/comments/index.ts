import { ReplyType } from "@/models/types";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URI!);
	const db = mongoClient.db("interactive-comments-section");
	const commentsCollection = db.collection("comments");

	if (req.method === "POST") {
		const comment = req.body;

		const result = await commentsCollection.insertOne(comment);

		res
			.status(200)
			.json({ commentId: result.insertedId, message: "Comment added successfully!" });
	} else if (req.method === "PUT") {
		let replyId: string;
		let updatedContent: string;
		let voteType: "inc" | "dec";
		const commentId: ObjectId = new ObjectId(req.body.commentId);

		switch (req.body.updateType) {
			case "add_reply":
				const newReply: ReplyType = req.body.newReply;

				await commentsCollection.updateOne(
					{ _id: commentId },
					{ $push: { replies: newReply } }
				);

				res.status(201).json({ message: "Reply added successfully!" });

				break;
			case "delete_reply":
				replyId = req.body.replyId;

				await commentsCollection.updateOne(
					{ _id: commentId },
					{ $pull: { replies: { id: replyId } } }
				);

				res.status(201).json({ message: "Reply deleted successfully!" });

				break;
			case "edit_comment":
				updatedContent = req.body.updatedContent;

				await commentsCollection.updateOne(
					{ _id: commentId },
					{ $set: { content: updatedContent } }
				);

				res.status(201).json({ message: "Comment edited successfully!" });

				break;
			case "edit_reply":
				replyId = req.body.replyId;
				updatedContent = req.body.updatedContent;

				await commentsCollection.updateOne(
					{ _id: commentId },
					{ $set: { "replies.$[reply].content": updatedContent } },
					{ arrayFilters: [{ "reply.id": replyId }] }
				);

				res.status(201).json({ message: "Reply edited successfully!" });

				break;
			case "vote_comment":
				voteType = req.body.voteType;

				await commentsCollection.updateOne(
					{ _id: commentId },
					{ $inc: { score: voteType === "inc" ? 1 : -1 } }
				);

				res.status(201).json({ message: "Comment voted successfully!" });

				break;
			case "vote_reply":
				replyId = req.body.replyId;
				voteType = req.body.voteType;

				await commentsCollection.updateOne(
					{ _id: commentId },
					{ $inc: { "replies.$[reply].score": voteType === "inc" ? 1 : -1 } },
					{ arrayFilters: [{ "reply.id": replyId }] }
				);

				res.status(201).json({ message: "Reply voted successfully!" });

				break;
		}
	}

	mongoClient.close();
};

export default handler;

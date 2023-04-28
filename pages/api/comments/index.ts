import { CommentType } from "@/models/types";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// POST /api/comments
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URI!);
	const db = mongoClient.db("interactive-comments-section");
	const commentsCollection = db.collection("comments");

	if (req.method === "POST") {
		const comment = req.body;

		const result = await commentsCollection.insertOne(comment);
		
		res.status(200).json({ commentId: result.insertedId, message: "Comment added successfully!" });
	} else if (req.method === "PUT") {
		const updatedComment: CommentType = req.body;

		const result = await commentsCollection.replaceOne(
			{ _id: { $eq: new ObjectId(updatedComment.id) } },
			updatedComment
		);

		res.status(201).json({ message: "Comment updated successfully!" });
	}

	mongoClient.close();
};

export default handler;

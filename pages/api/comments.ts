import { CommentType } from "@/models/types";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// POST /api/comments
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const MONGODB_URI = process.env.MONGODB_URI!;

	const mongoClient = await MongoClient.connect(MONGODB_URI);
  const db = mongoClient.db("interactive-comments-section");

  const commentsCollection = db.collection('comments');

  if (req.method === 'POST') {
    const comment = req.body;
    const result = await commentsCollection.insertOne(comment);
    console.log(result);
  } else if (req.method === 'PUT') {
    const updatedComment: CommentType = req.body;
    const result = await commentsCollection.replaceOne({ _id: { $eq: new ObjectId(updatedComment.id) } }, updatedComment);
    console.log(result);
    res.status(201).json({ message: 'Comment updated successfully!'});
  } else if (req.method === 'DELETE') {

  }

  mongoClient.close();
};

export default handler;
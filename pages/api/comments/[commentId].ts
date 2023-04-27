import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const mongoClient = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = mongoClient.db("interactive-comments-section");
  const commentsCollection = db.collection('comments');
  
  if (req.method === 'DELETE') {
    const commentId = req.query.commentId?.toString();

    const result = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });
    res.status(200).json({ message: 'Comment deleted successfully!'});
  }
}

export default handler;
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// POST /api/orders
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const comment = req.body;

  const MONGODB_URI = process.env.MONGODB_URI!;

	const mongoClient = await MongoClient.connect(MONGODB_URI);
  const db = mongoClient.db("interactive-comments-section");

  const ordersCollection = db.collection('comments');
  const result = await ordersCollection.insertOne(comment);

  mongoClient.close();

  res.status(201).json({ message: 'Order registered successfully!'});
};

export default handler;
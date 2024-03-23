import { NextApiRequest, NextApiResponse } from "next/types";
import { databases } from "../../lib/appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const documentID = req.query.documentID;

    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      documentID as string,
      { watched: true }
    );
    res.status(200).json({ data: response });
  } catch (error) {}
}

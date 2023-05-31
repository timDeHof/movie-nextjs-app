import { NextApiRequest, NextApiResponse } from "next/types";
import { databases } from "../../../lib/appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const documentID = req.query.documentID;

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      documentID as string,
    );
    res.status(200).json({ data: "success" });
  } catch (e) {
    res.status(500).json({ data: e });
  }
}

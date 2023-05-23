import { NextApiRequest, NextApiResponse } from "next/types";
import { client, databases } from "../../lib/appwrite";
import { Query } from "appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const limit: any = parseInt(req.query.limit);
    const offset: any = parseInt(req.query.offset);

    let response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [Query.limit(limit), Query.offset(offset)],
    );
    // console.log(response.total);
    res.status(200).json({ data: response, count: response.total });
  } catch (e) {
    res.status(500).json({ data: e });
  }
}

import { NextApiRequest, NextApiResponse } from "next/types";
import Appwrite from "node-appwrite";
import { initAppwrite } from "../../lib/appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let sdk = initAppwrite();
    let database = new Appwrite.Databases(sdk);

    const limit: any = req.query.limit;
    const offset: any = req.query.offset;

    let response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [],
      // limit,
      // offset,
    );
    console.log(response.total);
    res.status(200).json({ data: response, count: response.total });
  } catch (e) {
    res.status(500).json({ data: e });
  }
}

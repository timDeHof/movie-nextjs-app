import { NextApiRequest, NextApiResponse } from 'next/types';
import { Query } from 'appwrite';

import { databases } from '@/lib/appwrite';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const limit: number = parseInt(req.query.limit as string);
    const offsetParam: string | string[] | undefined = req.query.offset;
    const offset: number =
      typeof offsetParam === 'string' ? parseInt(offsetParam) : 0;

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [Query.limit(limit), Query.offset(offset)],
    );
    res.status(200).json({ data: response, count: response.total });
  } catch (e) {
    res.status(500).json({ data: e });
  }
}

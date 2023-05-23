// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases, ID } from "appwrite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Your project ID;
  let database = new Databases(client);
  const response = await axios(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.query.page}`,
  );
  const data = await response.data;
  console.log("data: ", data);
  try {
    for (let i = 0; i < data.results.length; i++) {
      const item = data.results[i];
      let promise = await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        ID.unique(),
        {
          movie_id: item.id,
          title: item.title,
          thumbnail_image: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
          popularity: item.popularity,
          release_date: item.release_date,
          vote_average: item.vote_average,
        },
      );

      console.log(promise);
    }
    res.status(200).json({ data: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "NOT OK" });
  }
}

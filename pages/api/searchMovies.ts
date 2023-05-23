import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { client, databases } from "../../lib/appwrite";
import Appwrite, { Query } from "node-appwrite";
import { v4 as uuidv4 } from "uuid";

type Data = {
  data?: any;
  id?: number;
};
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const query = req.query.query;

    const response = await axios(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US&page=1`,
    );
    const data = await response.data;
    // console.log("data:", data);
    if (data.results.length > 0) {
      const movies = data.results;
      // console.log("movies:", movies);
      return res.status(200).json({ data: movies });
    } else {
      console.log("it is not a movie");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: e });
  }
};

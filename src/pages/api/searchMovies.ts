import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  data?: any;
  id?: number;
};
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const query = req.query.query;
    const currentPage = req.query.currentPage;

    const response = await axios(
      `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US&page=${currentPage}&query=${query}`,
    );
    const data = await response.data;
    console.log("response:", data);
    if (data.results.length > 0) {
      const movies = data.results;
      const totalPages = data.total_pages;
      const totalResults = data.total_results;
      return res.status(200).json({
        data: {
          results: movies,
          totalPages: totalPages,
          totalResults: totalResults,
        },
      });
    } else {
      console.log("it is not a movie");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: e });
  }
};

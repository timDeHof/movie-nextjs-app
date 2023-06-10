import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { TMDB_URL } from "src/config/routes";
import { SearchResult } from "@typings/search.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>
) {
  try {
    const query = req.query.query;
    const currentPage = req.query.currentPage;

    const response = await axios(
      `${TMDB_URL}&page=${currentPage}&query=${query}`
    );
    const data = await response.data;
    console.log("response:", data);
    if (data.results.length > 0) {
      const movies = data.results;
      const total_pages = data.total_pages;
      const total_results = data.total_results;
      return res.status(200).json({
        results: movies,
        meta: {
          totalPages: total_pages,
          totalResults: total_results,
        },
      });
    } else {
      console.log("it is not a movie");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ results: [], meta: { totalPages: 0, totalResults: 0 } });
  }
}

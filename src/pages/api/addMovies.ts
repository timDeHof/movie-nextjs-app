import type { NextApiRequest, NextApiResponse } from 'next';
import { Query } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';

import { databases } from '../../lib/appwrite';

type Data = {
  data?: string;
  id: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const movieID = req.query.movieID;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&language=en-US`,
    );
    const data = await response.json();
    console.log('data in addMovies:', data);
    console.log(Object.keys(data).length);
    if (Object.keys(data).length > 0) {
      const id = data.id;
      const item = data;

      const movieInDatabase = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        [Query.equal('movie_id', id)],
      );

      if (movieInDatabase.documents.length > 0) {
        // there are movies present in the database;
        return res.status(409).json({ data: 'Movie already exists', id });
      } else {
        // add the movie to the database
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
          uuidv4(),
          {
            movie_id: id,
            title: item.title,
            thumbnail_image: item.poster_path,
            popularity: item.popularity,
            release_date: item.release_date,
            vote_average: item.vote_average,
            watched: false,
            runtime: item.runtime,
          },
        );

        return res.status(200).json({ id });
      }
    } else {
      console.log('it is not a movie');
    }
  } catch (e) {
    if (typeof e === 'string') {
      console.log(e);
      res.status(500).json({ id: 0, data: e });
    } else {
      console.log(e);
      res.status(500).json({ id: 0, data: 'An unknown error occurred' });
    }
  }
}

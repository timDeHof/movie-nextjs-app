// Import the required modules that are needed for displaying the movie list and pagination.
import React, { memo, useEffect, useState } from 'react';
import { Movies } from '@/typings/search.types';
import axios from 'axios';

import Layout from '@/components/layout';
import MovieCard from '@/components/movieCard';

const API_URL = `https://api.themoviedb.org/3/movie/popular?&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US&page=1`;

// Define the Home component as a functional React component with NextJS's 'NextPage' type.
const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movies[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios(API_URL);
      const recentMovies = await response.data.results.slice(-4);
      setPopularMovies(recentMovies);
    };

    fetchMovies();
  }, []);

  return (
    <Layout>
      <div className="flex h-screen w-full flex-1 flex-col items-center text-center lg:px-20">
        <h1 className="text-4xl font-bold lg:text-6xl">Welcome to ReelWatch</h1>
        <p className="my-3 text-2xl">
          Keep track of your favorite movies and discover new ones.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
          {popularMovies.map((movie: Movies) => (
            <MemoizedMovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const MemoizedMovieCard = memo(MovieCard);

export default Home;

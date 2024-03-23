// Import the required modules that are needed for displaying the movie list and pagination.
import axios from "axios";
import Layout from "src/components/layout";
import React, { memo } from "react";
import { Movies } from "@typings/search.types";
import MovieCard from "@components/movieCard";

const API_URL = `https://api.themoviedb.org/3/movie/popular?&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US&page=1`;
interface MovieProps {
  movies: Movies[];
}
// Define the Home component as a functional React component with NextJS's 'NextPage' type.
const Home = ({ movies }: MovieProps) => {
  return (
    <Layout>
      <div className='flex flex-col items-center flex-1 w-full h-screen text-center lg:px-20'>
        <h1 className='text-4xl font-bold lg:text-6xl'>Welcome to ReelWatch</h1>
        <p className='my-3 text-2xl'>
          Keep track of your favorite movies and discover new ones.
        </p>
        <div className='grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4'>
          {movies.slice(-4).map((movie: Movies) => (
            <MemoizedMovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const MemoizedMovieCard = memo(MovieCard);
export async function getServerSideProps(context: {
  query: { id: string };
}): Promise<{ props: MovieProps }> {
  try {
    const response = await axios(API_URL);
    const data = await response.data;

    return {
      props: {
        movies: data.results,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movie data");
  }
}
export default Home;

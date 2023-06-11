// Import the required modules that are needed for displaying the movie list and pagination.
import axios from "axios";
import Layout from "src/components/layout";
import React from "react";
import { Movies } from "@typings/search.types";
import MovieCard from "@components/movieCard";
interface MovieProps {
  movies: Movies[];
}
// Define the Home component as a functional React component with NextJS's 'NextPage' type.
const Home = ({ movies }: MovieProps) => {
  return (
    <Layout>
      <div className='flex h-screen w-full flex-1 flex-col items-center text-center lg:px-20'>
        <h1 className='text-4xl font-bold lg:text-6xl'>Welcome to ReelWatch</h1>
        <p className='my-3 text-2xl'>
          Keep track of your favorite movies and discover new ones.
        </p>
        <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4'>
          {movies.slice(0, 4).map((movie, id) => (
            <MovieCard movie={movie} key={id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context: {
  query: { id: string };
}): Promise<{ props: MovieProps }> {
  const { id } = context.query;
  try {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/popular?&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US&page=1`,
    );

    const data = await response.data;
    console.log(data.results);
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

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { WatchButton } from "./button";
import { useRouter } from "next/router";

type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: Number;
  };
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();
  const handleAddMovie = async () => {
    try {
      const response = await fetch(`/api/addMovies?movieID=${movie.id}`);
      const data = await response.json();
      if (response.status === 200 && data.id) {
        console.log(
          "Added the movie succesfully, redirecting to the movie page",
        );
        return router.push(`/search`);
      }
      if (response.status === 409 && data.id) {
        console.log("Movie already exists, redirecting to the movie page");
        return router.push(`/search`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='cursor-pointer'>
      <Link rel='preconnect' href={`/movie/${movie.id}`}>
        <div className='mx-2 my-2 max-w-xs overflow-hidden rounded shadow-lg'>
          <Image
            className='w-full'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={320}
            height={460}
          />
          <div className='px-6 py-4'>
            <div className='mb-2 text-xl font-bold'>{movie.title}</div>
            <p className='truncate text-base text-gray-700'>{movie.overview}</p>
          </div>
          <div className='flex justify-between px-6 pb-2 pt-4'>
            <span className='mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
              {movie.release_date}
            </span>
            <WatchButton onClick={handleAddMovie} text='watchlist' />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

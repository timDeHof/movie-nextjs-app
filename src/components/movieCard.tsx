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
    runtime: number;
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
    <div className='flex h-full max-h-[675px] flex-col'>
      <Link className='flex-1' rel='preconnect' href={`/movie/${movie.id}`}>
        <div className='grid-row-2 grid h-full max-w-xs grid-cols-1 overflow-hidden rounded shadow-lg'>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={320}
            height={460}
          />
          <div className='col-end-auto space-y-3 p-2'>
            <p className='text-md font-bold'>{movie.title}</p>
            <p className='line-clamp-3 text-xs text-gray-700'>
              {movie.overview.split(". ", 1) + "."}
            </p>
            <div
              className='flex flex-col content-end lg:flex-row
            lg:justify-between'>
              <span
                className='flex items-center justify-center rounded-lg bg-gray-200 px-2
              text-xs font-semibold text-gray-700'>
                {movie.release_date}
              </span>
              <WatchButton onClick={handleAddMovie} text='watchlist' />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

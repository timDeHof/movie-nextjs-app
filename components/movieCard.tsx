import Link from "next/link";
import React from "react";
import Image from "next/image";

type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
  };
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className='cursor-pointer'>
      <Link href={`/movie/${movie.id}`}>
        <div className='max-w-xs rounded overflow-hidden shadow-lg my-2 mx-2'>
          <Image
            className='w-full'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={320}
            height={460}
          />
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{movie.title}</div>
            <p className='text-gray-700 text-base'>{movie.overview}</p>
          </div>
          <div className='px-6 pt-4 pb-2'>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
              {movie.release_date}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

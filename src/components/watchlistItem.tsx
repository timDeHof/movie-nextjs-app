import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MovieType } from '@/typings/movie.types';
import { toHoursAndMinutes } from 'utils/helpers';

import { RemoveButton } from '@/components/button';

import { IMG_URL } from '@/config/routes';

interface WatchlistItemProps {
  handleDeleteMovie: (movie: MovieType) => Promise<void>;
  movie: MovieType;
}

function WatchlistItem(props: WatchlistItemProps) {
  const handleDelete = useCallback(() => {
    props.handleDeleteMovie(props.movie);
  }, [props.movie, props.handleDeleteMovie]);
  return (
    <div className="h-full cursor-pointer flex-col rounded ">
      <Link
        className="flex-1"
        rel="preconnect"
        href={`/movie/${props.movie.movie_id}`}
        passHref
      >
        <div className="grid max-w-sm grid-cols-1 rounded bg-white shadow-lg duration-300 ease-in-out hover:scale-105">
          <Image
            className="rounded-t-md"
            src={IMG_URL + props.movie.thumbnail_image}
            alt={`Poster for ${props.movie.title}`}
            layout="responsive"
            width={500}
            height={460}
          />
          <div className="col-end-auto space-y-3 p-2">
            <div className="w-full">
              <div className="flex w-auto flex-col">
                <div className="flex justify-between">
                  <RemoveButton onClick={handleDelete} text="watchlist" />

                  <div className="flex h-4 justify-end font-semibold">
                    <span className="text-sky-400 ">
                      {parseFloat(props.movie.vote_average)
                        .toFixed(1)
                        .toString()}
                    </span>
                    <span> /10</span>
                  </div>
                </div>
                <h3 className="m-0 table-cell text-lg text-gray-700">
                  {props.movie.title}
                </h3>
              </div>
              <div className="flex justify-between">
                <label className="mr-1 text-center font-bold text-gray-800">
                  Released
                  <p className="text-sm text-gray-500">
                    {props.movie.release_date}
                  </p>
                </label>
                <label className="mr-1 text-center font-bold text-gray-800">
                  Runtime
                  <p className="text-sm text-gray-500">
                    {toHoursAndMinutes(props.movie.runtime)}
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default WatchlistItem;

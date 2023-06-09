import type { NextPage } from "next";
import Layout from "src/components/layout";
import Pagination from "src/components/Pagination";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { RemoveButton } from "src/components/button";
import { MovieType } from "@typings/movie.types";
import noMoviesImage from "../../assets/no-movies-Icon.png";
import { useAppwrite } from "src/providers/appwriteProvider";

const Watchlist: NextPage = React.memo(() => {
  // Declare necessary state variables for handling offsets and movies.
  const [offset, setOffset] = useState(0);
  const [pageLimit] = useState(24);
  const [totalMovies, setTotalMovies] = useState(0);
  const [movies, setMovies] = useState([]);
  const { isLoggedIn } = useAppwrite();
  // Define an asynchronous function to fetch the movies data using an api endpoint.
  const fetchMovies = async (limit: number, offset: number) => {
    const response = await fetch(
      `/api/getMovies?limit=${limit}&offset=${offset}`,
    );
    const data = await response.json();
    setMovies(data?.data?.documents || []);
    setTotalMovies(data?.count || 0);
  };
  // Define a function to handle deleting a movie item.
  const handleDeleteMovie = useCallback(
    async (movie: MovieType) => {
      console.log("movie to be deleted:", movie);
      // Send a request to delete the movie by calling the corresponding api endpoint.
      const response = await fetch(`/api/deleteMovies?documentID=${movie.$id}`);
      // If the response status is successful, fetch the updated movie list.
      if (response.status === 200) {
        fetchMovies(pageLimit, offset);
      }
    },
    [pageLimit, offset],
  );

  // Implement the 'useEffect' hook to fetch the movies data after the component mounts.
  useEffect(() => {
    fetchMovies(pageLimit, offset);
  }, [pageLimit, offset]);
  // Define functions to handle the next and previous pagination events.
  const handleNextPage = useCallback(() => {
    setOffset((prevOffset) => prevOffset + pageLimit);
  }, [pageLimit]);
  function toHoursAndMinutes(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}m`;
  }
  const handlePreviousPage = useCallback(() => {
    if (offset > 0) {
      setOffset((prevOffset) => {
        return prevOffset - pageLimit;
      });
    }
  }, [offset, pageLimit]);
  if (!isLoggedIn) {
    return (
      <Layout>
        <p>Please login to view the watchlist </p>
      </Layout>
    );
  }
  // Render JSX based on conditional logic to display when there are no movies in the Watchlist.
  return (
    <Layout>
      {movies.length === 0 ? (
        <div className='flex flex-col items-center justify-center space-y-4 text-xl text-gray-300 opacity-50'>
          <p className=''>Your watchlist looks empty.</p>
          <Image src={noMoviesImage} alt='no movies icon'></Image>
          <p>
            {" "}
            Head over to{" "}
            <Link className=' text-sky-600' href={"/search"}>
              {" "}
              Find Movies{" "}
            </Link>{" "}
          </p>
        </div>
      ) : (
        <>
          {/* Render JSX to display the list of movies */}
          <section className='body-font pb-4 text-gray-600'>
            <div className='mt-6 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16'>
              {movies.map((movie: MovieType) => {
                return (
                  <div
                    className='cursor-pointer rounded-md bg-white drop-shadow-xl'
                    key={movie.$id}>
                    <div className='group relative'>
                      <Link rel='preconnect' href={`/movie/${movie.movie_id}`}>
                        <div className='lg:aspect-1 aspect-h-1 aspect-w-1 min-h-fit w-full overflow-clip rounded-t-md bg-gray-200 group-hover:opacity-75 lg:h-96'>
                          <Image
                            src={movie.thumbnail_image}
                            alt={movie.title}
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          />
                        </div>
                      </Link>
                      <div className='mt-2 flex p-2'>
                        <div className='w-full'>
                          <div className='flex w-auto flex-col'>
                            <div className='flex justify-between'>
                              <RemoveButton
                                onClick={() => {
                                  handleDeleteMovie(movie);
                                }}
                                text='watchlist'
                              />

                              <div className='flex h-4 justify-end font-semibold'>
                                <span className='text-sky-400 '>
                                  {parseFloat(movie.vote_average)
                                    .toFixed(1)
                                    .toString()}
                                </span>
                                <span> /10</span>
                              </div>
                            </div>
                            <h3 className='m-0 table-cell text-lg text-gray-700'>
                              {movie.title}
                            </h3>
                          </div>
                          <div className='flex justify-between'>
                            <label className='mr-1 text-center font-bold text-gray-800'>
                              Released
                              <p className='text-sm text-gray-500'>
                                {movie.release_date}
                              </p>
                            </label>
                            <label className='mr-1 text-center font-bold text-gray-800'>
                              Runtime
                              <p className='text-sm text-gray-500'>
                                {toHoursAndMinutes(movie.runtime)}
                              </p>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* Render JSX Component to display the pagination controls */}
          <Pagination
            key={offset}
            totalMovies={totalMovies}
            postPerPage={pageLimit}
            nextOffset={offset + pageLimit}
            currentPage={Math.floor(offset / pageLimit) + 1}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </>
      )}
    </Layout>
  );
});

export default Watchlist;

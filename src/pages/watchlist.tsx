import type { NextPage } from "next";
import Layout from "src/components/layout";
import Pagination from "src/components/Pagination";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { MovieType } from "@typings/movie.types";
import noMoviesImage from "../../assets/no-movies-Icon.png";
import { useAppwrite } from "src/providers/appwriteProvider";
import WatchlistItem from "@components/watchlistItem";

const Watchlist: NextPage = React.memo(() => {
  // Declare necessary state variables for handling offsets and movies.
  const [offset, setOffset] = useState(0);
  const [pageLimit] = useState(24);
  const [totalMovies, setTotalMovies] = useState(0);
  const [movies, setMovies] = useState([]);
  const { isLoggedIn } = useAppwrite();
  // Define an asynchronous function to fetch the movies data using an api endpoint.
  const fetchMovies = async (
    limit: number | undefined,
    offset: number | undefined,
  ) => {
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
          <section className='pb-4 text-gray-600'>
            <div
              className='my-6 grid grid-cols-1 gap-4 sm:grid-cols-2
            lg:grid-cols-4 xl:gap-x-4'>
              {movies.map((movie: MovieType) => {
                return (
                  <WatchlistItem
                    key={movie.$id}
                    handleDeleteMovie={handleDeleteMovie}
                    movie={movie}></WatchlistItem>
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

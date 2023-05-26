// Import the required modules that are needed for displaying the movie list and pagination.
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Pagination from "../components/Pagination";
import { MovieType } from "@/types/movietype";
import noMoviesImage from "../assets/no-movies-Icon.png";
// Define the Home component as a functional React component with NextJS's 'NextPage' type.
const Home: NextPage = () => {
  // Declare necessary state variables for handling offsets and movies.
  const [offset, setOffset] = useState(0);
  const [pageLimit] = useState(25);
  const [totalMovies, setTotalMovies] = useState(0);
  const [movies, setMovies] = useState([]);
  // Define an asynchronous function to fetch the movies data using an api endpoint.
  const fetchMovies = async (limit: Number, offset: Number) => {
    const response = await fetch(
      `/api/getMovies?limit=${limit}&offset=${offset}`,
    );
    const data = await response.json();
    setMovies(data.data.documents);
    setTotalMovies(data.count);
  };
  // Define a function to handle deleting a movie item.
  const handleDeleteMovie = async (movie: MovieType) => {
    // Send a request to delete the movie by calling the corresponding api endpoint.
    const response = await fetch(`/api/deleteMovies?documentID=${movie.$id}`);
    // If the response status is successful, fetch the updated movie list.
    if (response.status === 200) {
      fetchMovies(pageLimit, offset);
    }
  };
  // Implement the 'useEffect' hook to fetch the movies data after the component mounts.
  useEffect(() => {
    fetchMovies(pageLimit, offset);
  }, [pageLimit, offset]);
  // Define functions to handle the next and previous pagination events.
  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + pageLimit);
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => {
        return prevOffset - pageLimit;
      });
    }
  };
  // Render JSX based on conditional logic to display when there are no movies in the Watchlist.
  return (
    <Layout>
      {movies.length === 0 ? (
        <div className='flex flex-col justify-center items-center text-gray-300 text-xl space-y-4 opacity-50'>
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
          <section className='body-font text-gray-600 pb-4'>
            <div className='mt-6 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-20'>
              {movies.map((movie: any) => {
                return (
                  <div className='cursor-pointer' key={movie.movie_id}>
                    <Link href={`/movie/${movie.movie_id}`}>
                      <div key={movie.movie_id} className='group relative'>
                        <div className='min-h-fit aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-90'>
                          <Image
                            src={movie.thumbnail_image}
                            alt={movie.title}
                            width={320}
                            height={460}
                          />
                        </div>
                        <div className='mt-4 flex justify-between'>
                          <div>
                            <h3 className='text-gray-700'>{movie.title}</h3>
                            <p className='mt-1 text-sm text-gray-500'>
                              {new Date(movie.release_date).toDateString()}
                            </p>
                          </div>
                          <p className='text-sm font-medium text-gray-900'>
                            {movie.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        handleDeleteMovie(movie);
                      }}>
                      Delete Movie
                    </button>
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
};

export default Home;

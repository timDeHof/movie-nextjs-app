import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "src/components/layout";
import MovieCard from "src/components/movieCard";
import { SearchButton } from "src/components/button";
import { useAppwrite } from "@providers/appwriteProvider";
import noMoviesImage from "../../assets/no-movies-Icon.png";
const Search: NextPage = () => {
  const [query, setQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const { isLoggedIn } = useAppwrite();
  const router = useRouter();
  const handleSearchMovie = async () => {
    try {
      const response = await fetch(`/api/searchMovies?query=${query}`);
      const data = await response.json();
      console.log(data);
      setAllMovies(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {isLoggedIn ? (
        <div className='h-screen'>
          <label className='flex flex-row justify-center'>
            <input
              type='text'
              className=' block w-1/2 rounded-l-lg border-2 border-black px-6'
              placeholder='Search for a movie'
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton onClick={handleSearchMovie} text='find Movie' />
          </label>
          <div className='flex h-full flex-wrap justify-center'>
            {allMovies.map((movie, id) => (
              <MovieCard key={id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md'>
            <Image src={noMoviesImage} alt='no movies icon'></Image>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Please log in to search for movies.
            </h2>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Search;

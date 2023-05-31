import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "src/components/layout";
import MovieCard from "src/components/movieCard";
import { SearchButton } from "src/components/button";

const Search: NextPage = () => {
  const [query, setQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
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
    </Layout>
  );
};

export default Search;

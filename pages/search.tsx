import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/layout";
import MovieCard from "@/components/movieCard";

const Search: NextPage = () => {
  const [query, setQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const router = useRouter();
  const handleSearchMovie = async () => {
    try {
      const response = await fetch(`/api/searchMovies?query=${query}`);
      const data = await response.json();

      setAllMovies(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <label className='flex flex-row justify-center'>
        <input
          type='text'
          className=' block w-1/2 border-2 border-black rounded-l-lg px-6'
          placeholder='Search for a movie'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className='bg-black p-2 px-4 text-lg text-white rounded-r-lg'
          onClick={handleSearchMovie}>
          find Movie
        </button>
      </label>
      <div className='flex flex-wrap justify-center'>
        {allMovies.map((movie, id) => (
          <MovieCard key={id} movie={movie} />
        ))}
      </div>
    </Layout>
  );
};

export default Search;

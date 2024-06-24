import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useAtomValue } from 'jotai';

import { isLoggedInAtom } from '@/atoms/user';
import { SearchButton } from '@/components/button';
import Layout from '@/components/layout';
import MovieCard from '@/components/movieCard';

import { Routes } from '@/config/routes';

const Search: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState({
    totalPages: 500,
    totalResults: 1000,
  });
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const hasNext = counts.totalPages > currentPage;

  const loadMoreItems = () => {
    if (hasNext) {
      setCurrentPage((page) => Math.min(page + 1, counts.totalPages));
    }
  };

  const onChangeSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          searchTerm === ''
            ? `https://api.themoviedb.org/3/movie/popular?&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US&page=${currentPage}`
            : `/api/searchMovies?query=${searchTerm}&currentPage=${currentPage}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        setAllMovies((previous) =>
          currentPage === 1 ? data.results : [...previous, ...data.results],
        );

        setCounts({
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, searchTerm]);

  const handleSearchMovie = async () => {
    try {
      const response = await fetch(
        `/api/searchMovies?query=${searchTerm}&currentPage=${currentPage}`,
      );
      const data = await response.json();
      console.log('search data: ', data);
      setAllMovies(data.results);
      setCounts({
        totalPages: data.totalPages,
        totalResults: data.totalResults,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      loadMoreItems();
    }
  };

  useEffect(function () {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {isLoggedIn ? (
        <div className="h-full">
          <label className="flex flex-row justify-center">
            <input
              type="text"
              value={searchTerm}
              className="block w-1/2 rounded-l-lg border-2 border-black px-6 "
              placeholder="Search for a movie"
              onChange={(e) => onChangeSearch(e.target.value)}
            />
            <SearchButton onClick={handleSearchMovie} text="find Movie" />
          </label>
          <div>
            <h1 className="text-2xl font-bold">
              {searchTerm ? `Results for: ${searchTerm}` : 'Latest movies'}
            </h1>
            <hr className="border-black text-gray-900"></hr>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
            {allMovies &&
              allMovies.map((movie, id) => (
                <div className="flex" key={id}>
                  <MovieCard movie={movie} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="h-screen">
          <p>
            Please{' '}
            <Link
              className="cursor-pointer text-sky-800 underline underline-offset-4 hover:text-rose-900"
              href={Routes.login}
            >
              login
            </Link>{' '}
            search for movies
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Search;

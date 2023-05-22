import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Pagination from "../components/Pagination";

const Home: NextPage = () => {
  const [offset, setOffset] = useState(0);
  const [pageLimit] = useState(25);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (limit: any, offset: any) => {
    const response = await fetch(
      `/api/getMovies?limit=${limit}&offset=${offset}`,
    );
    const data = await response.json();
    console.log("data fetched:", data);
    setMovies(data.data.documents);
    setTotalPageCount(data.count);
  };

  useEffect(() => {
    fetchMovies(pageLimit, offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

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

  return (
    <Layout>
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
                        objectFit='contain'
                        objectPosition='center'
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
              </div>
            );
          })}
        </div>
      </section>
      <Pagination
        totalMovies={totalPageCount}
        postPerPage={pageLimit}
        nextOffset={offset + pageLimit}
        currentPage={0}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </Layout>
  );
};

export default Home;

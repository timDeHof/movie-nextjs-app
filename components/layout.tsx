import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import reelLogo from "../assets/film-reel-svgrepo-com.svg";

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/apple-touch-icon.png'></link>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/favicon-32x32.png'></link>
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/favicon-16x16.png'></link>
        <link rel='icon' href='/images/favicon.ico' sizes='any'></link>
        <link rel='manifest' href='/images/site.webmanifest'></link>
        <title>ReelWatch</title>
      </Head>
      <header className='body-font text-gray-600'>
        <div className='container mx-auto flex flex-col flex-wrap items-center p-8 bg-header-image bg-cover bg-[center_20%] bg-blend-multiply opacity-70 md:flex-row'>
          <Link href='/'>
            <div className='flex flex-row max-w-xs'>
              <Image
                src={reelLogo}
                alt={"logo"}
                width={32}
                height={32}
                className='mr-2'
              />
              <div className='flex justify-center items-center lg:border-l-black'>
                <p className='title-font flex justify-center cursor-pointer items-center text-2xl font-medium text-white md:mb-0'>
                  Reel
                </p>
                <span className='title-font flex cursor-pointer items-center text-2xl font-medium text-sky-600'>
                  Watch
                </span>
              </div>
            </div>
          </Link>
          <nav className='flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4'>
            <span className='mr-5 hover:text-gray-900'>
              <Link href='/search'>Find Movies</Link>
            </span>
            <span className='mr-5 hover:text-gray-900'>
              <Link href='/watchlist'>Watchlist</Link>
            </span>
          </nav>
        </div>
      </header>
      <div className='container mx-auto p-8'>{children}</div>
    </>
  );
};

export default Layout;

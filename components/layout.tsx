// Importing the 'Inter' font from the 'next/font/google' library
import { Inter } from "next/font/google";

// Initializing the 'Inter' font object with a subset of "latin"
const inter = Inter({ subsets: ["latin"] });

// Importing necessary components from the 'next/link', 'next/head', and 'next/image' libraries.
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// Importing an SVG logo file as a variable named 'reelLogo'
import reelLogo from "../assets/film-reel-svgrepo-com.svg";

const Layout = ({ children }: any) => {
  return (
    <>
      {/* The header meta tags */}
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
      {/* The header section */}
      <header className='body-font text-sky-600'>
        <div className='container mx-auto flex flex-col flex-wrap items-center p-8 bg-header-image bg-cover bg-[center_20%] bg-blend-multiply opacity-70 md:flex-row'>
          {/* The application logo */}
          <Link href='/'>
            <div className='flex flex-row max-w-xs'>
              <Image
                src={reelLogo}
                alt={"logo"}
                width={32}
                height={32}
                className='mr-2'
              />
              {/* The branding text which consists of the words 'Reel' and 'Watch' */}
              <div className='flex justify-center items-end lg:border-l-black'>
                <p className='title-font flex justify-center cursor-pointer items-center text-2xl font-medium text-white md:mb-0'>
                  Reel
                </p>
                <span className='title-font flex cursor-pointer items-end  text-xl font-medium text-sky-600'>
                  Watch
                </span>
              </div>
            </div>
          </Link>
          {/* The navigation menu */}
          <nav className='flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4'>
            <span className='mr-5 hover:text-sky-900'>
              <Link href='/search'>Find Movies</Link>
            </span>
            <span className='mr-5 hover:text-sky-900'>
              <Link href='/'>My Watchlist</Link>
            </span>
          </nav>
        </div>
      </header>
      {/* The container for child components */}
      <div className='container mx-auto p-8'>{children}</div>
    </>
  );
};

export default Layout;

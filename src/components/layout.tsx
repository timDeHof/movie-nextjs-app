// Importing the 'Inter' font from the 'next/font/google' library
import { Inter } from "next/font/google";

// Initializing the 'Inter' font object with a subset of "latin"
const inter = Inter({ subsets: ["latin"] });
import React from "react";
// Importing necessary components from the 'next/link', 'next/head', and 'next/image' libraries.
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Routes } from "../config/routes";
import { NextRouter, useRouter } from "next/router";
import { useAppwrite } from "src/providers/appwriteProvider";
// Importing an SVG logo file as a variable named 'reelLogo'
import reelLogo from "../../assets/film-reel-svgrepo-com.svg";
import { Account } from "appwrite";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const { account, isLoggedIn, setLoggedIn } = useAppwrite();

  const logout = async (account: Account, router: NextRouter | string[]) => {
    try {
      await account.deleteSession("current");
      setLoggedIn(false);
      router.push(Routes.home);
    } catch (err) {
      console.error(err);
      alert("logout failed");
    }
  };
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
      <header className='w-screen text-sky-800'>
        <div
          className='flex w-screen flex-col flex-wrap items-center
        bg-header-image bg-cover bg-[center_20%] px-20 py-8 opacity-70
        bg-blend-multiply md:flex-row'>
          {/* The application logo */}
          <Link rel='preconnect' href={Routes.home}>
            <div className='flex max-w-xs flex-row space-x-2'>
              <Image src={reelLogo} alt={"logo"} width={32} height={32} />
              {/* The branding text which consists of the words 'Reel' and 'Watch' */}
              <div className='flex items-end justify-center lg:border-l-black'>
                <p
                  className='title-font flex cursor-pointer items-center
                justify-center text-2xl font-medium text-white md:mb-0'>
                  Reel
                </p>
                <span
                  className='title-font flex cursor-pointer items-end
                text-xl font-medium text-sky-800'>
                  Watch
                </span>
              </div>
            </div>
          </Link>
          {/* The navigation menu */}
          <nav
            className='flex flex-wrap items-center justify-center text-base
          md:ml-4 md:mr-auto md:border-l md:border-gray-400 md:py-1 md:pl-4'>
            <span className='mr-5 hover:text-sky-900'>
              <Link href={Routes.search}>Find Movies</Link>
            </span>
            <span className='mr-5 hover:text-sky-900'>
              <Link rel='preconnect' href={Routes.watchList}>
                My Watchlist
              </Link>
            </span>
          </nav>
          {isLoggedIn && (
            <button
              className='rounded-lg bg-black p-2 px-4 text-lg text-white'
              onClick={() => logout(account, router)}>
              logout
            </button>
          )}
        </div>
      </header>
      {/* The container for child components */}
      <div className='container mx-auto p-8'>{children}</div>
    </>
  );
};

export default Layout;

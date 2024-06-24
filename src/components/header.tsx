import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import reelLogo from '@/assets/film-reel-svgrepo-com.svg';
import { Routes } from '../config/routes';

const Header = ({ user, isLoggedIn }: { user: any; isLoggedIn: boolean }) => {
  return (
    <header className="w-screen text-sky-800">
      <div
        className="flex w-screen flex-col flex-wrap items-center
        bg-header-image bg-cover bg-[center_20%] px-20 py-8 opacity-70
        bg-blend-multiply md:flex-row"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* The application logo */}
          <Link rel="preconnect" href={Routes.home}>
            <div className="flex max-w-xs flex-row space-x-2">
              <Image src={reelLogo} alt={'logo'} width={32} height={32} />
              {/* The branding text which consists of the words 'Reel' and 'Watch' */}
              <div className="flex items-end justify-center lg:border-l-black">
                <p className="flex cursor-pointer items-center justify-center text-2xl font-medium text-white md:mb-0">
                  Reel
                </p>
                <span className="flex cursor-pointer items-end text-xl font-medium text-sky-800">
                  Watch
                </span>
              </div>
            </div>
          </Link>
          {/* The navigation menu */}
          <nav className="flex flex-wrap items-center justify-center text-base md:ml-4 md:mr-auto md:border-l md:border-gray-400 md:py-1 md:pl-4">
            <span className="mr-5 hover:text-sky-900">
              <Link href={Routes.search}>Find Movies</Link>
            </span>
            <span className="mr-5 hover:text-sky-900">
              <Link rel="preconnect" href={Routes.watchList}>
                My Watchlist
              </Link>
            </span>
          </nav>
          {isLoggedIn ? (
            <button
              className="rounded-lg bg-sky-800 p-2 px-4 text-sm uppercase text-white hover:bg-sky-900"
              onClick={() => user?.logout()}
            >
              logout
            </button>
          ) : (
            <div className="flex w-full justify-around lg:w-2/12">
              <Link
                className="rounded-lg bg-sky-800 p-2 px-4 text-sm uppercase text-white hover:bg-sky-900"
                rel="preconnect"
                href={Routes.login}
              >
                Login
              </Link>
              <Link
                className="rounded-lg bg-sky-800 p-2 px-4 text-sm uppercase text-white hover:bg-sky-900"
                rel="preconnect"
                href={Routes.register}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

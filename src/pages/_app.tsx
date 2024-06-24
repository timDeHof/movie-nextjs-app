import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'jotai';

import { WatchlistProvider } from '@/providers/databaseProvider';
import { UserProvider } from '@/providers/userProvider';

import '@/styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <UserProvider>
        <WatchlistProvider>
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </WatchlistProvider>
      </UserProvider>
    </>
  );
};

export default MyApp;

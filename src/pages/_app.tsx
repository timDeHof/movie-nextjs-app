import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'jotai';

import { WatchlistProvider } from '@/providers/databaseProvider';
import { UserProvider } from '@/providers/userProvider';

import '@/styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <WatchlistProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </WatchlistProvider>
    </UserProvider>
  );
};

export default MyApp;

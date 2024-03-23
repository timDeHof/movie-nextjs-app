import "../../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { UserProvider } from "@providers/userProvider";
import { WatchlistProvider} from "@providers/databaseProvider"
import { Provider } from "jotai";
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

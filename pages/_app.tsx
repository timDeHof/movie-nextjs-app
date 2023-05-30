import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { AppwriteProvider } from "../providers/appwriteProvider";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppwriteProvider>
      <Component {...pageProps} />
    </AppwriteProvider>
  );
};

export default MyApp;

import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return <Component {...pageProps} />;
};

export default MyApp;

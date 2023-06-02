import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, Client, Databases } from "appwrite";

interface AppwriteProviderProps {
  children: React.ReactNode;
}
interface AppwriteContextType {
  client: Client;
  account: Account;
  databases: Databases;
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const AppwriteContext = createContext<AppwriteContextType>({
  client: new Client(),
  account: new Account(new Client()),
  databases: new Databases(new Client()),
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAppwrite = () => useContext(AppwriteContext);

export const AppwriteProvider: React.FC<AppwriteProviderProps> = ({
  children,
}) => {
  const [client] = useState(
    new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string),
  );
  const [account] = useState(new Account(client));
  const [databases] = useState(new Databases(client));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Initialize the client on mount
    client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string);
    client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);
  }, [client]);
  const setLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };
  return (
    <AppwriteContext.Provider
      value={{ client, account, databases, isLoggedIn, setLoggedIn }}>
      {children}
    </AppwriteContext.Provider>
  );
};

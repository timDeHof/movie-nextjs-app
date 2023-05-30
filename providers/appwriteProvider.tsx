import React, { createContext, useContext, useEffect, useState } from "react";
import { Account, Client, Databases } from "appwrite";

interface AppwriteProviderProps {
  children: React.ReactNode;
}
interface AppwriteContextType {
  client: Client;
  account: Account;
  databases: Databases;
}

const AppwriteContext = createContext<AppwriteContextType>({
  client: new Client(),
  account: new Account(new Client()),
  databases: new Databases(new Client()),
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

  useEffect(() => {
    // Initialize the client on mount
    client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string);
    client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);
  }, [client]);

  return (
    <AppwriteContext.Provider value={{ client, account, databases }}>
      {children}
    </AppwriteContext.Provider>
  );
};

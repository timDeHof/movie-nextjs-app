import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { databases } from "../../lib/appwrite";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string; // Replace with your database ID
export const IDEAS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string; // Replace with your collection ID

type WatchlistProviderProps = {
  children: ReactNode;
};

const WatchlistContext = createContext({});

export function useWatchlist() {
  return useContext(WatchlistContext);
}

export function WatchlistProvider({children} : WatchlistProviderProps) {
    const [watchlist, setWatchlist] = useState<(string | Record<string, string>)[][]>([]);

    async function get(offset:number, limit: number) {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
          [Query.limit(limit), Query.offset(offset)],
        );

        // setWatchlist(response.documents.map((document) => document)
    }

  async function add(watchlist: any) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      watchlist,
    );
   setWatchlist((watchlist) => [[response.$id], ...watchlist].slice(0, 10));

  }



async function remove(id: string) {
  await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
  setWatchlist((watchlist: (string | Record<string,string>)[][]) =>
    watchlist.map((subArray) =>
      subArray.filter((item) => typeof item === "object" && item.$id !== id),
    ),
  );
}


  async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)],
    );
    setWatchlist(response.documents.map(document => [document.data]));
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <WatchlistContext.Provider value={{ current: watchlist, add, remove,get }}>
      {children}
    </WatchlistContext.Provider>
  );
}

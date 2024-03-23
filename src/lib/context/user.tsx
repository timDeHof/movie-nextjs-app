import { createContext, useContext, useEffect, useState } from 'react';
import { account, client }  from '../appwrite'

interface Client {

  current: string;
}

const UserContext = createContext(client);

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must ne used within a UserProvider');
  }
  return context;
}

export function UserProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState(null);

  async function login(email: string, password: string) {
    try {
      const loggedIn = await account.createEmailSession(email, password)
      setUser(loggedIn)
    } catch (error) {
      console.error(error);
      setUser(null)
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null)
    } catch (error) {
      console.error(error)
      setUser(null)
    }
  }

  async function register(email: string, password: string, name: string) {
    await account.create(email, password, name);
    await login(email, password)
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn)
    } catch (error) {
      setUser(null)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
    )
}
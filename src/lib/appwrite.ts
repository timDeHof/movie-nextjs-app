import { Account, Client, Databases } from "appwrite";

export const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Your project ID;

export const account = new Account(client);
export const databases = new Databases(client);

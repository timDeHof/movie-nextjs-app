import Appwrite from "node-appwrite";

export const initAppwrite = () => {
  const sdk = new Appwrite.Client();
  sdk
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string) // Your project ID;
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_SERVER_API_KEY as string)
    .setSelfSigned();

  return sdk;
};

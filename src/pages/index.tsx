// Import the required modules that are needed for displaying the movie list and pagination.
import Layout from "src/components/layout";
import Login from "src/components/login";
import Register from "src/components/register";
import React from "react";
// Define the Home component as a functional React component with NextJS's 'NextPage' type.
const Home = () => {
  return (
    <Layout>
      <div className='flex h-screen w-full flex-col items-center'>
        <h1 className='mb-6'>Homepage</h1>
        <div className='w-full justify-center space-y-8 lg:flex lg:space-x-16'>
          <Login />
          <Register />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

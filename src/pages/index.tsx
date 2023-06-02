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
        <div className='container w-full justify-center space-y-4 lg:flex lg:items-center lg:space-x-16 lg:space-y-0'>
          <Login />
          <Register />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

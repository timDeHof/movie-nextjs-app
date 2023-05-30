// Import the required modules that are needed for displaying the movie list and pagination.
import Layout from "@Components/layout";
import Login from "@Components/login";
import Register from "@Components/register";

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

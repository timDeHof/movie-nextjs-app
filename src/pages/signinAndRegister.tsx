import Layout from "@components/layout";
import React from "react";
import Login from "@components/login";
import Register from "@components/register";
const SignInAndRegister = () => {
  return (
    <Layout>
      <div
        className='container h-screen w-full justify-center space-y-4 lg:flex
        lg:items-center lg:space-x-16 lg:space-y-0'>
        // Render the Login component inside the container element.
        <Login />
        // Render the Register component inside the container element.
      </div>
    </Layout>
  );
};
export default SignInAndRegister;

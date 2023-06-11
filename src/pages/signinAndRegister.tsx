import Layout from "@components/layout";
import React from "react";
import Login from "@components/login";
import Register from "@components/register";
const signInAndRegister = () => {
  return (
    <Layout>
      <div className='flex h-screen w-full flex-col items-center'>
        <div
          className='container w-full justify-center space-y-4 lg:flex
        lg:items-center lg:space-x-16 lg:space-y-0'>
          <Login />
          <Register />
        </div>
      </div>
    </Layout>
  );
};
export default signInAndRegister;

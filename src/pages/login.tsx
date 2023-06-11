import Layout from "@components/layout";
import React from "react";
import Login from "@components/login";
const LoginPage = () => {
  return (
    <Layout>
      <div className='container flex h-screen w-full flex-col items-center'>
        {/* Render the Login component inside the container element. */}
        <Login />
      </div>
    </Layout>
  );
};
export default LoginPage;

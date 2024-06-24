import React from 'react';

import Layout from '@/components/layout';
import Register from '@/components/register';

const SignInAndRegister = () => {
  return (
    <Layout>
      <div className="container flex h-screen w-full flex-col items-center">
        {/* // Render the Register component inside the container element. */}
        <Register />
      </div>
    </Layout>
  );
};
export default SignInAndRegister;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Routes } from "../config/routes";
import { useAppwrite } from "src/providers/appwriteProvider";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { account, setLoggedIn } = useAppwrite();
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await account.createEmailSession(email, password);
      setLoggedIn(true);

      const getSession = await account.get();
      console.log("account.get()", getSession);
      const sessionToken = await account.createJWT();
      localStorage.setItem("sessionToken", sessionToken.jwt);
      router.push(Routes.watchList);
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className='flex w-full flex-col items-center rounded bg-white p-6 shadow md:w-1/2 lg:w-1/3'>
      <h2
        tabIndex={0}
        role='heading'
        aria-label='Login to your account'
        className='text-center text-2xl font-extrabold text-gray-800'>
        Login to your account
      </h2>
      <div>
        <span>Don't have an account </span>
        <Link className='cursor-pointer' href={Routes.register}>
          Click here
        </Link>
      </div>
      <form className='w-3/4 space-y-4' onSubmit={handleSubmit}>
        <input type='hidden' name='remember' value='true' />
        <div className='space-y-4 rounded-md shadow-sm'>
          <div>
            <label htmlFor='email-address' className='sr-only'>
              Email address
            </label>
            <input
              id='email-address'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='relative block w-full appearance-none rounded-md border
              border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500
              focus:z-10 focus:border-indigo-500 focus:outline-none
              focus:ring-indigo-500 sm:text-sm'
              placeholder='Email address'
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <div
              className='relative flex rounded-md border border-gray-300 px-3
            py-2 focus:z-10 focus:border-indigo-500 focus:outline-none
            focus:ring-indigo-500 sm:text-sm'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                autoComplete='new-password'
                required
                className='relative block w-full appearance-none text-gray-900
                placeholder:text-gray-500 focus:outline-none'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type='button'
                className='bg-transparent'
                onClick={handleShowPasswordClick}>
                {showPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 -960 960 960'
                    width='20'>
                    <path d='M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='20'
                    viewBox='0 -960 960 960'
                    width='20'>
                    <path d='m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z' />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div className='rounded-md bg-red-50 p-4'>
            <div className='flex'>
              <div className='shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M10 2C5.58 2 2 5.58 2 10c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6zM9 7h2v5H9V7zm2 7a1 1 0 11-2 0 1 1 0 012 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>
                  Invalid email or password
                </h3>
              </div>
            </div>
          </div>
        )}
        <div>
          <button
            type='submit'
            className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M10 2C5.58 2 2 5.58 2 10c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6zM9 7h2v5H9V7zm2 7a1 1 0 11-2 0 1 1 0 012 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

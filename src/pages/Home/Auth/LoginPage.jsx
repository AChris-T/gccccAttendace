import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useLogin } from '../../../hooks/queries/auth.query';
import { Toast } from '../../../lib/toastify';
import Message from '../../../components/common/Message';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, isError, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) return Toast.error('Email/Phone and Password are required');

    let formattedPassword = password.trim();
    if (/^0\d+/.test(formattedPassword)) {
      7;
      formattedPassword = formattedPassword.substring(1);
    }
    mutate({ username, password: formattedPassword })
  };

  return (
    <div className=" max-w-[1940px]  bg-[#24244e] mx-auto  overflow-x-hidden">
      <div className="flex items-center justify-center w-full px-4 align-middle md:px-0 ">
        <div className="flex w-full justify-center items-center h-[100vh]">
          <div className="flex flex-col items-center w-full railway">
            <NavLink to="/" className="">
              <img src='/images/logo/gccc.png' alt="GCC logo" className="w-[150px]" />
            </NavLink>
            <p className="px-3 -mt-5 font-medium text-center text-white railway">
              Grow deeper in your commitment to God’s house.
            </p>

            <form
              className="flex md:w-[450px] w-full  mt-10 flex-col  gap-3 md:px-[30px] "
              onSubmit={handleSubmit}
            >
              {isError && <Message variant='error' data={error?.data} />}
              <div>
                <label htmlFor="username" className="sr-only">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Email or Phone Number"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full  focus:outline-none py-[13px] px-2 rounded border-b-[1.8px] text-white bg-transparent"
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full  focus:outline-none py-[13px] px-2 rounded border-b-[1.8px] text-white bg-transparent"
                />
              </div>
              <Button type='submit' loading={isPending} size='lg'>Sign In</Button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;

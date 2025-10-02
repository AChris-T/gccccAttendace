import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useLogin } from '../../../queries/auth.query';
import { Toast } from '../../../lib/toastify';
import Message from '../../../components/common/Message';

// Constants - moved outside component for better performance
const LOGO_PATH = '/images/logo/gccc.png';
const LOGO_ALT = 'GCC logo';
const TAGLINE = "Grow deeper in your commitment to God's house.";

// Utility function - pure function for testability
const formatPhoneNumber = (phone) => {
  const trimmed = phone.trim();
  return /^0\d+/.test(trimmed) ? trimmed.substring(1) : trimmed;
};

// Reusable Input Component - following DRY principle
const InputField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = true,
  autoComplete
}) => (
  <div>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      autoComplete={autoComplete}
      className="w-full focus:outline-none focus:border-blue-400 py-[13px] px-2 rounded border-b-[1.8px] text-white bg-transparent placeholder-gray-400 transition-colors"
    />
  </div>
);

const LoginPage = () => {
  // Single state object for related data
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // Renamed for clarity
  const { mutate: login, isPending, isError, error } = useLogin();

  // Optimized updater using functional setState
  const updateCredential = useCallback((field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  }, []);

  // Separate validation logic for better testability
  const validateForm = useCallback(() => {
    const { username, password } = credentials;

    if (!username.trim() || !password.trim()) {
      Toast.error('Email/Phone and Password are required');
      return false;
    }

    return true;
  }, [credentials]);

  // Clean form submission handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { username, password } = credentials;
    const formattedPassword = formatPhoneNumber(password);

    login({
      username: username.trim(),
      password: formattedPassword
    });
  }, [credentials, validateForm, login]);

  return (
    <div className="max-w-[1940px] bg-[#24244e] mx-auto overflow-x-hidden">
      <div className="flex items-center justify-center w-full px-4 md:px-0">
        {/* Changed h-[100vh] to min-h-screen for better mobile support */}
        <div className="flex w-full justify-center items-center min-h-screen py-12">
          <div className="flex flex-col items-center w-full railway">
            {/* Logo Section with accessibility improvements */}
            <NavLink
              to="/"
              className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              aria-label="Go to homepage"
            >
              <img
                src={LOGO_PATH}
                alt={LOGO_ALT}
                className="w-[150px] h-auto"
                loading="eager"
              />
            </NavLink>

            {/* Improved spacing and max-width for better readability */}
            <p className="px-3 mt-2 font-medium text-center text-white railway max-w-md">
              {TAGLINE}
            </p>

            {/* Form with noValidate to use custom validation */}
            <form
              className="flex md:w-[450px] w-full mt-10 flex-col gap-4 md:px-[30px]"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Error Message Display */}
              {isError && (
                <Message
                  variant="error"
                  data={error?.data}
                />
              )}

              {/* Username Field with proper autocomplete */}
              <InputField
                id="username"
                label="Email or Phone Number"
                type="text"
                value={credentials.username}
                onChange={(e) => updateCredential('username', e.target.value)}
                placeholder="Email or Phone Number"
                autoComplete="username"
              />

              {/* Password Field - Fixed type to "password" for security */}
              <InputField
                id="password"
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => updateCredential('password', e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
              />

              {/* Submit Button with disabled state */}
              <Button
                type="submit"
                loading={isPending}
                disabled={isPending}
                size="lg"
                className="mt-2"
              >
                Sign In
              </Button>

              {/* Optional: Add forgot password link */}
              {/* <NavLink 
                to="/forgot-password" 
                className="text-sm text-center text-blue-300 hover:text-blue-200 transition-colors mt-2"
              >
                Forgot your password?
              </NavLink> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import Button from '../../../components/ui/Button';
// import { useLogin } from '../../../queries/auth.query';
// import { Toast } from '../../../lib/toastify';
// import Message from '../../../components/common/Message';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { mutate, isPending, isError, error } = useLogin();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username.trim() || !password.trim()) return Toast.error('Email/Phone and Password are required');

//     let formattedPassword = password.trim();
//     if (/^0\d+/.test(formattedPassword)) {
//       7;
//       formattedPassword = formattedPassword.substring(1);
//     }
//     mutate({ username, password: formattedPassword })
//   };

//   return (
//     <div className=" max-w-[1940px]  bg-[#24244e] mx-auto  overflow-x-hidden">
//       <div className="flex items-center justify-center w-full px-4 align-middle md:px-0 ">
//         <div className="flex w-full justify-center items-center h-[100vh]">
//           <div className="flex flex-col items-center w-full railway">
//             <NavLink to="/" className="">
//               <img src='/images/logo/gccc.png' alt="GCC logo" className="w-[150px]" />
//             </NavLink>
//             <p className="px-3 -mt-5 font-medium text-center text-white railway">
//               Grow deeper in your commitment to God’s house.
//             </p>

//             <form
//               className="flex md:w-[450px] w-full  mt-10 flex-col  gap-3 md:px-[30px] "
//               onSubmit={handleSubmit}
//             >
//               {isError && <Message variant='error' data={error?.data} />}
//               <div>
//                 <label htmlFor="username" className="sr-only">
//                   Email or Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   value={username}
//                   placeholder="Email or Phone Number"
//                   required
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full  focus:outline-none py-[13px] px-2 rounded border-b-[1.8px] text-white bg-transparent"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="username" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   type="text"
//                   id="password"
//                   value={password}
//                   placeholder="Password"
//                   required
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full  focus:outline-none py-[13px] px-2 rounded border-b-[1.8px] text-white bg-transparent"
//                 />
//               </div>
//               <Button type='submit' loading={isPending} size='lg'>Sign In</Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default LoginPage;

import Button from '@/components/ui/Button';
import { Toast } from '@/lib/toastify';
import { useLogin } from '@/queries/auth.query';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';

const LOGO_PATH = '/images/logo/gccc.png';
const LOGO_ALT = 'GCC logo';
const TAGLINE = "Grow deeper in your commitment to God's house.";

const formatPhoneNumber = (phone) => {
  const trimmed = phone.trim();
  return /^0\d+/.test(trimmed) ? trimmed.substring(1) : trimmed;
};

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
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const { mutate: login, isPending, isError, error } = useLogin();

  const updateCredential = useCallback((field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const { username, password } = credentials;

    if (!username.trim() || !password.trim()) {
      Toast.error('Email/Phone and Password are required');
      return false;
    }

    return true;
  }, [credentials]);

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
    <div className="flex items-center justify-center w-full px-4 md:px-0 min-h-[80vh]">
      <div className="flex flex-col items-center w-full max-w-lg">
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

        <p className="px-3 mt-2 font-medium text-center text-white max-w-md">
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

          <InputField
            id="username"
            label="Email or Phone Number"
            type="text"
            value={credentials.username}
            onChange={(e) => updateCredential('username', e.target.value)}
            placeholder="Email or Phone Number"
            autoComplete="username"
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => updateCredential('password', e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            loading={isPending}
            size="lg"
            className="mt-2"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
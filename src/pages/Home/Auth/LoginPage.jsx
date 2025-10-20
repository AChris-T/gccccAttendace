import Message from "@/components/common/Message";
import InputForm from "@/components/form/useForm/InputForm";
import Button from "@/components/ui/Button";
import { useLogin } from "@/queries/auth.query";
import { loginSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const TAGLINE = "Grow deeper in your commitment to God's house.";

const LoginPage = () => {
  const { mutate, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    mutate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg relative z-10">
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 backdrop-blur-sm border-2 border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 hover:border-white/30 dark:hover:border-gray-600/50">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 dark:from-blue-400/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 dark:from-purple-400/20 to-transparent rounded-tr-full"></div>

          {/* Header Section */}
          <div className="text-center mb-10 relative">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {TAGLINE}
              </p>
            </div>

            {/* Decorative Line */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-1 relative">
            {isError && error && (
              <div className="mb-6 animate-shake">
                <Message variant="error" data={error?.data} />
              </div>
            )}

            <InputForm
              label="Email or Phone Number"
              name="username"
              type="text"
              register={register}
              error={null}
              placeholder="Enter your email or phone"
              required={true}
            />

            <InputForm
              label="Password"
              name="password"
              type="password"
              register={register}
              error={null}
              placeholder="Enter your password"
              required={true}
            />

            <div className="flex items-center justify-between pt-2">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold focus:outline-none focus:underline transition-colors relative group"
              >
                Forgot password?
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            <Button
              className="w-full"
              type="submit"
              loading={isPending}
            >
              Sign In
            </Button>

            {/* Sign Up Link */}
            <div className="text-center pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors relative group"
                >
                  Sign up
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
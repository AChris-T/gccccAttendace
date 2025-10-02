import { memo, useState } from "react";

const InputForm = memo(({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
  required = false,
  validationRules = {}
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const inputType = isPasswordField && showPassword ? "text" : type;

  const validation = {
    required: required ? `${label || name} is required` : false,
    ...validationRules
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="mb-4 relative">
      {label && (
        <label htmlFor={name} className="block font-medium mb-1 text-sm">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={name}
        type={inputType}
        {...register(name, validation)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full text-xs font-light rounded-lg p-3 focus:border-gray-300 focus:outline-gray-200 focus:outline border ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-300 focus:outline-gray-200"
          }`}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute z-30 -translate-y-1/2 cursor-pointer right-3 top-[38px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          ) : (
            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          )}
        </button>
      )}

      {error && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default InputForm;
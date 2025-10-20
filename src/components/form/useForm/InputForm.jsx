import { EyeCloseIcon, EyeIcon } from "@/icons";
import { memo, useState } from "react";

const InputForm = memo(({
  label,
  name,
  type = "text",
  register = () => { },
  error,
  placeholder,
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5" aria-label="required">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={inputType}
          {...register(name, {
            required: required ? `${label || 'This field'} is required` : false,
          })}
          readOnly={disabled}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`
            w-full text-sm font-normal rounded-lg px-4 py-2.5
            transition-colors duration-200
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            border focus:outline-none focus:ring-1
            ${error
              ? "border-red-500 dark:border-red-400 focus:ring-red-200 dark:focus:ring-red-900"
              : "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400"
            }
            ${disabled
              ? "bg-gray-100 dark:bg-gray-900 cursor-not-allowed opacity-60"
              : ""
            }
            ${type === "password" && !disabled ? "pr-11" : ""}
          `}
          placeholder={placeholder}
        />

        {type === "password" && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
          >
            {showPassword ? (
              <EyeIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
            ) : (
              <EyeCloseIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${name}-error`}
          className="text-red-500 dark:text-red-400 text-xs mt-1.5"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

InputForm.displayName = 'InputForm';

export default InputForm;
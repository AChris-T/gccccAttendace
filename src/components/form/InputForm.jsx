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

  return (
    <div className="mb-4 relative">
      {label && <label className="block font-medium mb-1 text-sm">{label}</label>}
      <input
        type={showPassword ? "text" : type}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        readOnly={disabled}
        className={`w-full text-xs font-light rounded-lg p-3 focus:outline-gray-200 focus:outline border ${error ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        placeholder={placeholder}
      />

      {type === "password" && !disabled && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute z-30 -translate-y-1/2 cursor-pointer right-3 top-[38px]"
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          ) : (
            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          )}
        </span>
      )}

      {error && (
        <p id={`${name}-error`} className="text-red-500 text-xs mt-[1px]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default InputForm;
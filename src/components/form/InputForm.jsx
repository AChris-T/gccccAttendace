import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";

const InputForm = ({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
  required = false,
  options = [],
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  if (type === "radio") {
    return (
      <div className="mb-4">
        {label && <p className="block font-medium mb-1 text-sm">{label}</p>}

        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center text-xs">
              <input
                type="radio"
                value={option.value}
                {...register(name, {
                  required: required ? `${label} is required` : false,
                })}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))}

          {name === "howDidYouLearn" && (
            <label className="flex items-center text-sm">
              <input
                type="radio"
                value={otherValue || "other"}
                {...register(name, {
                  required: required ? `${label} is required` : false,
                })}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2">Other:</span>
              <input
                type="text"
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                className="ml-2 w-full text-xs font-light rounded-lg p-2 border border-gray-300 focus:outline focus:outline-gray-200"
                placeholder="Please specify"
              />
            </label>
          )}
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4 relative">
      {label && <label className="block font-medium mb-1 text-sm">{label}</label>}
      <input
        type={showPassword ? "text" : type}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className={`w-full text-xs font-light rounded-lg p-3 focus:outline-gray-200 focus:outline border ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />

      {/* Password toggle */}
      {type === "password" && (
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

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputForm;

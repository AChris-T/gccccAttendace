import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";


const InputForm = ({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {label && <label className="block font-medium mb-1 text-xs">{label}</label>}
      <input
        type={showPassword ? 'text' : type}
        {...register(name)}
        className={`w-full text-xs font-light rounded-lg p-3 focus:outline-gray-200 focus:outline border ${error ? "border-red-500" : "border-gray-300"
          }`}
        placeholder={placeholder}
      />
      {type == 'password' &&
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute z-30 -translate-y-1/2 cursor-pointer right-3 top-[22px]"
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          ) : (
            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          )}
        </span>
      }
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  );
};

export default InputForm;

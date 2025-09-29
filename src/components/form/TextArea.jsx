import React from 'react';

const TextArea = ({
  label,
  name,
  required = false,
  register,
  error,
  placeholder,
  rows = 4,
  cols = 50,
}) => {
  return (
    <div>
      {label && <p className="block font-medium mb-1 text-sm">{label}</p>}

      <textarea
        id={name}
        rows={rows}
        cols={cols}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className={`w-full text-xs font-light rounded-lg p-3 focus:outline-gray-200 focus:outline border ${error ? 'border-red-500' : 'border-gray-300'
          }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextArea;

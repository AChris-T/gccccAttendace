import React from 'react';

const TextArea = ({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 4,
  cols = 50,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block font-medium mb-1 text-xs">
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        cols={cols}
        {...register(name)}
        className={`w-full text-xs font-light rounded-lg p-3 focus:outline-gray-200 focus:outline border ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextArea;

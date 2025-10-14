import { memo } from "react";

const SelectForm = memo(({ label, name, register, error, options = [], required = false, disabled = false }) => (
    <div className="mb-4">
        {label && <label className="block font-medium mb-1 text-sm">{label}</label>}
        <select
            {...register(name, {
                required: required ? `${label} is required` : false,
            })}
            disabled={disabled}
            className={`w-full text-xs font-light rounded-lg p-3 focus:outline-gray-200 border ${error ? "border-red-500" : "border-gray-300"
                } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} dark:bg-gray-800 dark:text-gray-200`}
        >
            <option value="">Select {label}</option>
            {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                    {opt.name}
                </option>
            ))}
        </select>

        {error && <p className="text-red-500 text-xs mt-[1px]" role="alert">{error}</p>}
    </div>
));

export default SelectForm;
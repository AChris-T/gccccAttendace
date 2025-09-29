import { memo } from "react";

const RadioGroup = memo(({
    label,
    name,
    register,
    error,
    required = false,
    options = [],
    validationRules = {}
}) => {
    const validation = {
        required: required ? `${label || name} is required` : false,
        ...validationRules
    };

    return (
        <fieldset className="mb-4">
            {label && (
                <legend className="block font-medium mb-2 text-sm">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </legend>
            )}

            <div className="flex flex-col gap-2" role="radiogroup" aria-labelledby={label ? `${name}-label` : undefined}>
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center text-xs cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                        <input
                            type="radio"
                            value={option.value}
                            {...register(name, validation)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                            aria-describedby={error ? `${name}-error` : undefined}
                        />
                        <span className="ml-2">{option.label}</span>
                    </label>
                ))}
            </div>

            {error && (
                <p id={`${name}-error`} className="text-red-500 text-xs mt-2" role="alert">
                    {error}
                </p>
            )}
        </fieldset>
    );
});
export default RadioGroup;

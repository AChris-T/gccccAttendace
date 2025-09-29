const RadioGroupWithOther = memo(({
    label,
    name,
    register,
    error,
    required = false,
    options = [],
    otherPlaceholder = "Please specify",
    validationRules = {}
}) => {
    const [otherValue, setOtherValue] = useState("");
    const [isOtherSelected, setIsOtherSelected] = useState(false);

    const validation = {
        required: required ? `${label || name} is required` : false,
        ...validationRules
    };

    const handleOtherInputChange = (e) => {
        const value = e.target.value;
        setOtherValue(value);
    };

    const handleRadioChange = (e) => {
        setIsOtherSelected(e.target.value === "other" || e.target.value === otherValue);
    };

    return (
        <fieldset className="mb-4">
            {label && (
                <legend className="block font-medium mb-2 text-sm">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </legend>
            )}

            <div className="flex flex-col gap-2" role="radiogroup">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center text-xs cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                        <input
                            type="radio"
                            value={option.value}
                            {...register(name, validation)}
                            onChange={handleRadioChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                            aria-describedby={error ? `${name}-error` : undefined}
                        />
                        <span className="ml-2">{option.label}</span>
                    </label>
                ))}

                {/* Other option with text input */}
                <label className="flex items-center text-xs cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <input
                        type="radio"
                        value={otherValue || "other"}
                        {...register(name, validation)}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                        aria-describedby={error ? `${name}-error` : undefined}
                    />
                    <span className="ml-2 flex-shrink-0">Other:</span>
                    <input
                        type="text"
                        value={otherValue}
                        onChange={handleOtherInputChange}
                        onFocus={() => setIsOtherSelected(true)}
                        className="ml-2 w-full text-xs font-light rounded-lg p-2 border border-gray-300 focus:outline focus:outline-gray-200 transition-colors"
                        placeholder={otherPlaceholder}
                        aria-label="Other option text input"
                    />
                </label>
            </div>

            {error && (
                <p id={`${name}-error`} className="text-red-500 text-xs mt-2" role="alert">
                    {error}
                </p>
            )}
        </fieldset>
    );
});
export default RadioGroupWithOther
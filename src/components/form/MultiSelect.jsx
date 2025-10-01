import { useState, memo, useEffect, useRef } from "react";

const MultiSelect = memo(({
    label,
    name,
    options = [],
    defaultSelected = [],
    onChange,
    disabled = false,
    placeholder = "Select option",
    error,
    required = false,
    maxHeight = "12rem"
}) => {
    const [selectedOptions, setSelectedOptions] = useState(defaultSelected);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleSelect = (optionValue) => {
        const newSelectedOptions = selectedOptions.includes(optionValue)
            ? selectedOptions.filter((value) => value !== optionValue)
            : [...selectedOptions, optionValue];

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    };

    const removeOption = (value, event) => {
        event?.stopPropagation();
        const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    };

    const clearAll = (event) => {
        event?.stopPropagation();
        setSelectedOptions([]);
        onChange?.([]);
    };

    const selectedValuesText = selectedOptions.map(
        (value) => options.find((option) => option.value === value)?.text || ""
    );

    const isSelected = (value) => selectedOptions.includes(value);

    return (
        <div className="w-full mb-4" ref={dropdownRef}>
            {label && (
                <label
                    htmlFor={name}
                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative inline-block w-full">
                <div className="relative flex flex-col items-center">
                    {/* Main Input Area */}
                    <div
                        onClick={toggleDropdown}
                        className={`w-full cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        <div
                            className={`mb-2 flex min-h-[2.75rem] rounded-lg border py-1.5 pl-3 pr-3 shadow-sm transition-all duration-200 ${error
                                ? 'border-red-500 focus-within:border-red-500 focus-within:ring-0 focus-within:ring-red-200'
                                : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-0 focus-within:ring-blue-200 dark:border-gray-700 dark:focus-within:border-blue-400'
                                } dark:bg-gray-900`}
                            role="combobox"
                            aria-expanded={isOpen}
                            aria-haspopup="listbox"
                            aria-labelledby={label ? `${name}-label` : undefined}
                        >
                            {/* Selected Tags Container */}
                            <div className="flex flex-wrap flex-auto gap-2 items-center">
                                {selectedValuesText.length > 0 ? (
                                    selectedValuesText.map((text, index) => (
                                        <div
                                            key={`${selectedOptions[index]}-${index}`}
                                            className="group flex items-center justify-center rounded-full border border-gray-200 bg-blue-50 py-1 pl-3 pr-2 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50"
                                        >
                                            <span className="flex-initial max-w-full truncate">
                                                {text}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => removeOption(selectedOptions[index], e)}
                                                className="ml-1.5 flex items-center justify-center text-blue-600 hover:text-blue-800 focus:outline-none dark:text-blue-400 dark:hover:text-blue-200"
                                                aria-label={`Remove ${text}`}
                                            >
                                                <svg
                                                    className="fill-current"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500 dark:text-gray-400 py-1">
                                        {placeholder}
                                    </span>
                                )}
                            </div>

                            {/* Right Side Controls */}
                            <div className="flex items-center gap-1 ml-2">
                                {selectedOptions.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={clearAll}
                                        className="flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
                                        aria-label="Clear all selections"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM10.5 10.5L8 8L5.5 10.5L5 10L7.5 7.5L5 5L5.5 4.5L8 7L10.5 4.5L11 5L8.5 7.5L11 10L10.5 10.5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="w-5 h-5 text-gray-700 focus:outline-none dark:text-gray-400"
                                    aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
                                >
                                    <svg
                                        className={`stroke-current transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                            }`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div
                            className="absolute left-0 z-50 w-full overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 top-full dark:bg-gray-900 dark:border-gray-700"
                            style={{ maxHeight }}
                            onClick={(e) => e.stopPropagation()}
                            role="listbox"
                            aria-label="Select"
                        >
                            <div className="flex flex-col py-1">
                                {options.length > 0 ? (
                                    options.map((option, index) => {
                                        const selected = isSelected(option.value);
                                        return (
                                            <div
                                                key={`${option.value}-${index}`}
                                                className={`relative flex w-full items-center px-3 py-2.5 cursor-pointer transition-colors hover:bg-blue-50 dark:hover:bg-gray-800 ${selected ? "bg-blue-50 dark:bg-gray-800" : ""
                                                    } ${index !== options.length - 1
                                                        ? "border-b border-gray-100 dark:border-gray-800"
                                                        : ""
                                                    }`}
                                                onClick={() => handleSelect(option.value)}
                                                role="option"
                                                aria-selected={selected}
                                            >
                                                {/* Checkbox */}
                                                <div className="flex items-center mr-3">
                                                    <div
                                                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selected
                                                            ? "bg-blue-600 border-blue-600"
                                                            : "border-gray-300 dark:border-gray-600"
                                                            }`}
                                                    >
                                                        {selected && (
                                                            <svg
                                                                className="w-3 h-3 text-white"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Option Text */}
                                                <div className="flex-1 text-sm leading-6 text-gray-800 dark:text-white/90">
                                                    {option.text}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                        No options available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                    {error}
                </p>
            )}

            {/* Helper Text */}
            {selectedOptions.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {selectedOptions.length} item{selectedOptions.length !== 1 ? "s" : ""} selected
                </p>
            )}
        </div>
    );
});

export default MultiSelect;


// ==================== Demo Component ====================
export function MultiSelectDemo() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState(["usa"]);
    const [selectedColors, setSelectedColors] = useState([]);

    const skillOptions = [
        { value: "javascript", text: "JavaScript" },
        { value: "react", text: "React" },
        { value: "typescript", text: "TypeScript" },
        { value: "nodejs", text: "Node.js" },
        { value: "python", text: "Python" },
        { value: "java", text: "Java" },
        { value: "csharp", text: "C#" },
        { value: "go", text: "Go" },
        { value: "rust", text: "Rust" },
        { value: "swift", text: "Swift" },
    ];

    const countryOptions = [
        { value: "usa", text: "United States" },
        { value: "uk", text: "United Kingdom" },
        { value: "canada", text: "Canada" },
        { value: "australia", text: "Australia" },
        { value: "germany", text: "Germany" },
        { value: "france", text: "France" },
        { value: "japan", text: "Japan" },
        { value: "brazil", text: "Brazil" },
    ];

    const colorOptions = [
        { value: "red", text: "Red" },
        { value: "blue", text: "Blue" },
        { value: "green", text: "Green" },
        { value: "yellow", text: "Yellow" },
        { value: "purple", text: "Purple" },
        { value: "orange", text: "Orange" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        MultiSelect Component
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Refactored and converted to JavaScript with enhanced features
                    </p>

                    <div className="space-y-8">
                        {/* Skills MultiSelect */}
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Programming Skills
                            </h2>
                            <MultiSelect
                                label="Select Your Skills"
                                name="skills"
                                options={skillOptions}
                                defaultSelected={selectedSkills}
                                onChange={setSelectedSkills}
                                placeholder="Choose your programming languages"
                                required
                            />
                        </div>

                        {/* Countries MultiSelect with Default Value */}
                        <div className="p-6 bg-blue-50 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Countries (Pre-selected)
                            </h2>
                            <MultiSelect
                                label="Countries You've Visited"
                                name="countries"
                                options={countryOptions}
                                defaultSelected={selectedCountries}
                                onChange={setSelectedCountries}
                                placeholder="Select countries"
                            />
                        </div>

                        {/* Colors MultiSelect */}
                        <div className="p-6 bg-purple-50 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Favorite Colors
                            </h2>
                            <MultiSelect
                                label="Choose Your Favorite Colors"
                                name="colors"
                                options={colorOptions}
                                defaultSelected={selectedColors}
                                onChange={setSelectedColors}
                                placeholder="Pick your colors"
                                maxHeight="10rem"
                            />
                        </div>

                        {/* Disabled State */}
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Disabled State
                            </h2>
                            <MultiSelect
                                label="Disabled MultiSelect"
                                name="disabled"
                                options={skillOptions}
                                defaultSelected={["javascript", "react"]}
                                disabled={true}
                                placeholder="This is disabled"
                            />
                        </div>

                        {/* Error State */}
                        <div className="p-6 bg-red-50 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Error State
                            </h2>
                            <MultiSelect
                                label="Required Field"
                                name="required"
                                options={colorOptions}
                                placeholder="This field is required"
                                error="Please select at least one option"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Selected Values Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Skills
                        </h3>
                        <div className="text-xs text-gray-600 space-y-1">
                            {selectedSkills.length > 0 ? (
                                selectedSkills.map((skill) => (
                                    <div key={skill} className="py-1 px-2 bg-gray-50 rounded">
                                        {skillOptions.find((s) => s.value === skill)?.text}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">No skills selected</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            Countries
                        </h3>
                        <div className="text-xs text-gray-600 space-y-1">
                            {selectedCountries.length > 0 ? (
                                selectedCountries.map((country) => (
                                    <div key={country} className="py-1 px-2 bg-gray-50 rounded">
                                        {countryOptions.find((c) => c.value === country)?.text}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">No countries selected</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                            Colors
                        </h3>
                        <div className="text-xs text-gray-600 space-y-1">
                            {selectedColors.length > 0 ? (
                                selectedColors.map((color) => (
                                    <div key={color} className="py-1 px-2 bg-gray-50 rounded">
                                        {colorOptions.find((c) => c.value === color)?.text}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">No colors selected</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
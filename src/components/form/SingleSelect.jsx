import { useState, memo, useEffect, useRef } from "react";

const SingleSelect = memo(({
    label,
    name,
    options = [],
    defaultValue = "",
    onChange,
    disabled = false,
    placeholder = "Select an option",
    error,
    required = false,
    searchable = false,
    maxHeight = "16rem"
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleSelect = (optionValue) => {
        setSelectedValue(optionValue);
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchQuery("");
    };

    const clearSelection = (event) => {
        event?.stopPropagation();
        setSelectedValue("");
        onChange?.("");
    };

    const selectedOption = options.find((option) => option.value === selectedValue);
    const selectedText = selectedOption?.text || "";

    // Filter options based on search query
    const filteredOptions = searchable && searchQuery
        ? options.filter((option) =>
            option.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : options;

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
                {/* Main Select Button */}
                <button
                    type="button"
                    onClick={toggleDropdown}
                    disabled={disabled}
                    className={`w-full flex items-center justify-between min-h-[2.75rem] rounded-lg border px-3 py-2 text-left shadow-sm transition-all duration-200 ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-0 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-0 focus:ring-blue-200 dark:border-gray-700 dark:focus:border-blue-400'
                        } ${disabled
                            ? 'bg-gray-100 cursor-not-allowed opacity-60 dark:bg-gray-800'
                            : 'bg-white cursor-pointer hover:border-gray-400 dark:bg-gray-900'
                        }`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby={label ? `${name}-label` : undefined}
                >
                    <span className={`text-sm flex-1 truncate ${selectedText
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                        }`}>
                        {selectedText || placeholder}
                    </span>

                    <div className="flex items-center gap-1 ml-2">
                        {selectedValue && !disabled && (
                            <button
                                type="button"
                                onClick={clearSelection}
                                className="flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                                aria-label="Clear selection"
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

                        <svg
                            className={`w-5 h-5 text-gray-700 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
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
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        className="absolute left-0 z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700"
                        role="listbox"
                        aria-labelledby={label ? `${name}-label` : undefined}
                    >
                        {/* Search Input */}
                        {searchable && (
                            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="relative">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <svg
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Options List */}
                        <div
                            className="overflow-y-auto py-1"
                            style={{ maxHeight }}
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => {
                                    const isSelected = option.value === selectedValue;
                                    return (
                                        <button
                                            key={`${option.value}-${index}`}
                                            type="button"
                                            onClick={() => handleSelect(option.value)}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${isSelected
                                                ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-300"
                                                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                                }`}
                                            role="option"
                                            aria-selected={isSelected}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="flex-1">{option.text}</span>
                                                {isSelected && (
                                                    <svg
                                                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="px-4 py-3 text-sm text-center text-gray-500 dark:text-gray-400">
                                    {searchQuery ? "No results found" : "No options available"}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
});

export default SingleSelect;
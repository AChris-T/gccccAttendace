const SelectForm = ({
    label,
    name,
    register,
    error,
    options,
}) => {
    return (
        <>
            {label && (
                <label htmlFor={name} className="block font-medium mb-1 text-xs">
                    {label}
                </label>
            )}

            <select
                id={name}
                {...register(name)}
                className={`w-full text-xs font-light rounded-lg p-3 focus:outline-gray-200 focus:outline border ${error ? "border-red-500" : "border-gray-300"
                    }`}
            >
                {/* <option value={0}>
                    All
                </option> */}
                {options.map((opt) => (
                    <option defaultValue={opt.id} key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>

            {error && <p className="text-red-500 text-xs">{error}</p>}
        </>
    );
};

export default SelectForm;

const FieldItem = ({
  Icon,
  label,
  value,
  gradientClass = 'from-blue-500 to-blue-600',
  size = 'md',
}) => {
  const sizes = {
    md: { box: 'w-9 h-9', icon: 18, pad: '' },
    sm: { box: 'w-8 h-8', icon: 16, pad: '' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="group relative p-4 border border-gray-100 rounded-xl dark:border-gray-700/60 bg-linear-to-b from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all">
      <div className="flex items-start gap-3">
        <div
          className={`flex items-center justify-center ${s.box} rounded-lg bg-linear-to-br ${gradientClass} transition-transform group-hover:scale-110 shrink-0`}
        >
          <Icon
            width={s.icon}
            height={s.icon}
            className="text-white"
            fill="currentColor"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="mb-1.5 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {label}
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 wrap-break-word">
            {value || (
              <span className="text-gray-400 dark:text-gray-500 font-normal italic">
                Not provided
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FieldItem;

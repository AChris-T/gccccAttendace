export const SectionCard = ({ title, description, children }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
                    {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
                </div>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
};

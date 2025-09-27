export const TabContentErrorBoundary = ({ children, tabId }) => {
    try {
        return children;
    } catch (error) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-red-600 mb-2">Failed to load content</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                        Reload page
                    </button>
                </div>
            </div>
        );
    }
};
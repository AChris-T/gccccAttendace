import { useState } from "react";
import { CloseIcon } from "../../icons";

const variantStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
};

export default function Message({ variant = "info", data, onClose, className, message = null, actionButton = null }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleClose = () => {
        setVisible(false);
        onClose?.();
    };

    return (
        <div
            className={`relative p-4 mb-4 border animate-shake rounded-lg ${className} ${variantStyles[variant]} shadow`}
            role="alert"
        >
            <p className="font-medium text-sm truncate">{data?.message}</p>
            {message && <p className="font-medium text-sm truncate">{message}</p>}
            {data?.errors && (
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm wrap-break-word">
                    {Object.entries(data.errors).map(([field, messages]) => {
                        const msgs = Array.isArray(messages) ? messages : [messages];

                        return msgs.map((msg, i) => (
                            <li key={`${field}-${i}`}>
                                <span className="font-medium">{field}</span>: {String(msg)}
                            </li>
                        ));
                    })}
                </ul>
            )}

            {actionButton && actionButton}

            <button
                type="button"
                className="absolute top-2 right-2 text-lg leading-none"
                onClick={handleClose}
            >
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>
    );
}

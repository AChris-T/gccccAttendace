import Button from "@/components/ui/Button";
import { EditIcon2 } from "@/icons";

export const SectionCard = ({ title, icon: Icon, children, onEdit, isEdit = true }) => (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>
            {isEdit && <Button variant="neutral"
                onClick={onEdit}
            >
                <EditIcon2 className="h-5 w-5" />
            </Button>}

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {children}
        </div>
    </div>
);
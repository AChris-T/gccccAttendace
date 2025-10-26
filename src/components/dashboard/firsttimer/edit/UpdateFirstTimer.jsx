import Button from "@/components/ui/Button"
import { AlertTriangleIcon, ArchiveIcon, ArchiveRestoreIcon, UserIcon } from "@/icons";
import { Toast } from "@/lib/toastify";
import { useUpdateFirstTimer } from "@/queries/firstTimer.query";
import { useCallback, useState } from "react";

const UpdateFirstTimer = ({ firstTimerData, onClose }) => {
    const { mutateAsync: updateFirstTimer, isPending: isUpdateFirstTimerPending } = useUpdateFirstTimer();

    const [isStatusActive] = useState(firstTimerData?.status === 'active');

    const handleUpdateStatus = useCallback(async () => {
        try {
            const payload = {
                id: firstTimerData.id,
                status: isStatusActive ? 'deactivated' : 'active'
            };
            await updateFirstTimer(payload);
            onClose?.();
        } catch (error) {
            Toast.error(error?.data?.message);
        }
    }, [updateFirstTimer, firstTimerData.id, isStatusActive, onClose]);

    const actionText = isStatusActive ? 'Archive' : 'Restore';
    const actionColor = isStatusActive ? 'amber' : 'emerald';

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-6">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isStatusActive
                    ? 'bg-amber-100 dark:bg-amber-900/30'
                    : 'bg-emerald-100 dark:bg-emerald-900/30'
                    }`}>
                    {isStatusActive ? (
                        <ArchiveIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    ) : (
                        <ArchiveRestoreIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    )}
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {actionText} First Timer Record
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        This action will affect followup scheduling
                    </p>
                </div>
            </div>

            {/* User Info Card */}
            <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                            {firstTimerData?.first_name} {firstTimerData?.last_name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            Current Status: <span className={`font-medium ${isStatusActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'
                                }`}>{firstTimerData?.status}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Warning Message */}
            <div className={`p-4 rounded-lg border mb-6 ${isStatusActive
                ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
                : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                }`}>
                <div className="flex gap-3">
                    <AlertTriangleIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isStatusActive
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                        }`} />
                    <div className="flex-1">
                        <p className={`text-sm leading-relaxed ${isStatusActive
                            ? 'text-amber-900 dark:text-amber-200'
                            : 'text-emerald-900 dark:text-emerald-200'
                            }`}>
                            <span className="font-medium">{firstTimerData?.first_name}'s</span> record will be{' '}
                            <span className="font-semibold">{isStatusActive ? 'archived' : 'restored'}</span> and active followups will{' '}
                            <span className="font-semibold">{isStatusActive ? 'be paused' : 'resume'}</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                <Button
                    variant='ghost'
                    onClick={onClose}
                    disabled={isUpdateFirstTimerPending}
                    className="flex-1"
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleUpdateStatus}
                    loading={isUpdateFirstTimerPending}
                    variant="success"
                    className="flex-1"
                >
                    {!isUpdateFirstTimerPending && (
                        isStatusActive ? (
                            <ArchiveIcon className="w-4 h-4" />
                        ) : (
                            <ArchiveRestoreIcon className="w-4 h-4" />
                        )
                    )}
                    <span>{actionText} Record</span>
                </Button>
            </div>
        </div>
    );
};
export default UpdateFirstTimer
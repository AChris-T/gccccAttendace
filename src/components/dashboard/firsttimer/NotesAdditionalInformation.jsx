import { SectionCard } from "@/components/dashboard/firsttimer/SectionCard"
import { ClipboardListIcon, MessageSquareIcon, PhoneIcon } from "@/icons"

const NotesAdditionalInformation = ({ firstTimerData }) => {
    return (
        <SectionCard title="Notes & Additional Information" icon={ClipboardListIcon} onEdit={() => console.log('Edit notes')}>
            <div className="col-span-2">
                <div className="flex items-start gap-2 mb-2">
                    <PhoneIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Pastorate Call Report
                    </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    {firstTimerData.pastorate_call}
                </p>
            </div>
            <div className="col-span-2">
                <div className="flex items-start gap-2 mb-2">
                    <ClipboardListIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Visitation Report
                    </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    {firstTimerData.visitation_report}
                </p>
            </div>
            <div className="col-span-2">
                <div className="flex items-start gap-2 mb-2">
                    <MessageSquareIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Notes
                    </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    {firstTimerData.notes}
                </p>
            </div>
        </SectionCard>
    )
}

export default NotesAdditionalInformation
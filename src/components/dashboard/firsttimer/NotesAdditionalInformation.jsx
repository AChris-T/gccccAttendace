import EditNotesAdditionalInformation from "@/components/dashboard/firsttimer/edit/EditNotesAdditionalInformation";
import { SectionCard } from "@/components/dashboard/firsttimer/SectionCard"
import Modal from "@/components/ui/Modal";
import { useModal } from "@/hooks/useModal";
import { ClipboardListIcon, MessageSquareIcon, PhoneIcon } from "@/icons"

const NotesAdditionalInformation = ({ firstTimerData }) => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <>
            <SectionCard title="Notes & Additional Information" icon={ClipboardListIcon} onEdit={openModal}>
                <div className="col-span-2">
                    <div className="flex items-start gap-2 mb-2">
                        <PhoneIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Pastorate Call Report
                        </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
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
                    <p className="text-xs text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
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
                    <p className="text-xs text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                        {firstTimerData.notes}
                    </p>
                </div>
            </SectionCard>
            <Modal
                title={`Edit ${firstTimerData?.full_name}`}
                isOpen={isOpen}
                onClose={closeModal}
            >
                <EditNotesAdditionalInformation firstTimerData={firstTimerData} onClose={closeModal} />
            </Modal>
        </>
    )
}

export default NotesAdditionalInformation
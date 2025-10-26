import { useState } from 'react';
import EditNotesAdditionalInformation from "@/components/dashboard/firsttimer/edit/EditNotesAdditionalInformation";
import { SectionCard } from "@/components/dashboard/firsttimer/SectionCard";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/hooks/useModal";
import { ClipboardListIcon, MessageSquareIcon, PhoneIcon } from "@/icons";

const TruncatedText = ({ text, maxLength = 150, className = "" }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = text && text.length > maxLength;
    const displayText = shouldTruncate && !isExpanded
        ? text.slice(0, maxLength) + '...'
        : text;

    if (!text) return <p className={className}>N/A</p>;

    return (
        <div className="relative">
            <p className={className}>
                {displayText}
            </p>
            {shouldTruncate && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute bottom-0 right-0 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-gray-50 dark:bg-gray-700/50 px-2 py-0.5 rounded transition-all duration-200 hover:shadow-sm"
                    style={{
                        transform: isExpanded ? 'translateY(100%)' : 'translateY(0)',
                        marginTop: isExpanded ? '8px' : '0'
                    }}
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

const NotesAdditionalInformation = ({ firstTimerData }) => {
    const { isOpen, openModal, closeModal } = useModal();

    const textClasses = "text-xs text-gray-700 dark:text-gray-300 ml-6 leading-relaxed bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg transition-all duration-300";

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
                    <TruncatedText
                        text={firstTimerData.pastorate_call}
                        maxLength={150}
                        className={textClasses}
                    />
                </div>
                <div className="col-span-2">
                    <div className="flex items-start gap-2 mb-2">
                        <ClipboardListIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Visitation Report
                        </span>
                    </div>
                    <TruncatedText
                        text={firstTimerData.visitation_report}
                        maxLength={150}
                        className={textClasses}
                    />
                </div>
                <div className="col-span-2">
                    <div className="flex items-start gap-2 mb-2">
                        <MessageSquareIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Notes
                        </span>
                    </div>
                    <TruncatedText
                        text={firstTimerData.notes}
                        maxLength={150}
                        className={textClasses}
                    />
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
    );
};

export default NotesAdditionalInformation;
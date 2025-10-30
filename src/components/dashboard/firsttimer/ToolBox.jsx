import { useState, useCallback, useMemo } from "react";
import EditFirstTimer from "@/components/dashboard/firsttimer/edit/EditFirstTimer";
import ButtonCard from "@/components/ui/ButtonCard";
import Modal from "@/components/ui/modal/Modal";
import { useModal } from "@/hooks/useModal";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    EditIcon2,
    MessageSquareIcon,
    SendIcon,
    ToolboxIcon,
    WhatsAppIcon
} from "@/icons";
import { Toast } from "@/lib/toastify";
import { getWelcomeMessage, normalizePhone } from "@/utils/helper";
import { useFirstTimerWelcomeEmail } from "@/queries/firstTimer.query";
import UpdateFirstTimer from "@/components/dashboard/firsttimer/edit/UpdateFirstTimer";

const COPY_TIMEOUT_MS = 2000;
const MESSAGE_TYPES = {
    EMAIL: 'email',
    SMS: 'sms'
};

const ToolBox = ({ firstTimerData }) => {
    const { mutate: sendWelcomeEmailMutation, isPending: isSendingEmail } = useFirstTimerWelcomeEmail();

    const {
        isOpen: isOpenUpdateStatusModal,
        openModal: openUpdateStatusModal,
        closeModal: closeUpdateStatusModal,
    } = useModal();

    const {
        isOpen: isOpenEditModal,
        openModal: openEditModal,
        closeModal: closeEditModal,
    } = useModal();

    const [copied, setCopied] = useState(false);
    const [toolboxOpen, setToolboxOpen] = useState(true);
    const [messageType, setMessageType] = useState(MESSAGE_TYPES.EMAIL);

    // Computed values
    const isStatusActive = useMemo(
        () => firstTimerData?.status === 'active',
        [firstTimerData?.status]
    );

    const isDeactivated = useMemo(
        () => firstTimerData?.status === 'deactivated',
        [firstTimerData?.status]
    );

    const canSendWelcomeEmail = useMemo(
        () => firstTimerData?.follow_up_status?.title === 'Not Contacted',
        [firstTimerData?.follow_up_status?.title]
    );

    const welcomeMessageEmail = useMemo(
        () => getWelcomeMessage(firstTimerData?.first_name),
        [firstTimerData?.first_name]
    );

    const welcomeMessageSMS = useMemo(
        () => getWelcomeMessage(firstTimerData?.first_name, 'sms'),
        [firstTimerData?.first_name]
    );

    const currentWelcomeMessage = useMemo(
        () => messageType === MESSAGE_TYPES.EMAIL ? welcomeMessageEmail : welcomeMessageSMS,
        [messageType, welcomeMessageEmail, welcomeMessageSMS]
    );

    const whatsappLink = useMemo(
        () =>
            `https://wa.me/${normalizePhone(firstTimerData?.phone_number)}?text=${encodeURIComponent(
                welcomeMessageEmail
            )}`,
        [firstTimerData?.phone_number, welcomeMessageEmail]
    );

    const statusButtonConfig = useMemo(() => ({
        color: isStatusActive ? 'red' : 'cyan',
        label: isStatusActive ? 'Deactivate' : 'Activate',
        description: `${firstTimerData?.first_name}'s record will be ${isStatusActive ? 'archived' : 'un-archived'
            } and active followups will ${isStatusActive ? 'be paused.' : 'resume.'
            }`
    }), [isStatusActive, firstTimerData?.first_name]);

    // Event handlers
    const toggleToolbox = useCallback(() => {
        setToolboxOpen(prev => !prev);
    }, []);

    const toggleMessageType = useCallback(() => {
        setMessageType(prev =>
            prev === MESSAGE_TYPES.EMAIL ? MESSAGE_TYPES.SMS : MESSAGE_TYPES.EMAIL
        );
    }, []);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(currentWelcomeMessage);
            setCopied(true);
            Toast.default("Welcome message has been copied");
            setTimeout(() => setCopied(false), COPY_TIMEOUT_MS);
        } catch (error) {
            Toast.error("Failed to copy message");
        }
    }, [currentWelcomeMessage]);

    const handleSendWelcomeEmail = useCallback(() => {
        if (!canSendWelcomeEmail) return;

        const payload = {
            id: firstTimerData.id,
            email: firstTimerData.email,
            name: firstTimerData.first_name
        };

        sendWelcomeEmailMutation(payload);
    }, [canSendWelcomeEmail, firstTimerData, sendWelcomeEmailMutation]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            copyToClipboard();
        }
    }, [copyToClipboard]);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm border border-indigo-200 dark:border-gray-700 overflow-hidden">
            {/* Toolbox Header */}
            <button
                onClick={toggleToolbox}
                className="w-full p-6 flex items-center justify-between hover:bg-indigo-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                aria-expanded={toolboxOpen}
                aria-controls="toolbox-content"
                aria-label={`${toolboxOpen ? 'Collapse' : 'Expand'} action toolbox`}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <ToolboxIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Action Toolbox
                    </h2>
                </div>
                <div className="transition-transform duration-300 ease-in-out">
                    <ChevronDownIcon className={`w-5 h-5 text-gray-600 dark:text-gray-400 transform transition-transform duration-300 ${toolboxOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>
            </button>

            {/* Toolbox Content with Smooth Animation */}
            <div
                id="toolbox-content"
                className={`transition-all duration-300 ease-in-out overflow-hidden ${toolboxOpen
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-6 pt-0">
                    {/* Action Buttons Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <ButtonCard
                            color="indigo"
                            icon={<SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description="Compose welcome message"
                            onClick={handleSendWelcomeEmail}
                            loading={isSendingEmail}
                            disabled={!canSendWelcomeEmail || isDeactivated}
                        >
                            Send Welcome Email
                        </ButtonCard>

                        <ButtonCard
                            color="green"
                            icon={<WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description="Send via WhatsApp"
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            disabled={isDeactivated}
                        >
                            WhatsApp Message
                        </ButtonCard>

                        <ButtonCard
                            color="purple"
                            icon={<EditIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description="Change Follow-up Status, Reassign to Member"
                            onClick={openEditModal}
                            disabled={isDeactivated}
                        >
                            Update First Timer
                        </ButtonCard>

                        <ButtonCard
                            color={statusButtonConfig.color}
                            icon={<CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description={statusButtonConfig.description}
                            onClick={openUpdateStatusModal}
                        >
                            {statusButtonConfig.label} First Timer
                        </ButtonCard>
                    </div>

                    {/* Welcome Message Preview */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <MessageSquareIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                    Welcome Message Preview
                                </span>
                                {copied && (
                                    <span className="inline-block text-xs text-green-600 dark:text-green-400 font-medium animate-fade-in">
                                        ✓ Copied!
                                    </span>
                                )}
                            </div>

                            {/* Message Type Toggle */}
                            <button
                                onClick={toggleMessageType}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-100 dark:bg-gray-600 hover:bg-indigo-200 dark:hover:bg-gray-500 transition-colors duration-150"
                                aria-label="Toggle message type"
                            >
                                <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                                    {messageType === MESSAGE_TYPES.EMAIL ? 'Email' : 'SMS'}
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${messageType === MESSAGE_TYPES.EMAIL
                                        ? 'bg-indigo-600 dark:bg-indigo-400'
                                        : 'bg-gray-400 dark:bg-gray-500'
                                        }`} />
                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${messageType === MESSAGE_TYPES.SMS
                                        ? 'bg-indigo-600 dark:bg-indigo-400'
                                        : 'bg-gray-400 dark:bg-gray-500'
                                        }`} />
                                </div>
                            </button>
                        </div>

                        <div
                            onClick={copyToClipboard}
                            className="cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-48 overflow-y-auto hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-150"
                            role="button"
                            tabIndex={0}
                            onKeyDown={handleKeyDown}
                            aria-label={`Click to copy ${messageType} welcome message`}
                        >
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                {currentWelcomeMessage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                title={`Update ${firstTimerData?.full_name}'s status`}
                isOpen={isOpenUpdateStatusModal}
                onClose={closeUpdateStatusModal}
            >
                <UpdateFirstTimer
                    firstTimerData={firstTimerData}
                    onClose={closeUpdateStatusModal}
                />
            </Modal>

            <Modal
                title={`Edit ${firstTimerData?.full_name}`}
                isOpen={isOpenEditModal}
                onClose={closeEditModal}
            >
                <EditFirstTimer
                    firstTimerData={firstTimerData}
                    onClose={closeEditModal}
                />
            </Modal>
        </div>
    );
};

export default ToolBox;
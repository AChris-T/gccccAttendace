import { useState, useCallback, useMemo } from "react";
import DeleteConfirmation from "@/components/dashboard/firsttimer/DeleteConfirmation";
import EditFirstTimer from "@/components/dashboard/firsttimer/edit/EditFirstTimer";
import ButtonCard from "@/components/ui/ButtonCard";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/hooks/useModal";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    EditIcon2,
    MessageSquareIcon,
    SendIcon,
    ToolboxIcon,
    TrashIcon,
    WhatsAppIcon,
} from "@/icons";
import { Toast } from "@/lib/toastify";
import { getWelcomeMessage, normalizePhone } from "@/utils/helper";

const COPY_TIMEOUT_MS = 2000;

const ToolBox = ({ firstTimerData }) => {
    const {
        isOpen: isOpenDeleteModal,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
    } = useModal();
    const {
        isOpen: isOpenEditModal,
        openModal: openEditModal,
        closeModal: closeEditModal,
    } = useModal();

    const [copied, setCopied] = useState(false);
    const [toolboxOpen, setToolboxOpen] = useState(true);

    const welcomeMessage = useMemo(
        () => getWelcomeMessage(firstTimerData.first_name),
        [firstTimerData.first_name]
    );

    const whatsappLink = useMemo(
        () =>
            `https://wa.me/${normalizePhone(firstTimerData.phone_number)}?text=${encodeURIComponent(
                welcomeMessage
            )}`,
        [firstTimerData.phone_number, welcomeMessage]
    );

    // Callbacks
    const toggleToolbox = useCallback(() => {
        setToolboxOpen((prev) => !prev);
    }, []);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(welcomeMessage);
            setCopied(true);
            Toast.info("Welcome message has been copied");
            setTimeout(() => setCopied(false), COPY_TIMEOUT_MS);
        } catch (error) {
            Toast.error("Failed to copy message");
        }
    }, [welcomeMessage]);

    const sendWelcomeEmail = useCallback(() => {
        console.log("Send welcome email to:", firstTimerData.email);
    }, [firstTimerData.email]);

    const handleDelete = useCallback(() => {
        console.log("Delete record:", firstTimerData.id);
    }, [firstTimerData.id]);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-sm border border-indigo-200 dark:border-gray-700 overflow-hidden mb-5">
            {/* Toolbox Header */}
            <button
                onClick={toggleToolbox}
                className="w-full p-6 flex items-center justify-between hover:bg-indigo-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                aria-expanded={toolboxOpen}
                aria-controls="toolbox-content"
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
                    {toolboxOpen ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
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
                            onClick={sendWelcomeEmail}
                            loading={false}
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
                        >
                            WhatsApp Message
                        </ButtonCard>

                        <ButtonCard
                            color="purple"
                            icon={<EditIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description="Change Follow-up Status, Reassign to Member"
                            onClick={openEditModal}
                        >
                            Update First Timer
                        </ButtonCard>

                        <ButtonCard
                            color="red"
                            icon={<TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description="This action cannot be reversed"
                            onClick={openDeleteModal}
                            loading={false}
                        >
                            Delete First Timer
                        </ButtonCard>
                    </div>

                    {/* Welcome Message Preview */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquareIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                Welcome Message Preview
                            </span>
                        </div>
                        <div
                            onClick={copyToClipboard}
                            className="cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-48 overflow-y-auto hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-150"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    copyToClipboard();
                                }
                            }}
                            aria-label="Click to copy welcome message"
                        >
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                {welcomeMessage}
                            </p>
                            {copied && (
                                <span className="inline-block mt-2 text-xs text-green-600 dark:text-green-400 font-medium animate-fade-in">
                                    ✓ Copied!
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                title={`Delete ${firstTimerData?.name}`}
                isOpen={isOpenDeleteModal}
                onClose={closeDeleteModal}
            >
                <DeleteConfirmation onConfirm={handleDelete} />
            </Modal>

            <Modal
                title={`Edit ${firstTimerData?.name}`}
                isOpen={isOpenEditModal}
                onClose={closeEditModal}
            >
                <EditFirstTimer firstTimerData={firstTimerData} />
            </Modal>
        </div>
    );
};

export default ToolBox;
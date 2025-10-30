import { useState, useCallback, useMemo } from "react";
import ButtonCard from "@/components/ui/ButtonCard";
import Modal from "@/components/ui/modal/Modal";
import { useModal } from "@/hooks/useModal";
import {
    CheckIcon,
    ChevronDownIcon,
    EditIcon2,
    PhoneIcon2,
    ToolboxIcon,
    WhatsAppIcon
} from "@/icons";
import { normalizePhone } from "@/utils/helper";
import AssignMember from "@/components/dashboard/members/AssignMember";
import { useAuthStore } from "@/store/auth.store";
import UpdateMemberStatus from "@/components/dashboard/members/UpdateMemberStatus";


const MemberToolbox = ({ memberData }) => {
    const { isOpen: isOpenUpdateStatusModal, openModal: openUpdateStatusModal, closeModal: closeUpdateStatusModal } = useModal();
    const { isOpen, openModal, closeModal, } = useModal();
    const { isAdmin } = useAuthStore();

    const [toolboxOpen, setToolboxOpen] = useState(true);

    const isStatusActive = useMemo(
        () => memberData?.status === 'active',
        [memberData?.status]
    );

    const whatsappLink = useMemo(
        () => `https://wa.me/${normalizePhone(memberData?.phone_number)}?text=${encodeURIComponent('Hello')}`,
        [memberData?.phone_number]
    );

    const statusButtonConfig = useMemo(() => ({
        color: isStatusActive ? 'red' : 'cyan',
        label: isStatusActive ? 'Deactivate' : 'Activate',
        description: `${memberData?.first_name}'s record will be ${isStatusActive ? 'archived' : 'un-archived'
            } and active followups will ${isStatusActive ? 'be paused.' : 'resume.'
            }`
    }), [isStatusActive, memberData?.first_name]);

    const toggleToolbox = useCallback(() => {
        setToolboxOpen(prev => !prev);
    }, []);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-sm border border-indigo-200 dark:border-gray-700 overflow-hidden">
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
                <div>
                    <ChevronDownIcon className={`transition-transform duration-300 ease-in-out w-5 h-5 text-gray-600 dark:text-gray-400 ${toolboxOpen ? 'rotate-180' : 'rotate-0'}`} />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        <ButtonCard
                            color="green"
                            icon={<WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description="Send via WhatsApp"
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            disabled={memberData?.status == 'deactivated'}
                        >
                            WhatsApp Message
                        </ButtonCard>

                        <ButtonCard
                            color="blue"
                            icon={<PhoneIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description=""
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            disabled={memberData?.status == 'deactivated'}
                        >
                            Phone Call
                        </ButtonCard>

                        <ButtonCard
                            color="purple"
                            icon={<EditIcon2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description="Assign to a new member to followup"
                            onClick={openModal}
                            disabled={memberData?.status == 'deactivated' || !isAdmin}
                        >
                            Assign Member
                        </ButtonCard>

                        <ButtonCard
                            color={statusButtonConfig.color}
                            icon={<CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            description={statusButtonConfig.description}
                            onClick={openUpdateStatusModal}
                            disabled={!isAdmin}
                        >
                            {statusButtonConfig.label} Member
                        </ButtonCard>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                title={`Update ${memberData?.full_name}'s status`}
                isOpen={isOpenUpdateStatusModal}
                onClose={closeUpdateStatusModal}
            >
                <UpdateMemberStatus
                    memberData={memberData}
                    onClose={closeUpdateStatusModal}
                />
            </Modal>

            <Modal
                title={`Edit ${memberData?.full_name}`}
                isOpen={isOpen}
                onClose={closeModal}
            >
                <AssignMember
                    memberData={memberData}
                    onClose={closeModal}
                />
            </Modal>
        </div >
    );
};

export default MemberToolbox;
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail } from 'lucide-react';

// Components
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import Modal from '@/components/ui/modal/Modal';
import Button from '@/components/ui/Button';
import ButtonCard from '@/components/ui/ButtonCard';
import InputForm from '@/components/form/useForm/InputForm';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import RadioForm from '@/components/form/useForm/RadioForm';
import RoleSelection from '@/components/admin/members/RoleSelection';

// Hooks & Utils
import { useModal } from '@/hooks/useModal';
import { useMembersByRole } from '@/queries/member.query';
import { useSendBulkMail } from '@/queries/mail.query';

// ============================================================================
// CONSTANTS
// ============================================================================

const INITIAL_VALUES = {
    template_id: '',
    user_ids: [],
    use_merge_info: false,
};

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const SendMailSchema = yup.object().shape({
    template_id: yup
        .string()
        .required('Email template is required')
        .trim(),
    user_ids: yup
        .array()
        .of(yup.number().positive())
        .min(1, 'At least one recipient is required')
        .required('Recipients are required'),
    use_merge_info: yup
        .boolean()
        .required('Please select merge info option'),
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Transform members data to select options
 * @param {Array} members - Array of member objects
 * @returns {Array} - Array of option objects {value, text}
 */
const transformMembersToOptions = (members) => {
    if (!Array.isArray(members) || members.length === 0) return [];

    return members.map(member => ({
        value: member.id,
        text: member.full_name || `${member.first_name} ${member.last_name}`,
    }));
};

/**
 * Get role display label
 * @param {string} role - Role value
 * @returns {string} - Formatted role label
 */
const getRoleLabel = (role) => {
    const roleLabels = {
        all: 'All Users',
        admin: 'Admins',
        leader: 'Leaders',
        member: 'Members',
        firstTimer: 'First Timers',
        pastor: 'Pastors',
        gloryTeam: 'Glory Team',
        nonGloryTeam: 'Non-Glory Team',
    };

    return roleLabels[role] || 'Users';
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const SendMailToMembers = () => {
    const {
        isOpen: isOpenModal,
        openModal,
        closeModal
    } = useModal();

    return (
        <>
            <ButtonCard
                onClick={openModal}
                color="orange"
                type="button"
                icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
                description="Send email to pastor, admin, leader, member and all users."
            >
                Send Mail
            </ButtonCard>

            <Modal
                maxWidth="max-w-4xl"
                title="Send Mail to Members"
                description="Select recipients and email template to send bulk emails."
                isOpen={isOpenModal}
                onClose={closeModal}
            >
                <SendMailForm onClose={closeModal} />
            </Modal>
        </>
    );
};

// ============================================================================
// FORM COMPONENT
// ============================================================================

const SendMailForm = ({ onClose }) => {
    // ========================================
    // STATE
    // ========================================
    const [selectedRole, setSelectedRole] = useState('all');

    // ========================================
    // FORM SETUP
    // ========================================
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(SendMailSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange',
    });

    // Watch template_id for display purposes
    const templateId = watch('template_id');

    // ========================================
    // QUERIES & MUTATIONS
    // ========================================
    const {
        data: members = [],
        isLoading: isLoadingMembers,
        isError: isMembersError,
        error: membersError
    } = useMembersByRole({ role: selectedRole });

    const {
        mutateAsync: sendBulkMail,
        isPending: isSending
    } = useSendBulkMail({
        onSuccess: () => {
            onClose?.();
        }
    });

    // ========================================
    // DERIVED DATA
    // ========================================
    const userOptions = useMemo(() =>
        transformMembersToOptions(members),
        [members]
    );

    const roleLabel = useMemo(() =>
        getRoleLabel(selectedRole),
        [selectedRole]
    );

    const isFormDisabled = isSending || isSubmitting;
    const hasNoRecipients = !isLoadingMembers && userOptions.length === 0;

    // ========================================
    // EVENT HANDLERS
    // ========================================

    /**
     * Handle role change
     * Clears selected user_ids when role changes
     */
    const handleRoleChange = useCallback((role) => {
        setSelectedRole(role);
        setValue('user_ids', [], { shouldValidate: false });
    }, [setValue]);

    /**
     * Handle form submission
     * Sends email to selected users with specified template
     */
    const onSubmit = useCallback(async (formData) => {
        try {
            const payload = {
                template_id: formData.template_id.trim(),
                user_ids: formData.user_ids,
                use_merge_info: formData.use_merge_info === 'true' || formData.use_merge_info === true,
            };

            await sendBulkMail(payload);
        } catch (error) {
            // Error handling is done in the mutation hook
            console.error('Failed to send bulk mail:', error);
        }
    }, [sendBulkMail]);

    /**
     * Handle cancel
     */
    const handleCancel = useCallback(() => {
        if (!isFormDisabled) {
            onClose?.();
        }
    }, [onClose, isFormDisabled]);

    // ========================================
    // RENDER HELPERS
    // ========================================
    const getRecipientPlaceholder = () => {
        if (isLoadingMembers) return "Loading recipients...";
        if (hasNoRecipients) return `No ${roleLabel.toLowerCase()} available`;
        return "Select recipients...";
    };

    // ========================================
    // RENDER
    // ========================================
    return (
        <Animated animation="fade-up" className="space-y-5 w-full">
            {/* Error Messages */}
            {isMembersError && (
                <Message
                    data={{
                        message: membersError?.message || 'Failed to load recipients'
                    }}
                    variant="error"
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Template ID Input */}
                <div className="w-full">
                    <InputForm
                        label="Email Template ID"
                        expandParent
                        name="template_id"
                        register={register}
                        error={errors.template_id?.message}
                        disabled={isFormDisabled}
                        placeholder="Enter template ID (e.g., welcome-email)"
                        required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                        The unique identifier for the email template to use.
                    </p>
                </div>

                {/* Role Selection */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Recipient Group
                    </label>
                    <RoleSelection
                        selectedRole={selectedRole}
                        onRoleChange={handleRoleChange}
                        disabled={isFormDisabled}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Choose a group to filter available recipients. Currently showing: <strong>{roleLabel}</strong>
                    </p>
                </div>

                {/* Recipients Selection */}
                <div className="w-full">
                    <MultiSelectForm
                        label={`Select Recipients (${roleLabel})`}
                        expandParent
                        name="user_ids"
                        options={userOptions}
                        register={register}
                        setValue={setValue}
                        error={errors.user_ids?.message}
                        disabled={isFormDisabled || isLoadingMembers || hasNoRecipients}
                        placeholder={getRecipientPlaceholder()}
                        required
                    />

                    {/* Loading State */}
                    {isLoadingMembers && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1.5 flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading {roleLabel.toLowerCase()}...
                        </p>
                    )}

                    {/* No Recipients Warning */}
                    {hasNoRecipients && (
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            No {roleLabel.toLowerCase()} available. Try selecting a different group.
                        </p>
                    )}
                </div>

                {/* Merge Info Option */}
                <div className="w-full">
                    <RadioForm
                        label="Use Merge Info"
                        name="use_merge_info"
                        register={register}
                        error={errors.use_merge_info?.message}
                        disabled={isFormDisabled}
                        description="Enable this to include personalized member information (name, email, etc.) in the email template."
                        layout="grid"
                        required
                        options={[
                            {
                                value: 'true',
                                label: 'Yes',
                                description: 'Include member merge fields in email'
                            },
                            {
                                value: 'false',
                                label: 'No',
                                description: 'Send generic email without merge fields'
                            }
                        ]}
                    />
                </div>

                {/* Summary Info */}
                {templateId && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                    Ready to Send
                                </h4>
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    Template: <code className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded text-blue-900 dark:text-blue-100">{templateId}</code>
                                </p>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                    Recipients: {watch('user_ids')?.length || 0} selected
                                </p>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                    Merge Info: <strong>{watch('use_merge_info') === 'true' ? 'Enabled' : 'Disabled'}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleCancel}
                        disabled={isFormDisabled}
                        className="flex-1"
                        aria-label="Cancel email sending"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="success"
                        loading={isFormDisabled}
                        disabled={isFormDisabled || isMembersError || hasNoRecipients}
                        className="flex-1"
                        aria-label="Send email"
                    >
                        {isFormDisabled ? 'Sending...' : 'Send Email'}
                    </Button>
                </div>
            </form>
        </Animated>
    );
};

export default SendMailToMembers;
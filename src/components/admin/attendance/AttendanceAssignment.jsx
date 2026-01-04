import { useCallback, useMemo, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-multi-date-picker';
import { Calendar } from 'lucide-react';

// Components
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import Button from '@/components/ui/Button';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import RoleSelection from '@/components/admin/members/RoleSelection';

// Hooks & Utils
import { useAssignAbsenteesToLeaders } from '@/queries/attendance.query';
import { useMembersByRole } from '@/queries/member.query';
import { getMatchingServiceId } from '@/utils/helper';
import { assignAbsentMemberSchema } from '@/schema';
import { Toast } from '@/lib/toastify';

// ============================================================================
// CONSTANTS
// ============================================================================

const INITIAL_VALUES = {
    attendance_date: null,
    leader_ids: []
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Transform members data to select options with units
 * @param {Array} members - Array of member objects
 * @returns {Array} - Array of option objects {value, text}
 */
const transformMembersToOptions = (members) => {
    if (!Array.isArray(members) || members.length === 0) return [];

    return members.map(member => {
        const fullName = member.full_name || `${member.first_name} ${member.last_name}`;

        // Only show units if member is a glory team member
        if (member.is_glory_team_member) {
            const units = member.units && Array.isArray(member.units) && member.units.length > 0
                ? member.units.map(unit => unit.name).join(', ')
                : 'No Unit';

            return {
                value: member.id,
                text: `${fullName} • ${units}`,
                subtitle: units,
            };
        }

        // For non-glory team members, show name only
        return {
            value: member.id,
            text: fullName,
        };
    });
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

/**
 * Format date for display
 * @param {string} date - Date string
 * @returns {string} - Formatted date
 */
const formatDateDisplay = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AttendanceAssignment = ({ services = [], onClose }) => {
    // ========================================
    // STATE
    // ========================================
    const [selectedRole, setSelectedRole] = useState('leader');

    // ========================================
    // FORM SETUP
    // ========================================
    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        setError,
        clearErrors,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(assignAbsentMemberSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange'
    });

    // Watch form values
    const attendanceDate = watch('attendance_date');
    const leaderIds = watch('leader_ids');

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
        mutateAsync: assignAbsenteesToLeaders,
        isPending: isAssigning,
        isError: isAssignError,
        error: assignError,
        isSuccess: isAssignSuccess
    } = useAssignAbsenteesToLeaders();

    // ========================================
    // EFFECTS
    // ========================================
    useEffect(() => {
        if (isAssignSuccess) {
            reset(INITIAL_VALUES);
            Toast.success('Absentees assigned successfully');
        }
    }, [isAssignSuccess, reset]);

    // ========================================
    // DERIVED DATA
    // ========================================
    const leaderOptions = useMemo(() =>
        transformMembersToOptions(members),
        [members]
    );

    const roleLabel = useMemo(() =>
        getRoleLabel(selectedRole),
        [selectedRole]
    );

    const isFormDisabled = isAssigning || isSubmitting;
    const hasNoLeaders = !isLoadingMembers && leaderOptions.length === 0;

    // ========================================
    // EVENT HANDLERS
    // ========================================

    /**
     * Handle role change
     * Clears selected leader_ids when role changes
     */
    const handleRoleChange = useCallback((role) => {
        setSelectedRole(role);
        setValue('leader_ids', [], { shouldValidate: false });
    }, [setValue]);

    /**
     * Handle date change
     */
    const handleDateChange = useCallback((date, onChange) => {
        if (errors.attendance_date) {
            clearErrors('attendance_date');
        }

        if (!date) {
            onChange(null);
            return;
        }

        const formattedDate = date.format("YYYY/MM/DD");
        onChange(formattedDate);
    }, [errors.attendance_date, clearErrors]);

    /**
     * Handle form submission
     */
    const onSubmit = useCallback(async (formData) => {
        try {
            const serviceId = getMatchingServiceId(services, formData.attendance_date);

            if (!serviceId) {
                setError('attendance_date', {
                    type: 'manual',
                    message: 'No service found for the selected date. Please select a valid service date.'
                });
                return;
            }

            const payload = {
                service_id: serviceId,
                attendance_date: formData.attendance_date,
                leader_ids: formData.leader_ids
            };

            await assignAbsenteesToLeaders(payload);
            onClose?.();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to assign absentees';
            Toast.error(errorMessage);
        }
    }, [services, assignAbsenteesToLeaders, setError, onClose]);

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
    const getLeaderPlaceholder = () => {
        if (isLoadingMembers) return "Loading members...";
        if (hasNoLeaders) return `No ${roleLabel.toLowerCase()} available`;
        return "Select members...";
    };

    // ========================================
    // RENDER
    // ========================================
    return (
        <Animated animation="fade-up" className="space-y-5 w-full">
            {/* Error Messages */}
            {isAssignError && (
                <Message
                    data={assignError?.data}
                    variant="error"
                />
            )}
            {isMembersError && (
                <Message
                    data={{
                        message: membersError?.message || 'Failed to load members'
                    }}
                    variant="error"
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Service Date Picker */}
                <div className="w-full">
                    <label
                        htmlFor="attendance_date"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Service Date <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="attendance_date"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                id="attendance_date"
                                containerStyle={{
                                    width: "100%"
                                }}
                                placeholder="Select Service date..."
                                value={value || null}
                                format="YYYY/MM/DD"
                                onChange={(date) => handleDateChange(date, onChange)}
                                disabled={isFormDisabled}
                                className={errors.attendance_date ? 'border-red-500' : ''}
                            />
                        )}
                    />
                    {errors.attendance_date && (
                        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                            {errors.attendance_date.message}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                        Select the service date to assign absentees from.
                    </p>
                </div>

                {/* Role Selection */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Filter by Role
                    </label>
                    <RoleSelection
                        selectedRole={selectedRole}
                        onRoleChange={handleRoleChange}
                        disabled={isFormDisabled}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Choose a group to filter available members. Currently showing: <strong>{roleLabel}</strong>
                    </p>
                </div>

                {/* Leaders/Members Selection */}
                <div className="w-full">
                    <MultiSelectForm
                        label={`Assign Absentees To (${roleLabel})`}
                        expandParent
                        name="leader_ids"
                        options={leaderOptions}
                        register={register}
                        setValue={setValue}
                        error={errors.leader_ids?.message}
                        disabled={isFormDisabled || isLoadingMembers || hasNoLeaders}
                        placeholder={getLeaderPlaceholder()}
                        required
                    />
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1.5">
                        💡 Glory Team members are displayed with their assigned units for easy identification.
                    </p>

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

                    {/* No Members Warning */}
                    {hasNoLeaders && (
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            No {roleLabel.toLowerCase()} available. Try selecting a different group.
                        </p>
                    )}
                </div>

                {/* Summary Info */}
                {attendanceDate && leaderIds?.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                    Assignment Summary
                                </h4>
                                <div className="space-y-1.5">
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Service Date: <strong>{formatDateDisplay(attendanceDate)}</strong>
                                    </p>
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Selected Members: <strong>{leaderIds?.length || 0}</strong> {roleLabel.toLowerCase()}
                                    </p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 italic">
                                        Absentees from this service will be assigned to the selected members for follow-up.
                                    </p>
                                </div>
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
                        aria-label="Cancel assignment"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="success"
                        loading={isFormDisabled}
                        disabled={isFormDisabled || isMembersError || hasNoLeaders}
                        className="flex-1"
                        aria-label="Assign absentees to members"
                    >
                        {isFormDisabled ? 'Assigning...' : 'Assign Absentees'}
                    </Button>
                </div>
            </form>
        </Animated>
    );
};

export default AttendanceAssignment;
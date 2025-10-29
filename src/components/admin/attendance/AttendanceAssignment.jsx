import { useCallback, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-multi-date-picker';
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import Button from '@/components/ui/Button';
import { useAssignAbsenteesToLeaders } from '@/queries/attendance.query';
import { useMembersByRole } from '@/queries/member.query';
import { UserRole } from '@/utils/constant';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';
import { getMatchingServiceId } from '@/utils/helper';
import { assignAbsentMemberSchema } from '@/schema';
import { Toast } from '@/lib/toastify';

const INITIAL_VALUES = {
    attendance_date: null,
    leader_ids: []
};

const AttendanceAssignment = ({ services = [], onClose }) => {
    const { data: members, isLoading: isLoadingMembers } = useMembersByRole(UserRole.LEADER);

    const {
        mutateAsync: assignAbsenteesToLeaders,
        isPending: isAssigning,
        isError: isAssignError,
        error: assignError,
        isSuccess: isAssignSuccess
    } = useAssignAbsenteesToLeaders();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(assignAbsentMemberSchema),
        defaultValues: INITIAL_VALUES,
        mode: 'onChange'
    });

    useEffect(() => {
        if (isAssignSuccess) {
            reset(INITIAL_VALUES);
            Toast.success('Absentees assigned successfully');
        }
    }, [isAssignSuccess, reset]);

    const leaderOptions = useMemo(() => {
        if (!members) return [];
        return members.map(leader => ({
            value: leader.id,
            text: leader.full_name
        }));
    }, [members]);

    const handleDateChange = useCallback((date, onChange) => {
        // Clear any existing date errors when user changes the date
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

    const isFormDisabled = isAssigning || isSubmitting;

    return (
        <Animated
            animation="fade-up"
            className="space-y-5 w-full"
        >
            {isAssignError && <Message data={assignError?.data} variant="error" />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label
                        htmlFor="attendance_date"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                            {errors.attendance_date.message}
                        </p>
                    )}
                </div>

                <div className="w-full">
                    <MultiSelectForm
                        label="Select Leaders"
                        expandParent
                        name="leader_ids"
                        options={leaderOptions}
                        register={register}
                        setValue={setValue}
                        error={errors.leader_ids?.message}
                        disabled={isLoadingMembers || isFormDisabled}
                        placeholder={isLoadingMembers ? "Loading leaders..." : "Select leaders..."}
                        required
                    />
                </div>

                <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
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
                        disabled={isFormDisabled}
                        className="flex-1"
                        aria-label="Assign absentees to leaders"
                    >
                        {isFormDisabled ? 'Assigning...' : 'Assign'}
                    </Button>
                </div>
            </form>
        </Animated>
    );
};

export default AttendanceAssignment;
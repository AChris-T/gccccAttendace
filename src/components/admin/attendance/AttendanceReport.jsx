import { useCallback, useMemo, useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import MultiSelect from '@/components/form/MultiSelect';
import Button from '@/components/ui/Button';
import { useAssignAbsenteesToLeaders, useMarkAbsentees } from '@/queries/attendance.query';
import { useMembersByRole } from '@/queries/member.query';
import { UserRole } from '@/utils/constant';
import { getMatchingServiceId } from '@/utils/helper';

const INITIAL_DATA = {
    service_id: null,
    attendance_date: null,
    leader_ids: []
};

const AttendanceReport = ({ services = [] }) => {
    const [data, setData] = useState(INITIAL_DATA);

    const { data: members, isLoading: isLoadingMembers } = useMembersByRole(UserRole.LEADER);

    const {
        mutate: markAbsentees,
        isPending: isMarkingAbsentees,
        isError: isMarkError,
        error: markError
    } = useMarkAbsentees();

    const {
        mutate: assignAbsenteesToLeaders,
        isPending: isAssigning,
        isError: isAssignError,
        error: assignError,
        isSuccess: isAssignSuccess
    } = useAssignAbsenteesToLeaders();

    useEffect(() => {
        if (isAssignSuccess) {
            setData(INITIAL_DATA);
        }
    }, [isAssignSuccess]);

    const leaderOptions = useMemo(() => {
        if (!members) return [];
        return members.map(leader => ({
            value: leader.id,
            text: leader.full_name
        }));
    }, [members]);

    const isFormValid = useMemo(() => {
        return data.service_id !== null && data.attendance_date !== null;
    }, [data.service_id, data.attendance_date]);

    const updateData = useCallback((key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleDateChange = useCallback((value) => {
        if (!value) {
            updateData('attendance_date', null);
            updateData('service_id', null);
            return;
        }

        const formattedDate = value.format("YYYY/MM/DD");
        const serviceId = getMatchingServiceId(services, formattedDate);

        setData(prev => ({
            ...prev,
            attendance_date: formattedDate,
            service_id: serviceId
        }));
    }, [services, updateData]);

    const handleMarkAbsentees = useCallback(() => {
        if (!isFormValid) return;
        markAbsentees(data);
    }, [data, isFormValid, markAbsentees]);

    const handleAssignAbsentees = useCallback(() => {
        if (!isFormValid) return;
        assignAbsenteesToLeaders(data);
    }, [data, isFormValid, assignAbsenteesToLeaders]);

    const isActionDisabled = !isFormValid || isMarkingAbsentees || isAssigning;

    return (
        <Animated
            animation="fade-up"
            className="md:w-1/2 lg:w-1/2 xl:w-2/5 bg-red-50 p-4 border border-red-300 dark:bg-gray-900 dark:border-red-700 rounded-lg shadow animate-fadeIn w-full transition-all duration-300"
        >
            <div className="flex gap-2">
                <div className="flex-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Service Date
                    </label>
                    <DatePicker
                        placeholder="Select Service date..."
                        value={data.attendance_date}
                        format="YYYY/MM/DD"
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            <div className="border-t border-b border-red-200 dark:border-red-800 py-4 mt-4">
                {isMarkError && <Message data={markError?.data} variant="error" />}

                <p className="text-red-600 dark:text-red-400 text-sm italic mb-2">
                    <strong>Admin Mark Attendance:</strong> Any user without a record will be automatically marked as <strong>Absent</strong>.
                </p>

                <Button
                    variant="danger"
                    onClick={handleMarkAbsentees}
                    loading={isMarkingAbsentees}
                    disabled={isActionDisabled}
                    className="w-full shadow"
                >
                    Mark as Absent
                </Button>
            </div>

            <div className="mt-3">
                {isAssignError && <Message data={assignError?.data} variant="error" />}

                <p className="text-red-600 dark:text-red-400 text-sm italic mb-2">
                    Assign absent members to leaders?
                </p>

                <div className="flex gap-2">
                    <div className="w-1/2">
                        <MultiSelect
                            label=""
                            name="leaders"
                            options={leaderOptions}
                            defaultValue={data.leader_ids}
                            onChange={(value) => updateData('leader_ids', value)}
                            disabled={isLoadingMembers}
                            placeholder="Select leaders..."
                        />
                    </div>
                    <div className="w-1/2">
                        <Button
                            variant="outline-danger"
                            onClick={handleAssignAbsentees}
                            loading={isAssigning}
                            disabled={isActionDisabled}
                            className="w-full shadow"
                        >
                            Assign to Leaders
                        </Button>
                    </div>
                </div>
            </div>
        </Animated>
    );
};

export default AttendanceReport;
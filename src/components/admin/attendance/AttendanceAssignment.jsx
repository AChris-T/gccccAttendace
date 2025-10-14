import { useCallback, useMemo, useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import MultiSelect from '@/components/form/MultiSelect';
import Button from '@/components/ui/Button';
import { useAssignAbsenteesToLeaders } from '@/queries/attendance.query';
import { useMembersByRole } from '@/queries/member.query';
import { UserRole } from '@/utils/constant';
import { getMatchingServiceId } from '@/utils/helper';
import { CloseIcon } from '@/icons';

const INITIAL_DATA = {
    service_id: null,
    attendance_date: null,
    leader_ids: []
};

const AttendanceAssignment = ({ services = [] }) => {
    const [data, setData] = useState(INITIAL_DATA);
    const { data: members, isLoading: isLoadingMembers } = useMembersByRole(UserRole.LEADER);
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
        return data.service_id !== null && data.attendance_date !== null && data.leader_ids?.length > 0;
    }, [data.service_id, data.attendance_date, data.leader_ids]);

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

    const handleAssignAbsentees = useCallback(() => {
        if (!isFormValid) return;
        assignAbsenteesToLeaders(data);
    }, [data, isFormValid, assignAbsenteesToLeaders]);

    const isActionDisabled = !isFormValid || isAssigning;

    return (
        <Animated
            animation="fade-up"
            className="md:w-1/2 lg:w-1/2 xl:w-1/4 bg-white p-4 border border-gray-300 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow animate-fadeIn w-full transition-all duration-300"
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

            <div className="border-t border-green-200 dark:border-green-800">
                <div className="bg-green-50 border border-green-200 rounded-xl p-2 my-5">
                    <div className="flex gap-1">
                        <div className="flex-shrink-0">
                            <CloseIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-green-900">Assign absent members to leaders</p>
                        </div>
                    </div>
                </div>

                <div className="w-full">
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
                <div className="w-full">
                    <Button
                        variant="success"
                        onClick={handleAssignAbsentees}
                        loading={isAssigning}
                        disabled={isActionDisabled}
                        className="w-full shadow"
                    >
                        Assign
                    </Button>
                </div>
                {isAssignError && <Message className='mt-3' data={assignError?.data} variant="error" />}
            </div>
        </Animated>
    );
};

export default AttendanceAssignment;
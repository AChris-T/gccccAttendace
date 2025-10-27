import { useCallback, useMemo, useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import Button from '@/components/ui/Button';
import { useAssignAbsenteesToLeaders } from '@/queries/attendance.query';
import { useMembersByRole } from '@/queries/member.query';
import { UserRole } from '@/utils/constant';
import { getMatchingServiceId } from '@/utils/helper';
import { CloseIcon } from '@/icons';
import MultiSelectForm from '@/components/form/useForm/MultiSelectForm';

const INITIAL_DATA = {
    service_id: null,
    attendance_date: null,
    leader_ids: []
};

const AttendanceAssignment = ({ services = [], onClose }) => {
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
            className=" bg-white space-y-5 dark:bg-gray-900 w-full"
        >
            {isAssignError && <Message className='mt-3' data={assignError?.data} variant="error" />}

            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <div className="flex gap-1">
                    <div className="shrink-0">
                        <CloseIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-green-900">Assign absent members to leaders</p>
                    </div>
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Service Date
                </label>
                <DatePicker
                    placeholder="Select Service date..."
                    value={data.attendance_date}
                    format="YYYY/MM/DD"
                    onChange={handleDateChange}
                />
            </div>


            <div className="w-full">
                <MultiSelectForm
                    label=""
                    name="leaders"
                    options={leaderOptions}
                    defaultValue={data.leader_ids}
                    onChange={(value) => updateData('leader_ids', value)}
                    disabled={isLoadingMembers}
                    placeholder="Select leaders..."
                />
            </div>

            <div className="flex gap-3 border-t pt-5 dark:border-gray-600">
                <Button
                    variant='ghost'
                    onClick={onClose}
                    disabled={isAssigning}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    variant="success"
                    onClick={handleAssignAbsentees}
                    loading={isAssigning}
                    disabled={isActionDisabled}
                    className="flex-1"
                >
                    Assign
                </Button>
            </div>
        </Animated>
    );
};

export default AttendanceAssignment;
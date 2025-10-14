import { useCallback, useMemo, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import Button from '@/components/ui/Button';
import { useMarkAbsentees } from '@/queries/attendance.query';
import { getMatchingServiceId } from '@/utils/helper';
import { CloseIcon } from '@/icons';

const INITIAL_DATA = {
    service_id: null,
    attendance_date: null,
};

const AttendanceMarkAbsent = ({ services = [] }) => {
    const [data, setData] = useState(INITIAL_DATA);
    const {
        mutate: markAbsentees,
        isPending: isMarkingAbsentees,
        isError: isMarkError,
        error: markError
    } = useMarkAbsentees();

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


    const isActionDisabled = !isFormValid || isMarkingAbsentees;

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

            <div className="border-t border-red-200 dark:border-red-800">
                {isMarkError && <Message data={markError?.data} variant="error" />}

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-2 my-5">
                    <div className="flex gap-1">
                        <div className="flex-shrink-0">
                            <CloseIcon className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                            <p className="text-sm text-rose-900">Admin Mark Absent Members.</p>
                        </div>
                    </div>
                </div>
                <Button
                    variant="danger"
                    onClick={handleMarkAbsentees}
                    loading={isMarkingAbsentees}
                    disabled={isActionDisabled}
                    className="w-full shadow"
                >
                    Mark
                </Button>
            </div>
        </Animated>
    );
};

export default AttendanceMarkAbsent;
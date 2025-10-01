import Animated from '@/components/common/Animated';
import Message from '@/components/common/Message';
import SingleSelect from '@/components/form/SingleSelect';
import Button from '@/components/ui/Button';
import { useAssignAbsenteesToLeaders, useMarkAbsentees } from '@/queries/attendance.query';
import { useCallback, useMemo, useState } from 'react';
import DatePicker from 'react-multi-date-picker';

const INITIAL_DATA = {
    service_id: null,
    date: null,
};

const AttendanceReport = ({ services = [] }) => {
    const [data, setData] = useState(INITIAL_DATA);

    // Queries
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
        error: assignError
    } = useAssignAbsenteesToLeaders();

    // Memoize service options
    const serviceOptions = useMemo(() =>
        services?.map(service => ({
            value: service.id,
            text: service.name
        })) || [],
        [services]
    );

    // Check if form is valid
    const isFormValid = useMemo(() =>
        data.service_id !== null && data.date !== null,
        [data.service_id, data.date]
    );

    // Optimized update handler
    const updateData = useCallback((key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    }, []);

    // Date change handler
    const handleDateChange = useCallback((value) => {
        if (value) {
            updateData('date', value.format("YYYY/MM/DD"));
        }
    }, [updateData]);

    // Mark absentees handler
    const handleMarkAbsentees = useCallback(() => {
        if (isFormValid) {
            markAbsentees(data);
        }
    }, [data, isFormValid, markAbsentees]);

    // Assign absentees handler
    const handleAssignAbsentees = useCallback(() => {
        if (isFormValid) {
            assignAbsenteesToLeaders(data);
        }
    }, [data, isFormValid, assignAbsenteesToLeaders]);

    return (
        <Animated
            animation="fade-up"
            className="md:w-1/2 lg:w-1/2 xl:w-1/4 bg-red-50 p-4 border border-red-300 dark:bg-gray-900 dark:border-red-700 rounded-lg shadow animate-fadeIn w-full transition-all duration-300"
        >
            {/* Form Section */}
            <div className="flex gap-2">
                {/* Date Picker */}
                <div className="flex-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Service Date
                    </label>
                    <DatePicker
                        placeholder="Select date"
                        value={data.date}
                        format="YYYY/MM/DD"
                        onChange={handleDateChange}
                    />
                </div>

                {/* Service Select */}
                <div className="flex-1">
                    <SingleSelect
                        label="Select Service"
                        name="service"
                        options={serviceOptions}
                        defaultValue={data.service_id}
                        onChange={(value) => updateData('service_id', value)}
                        placeholder="Select a service..."
                        searchable
                    />
                </div>
            </div>

            {/* Mark Absentees Section */}
            <div className="border-t border-b border-red-200 dark:border-red-800 py-4 mt-4">
                {isMarkError && <Message data={markError?.data} variant="error" />}

                <p className="text-red-600 dark:text-red-400 text-sm italic mb-2">
                    <strong>Admin Mark Attendance:</strong> Any user without a record will be automatically marked as <strong>Absent</strong>.
                </p>

                <Button
                    variant="danger"
                    onClick={handleMarkAbsentees}
                    loading={isMarkingAbsentees}
                    disabled={!isFormValid || isMarkingAbsentees}
                    className="w-full shadow"
                >
                    Mark as Absent
                </Button>
            </div>

            {/* Assign Absentees Section */}
            <div className="mt-3">
                {isAssignError && <Message data={assignError?.data} variant="error" />}

                <p className="text-red-600 dark:text-red-400 text-sm italic mb-2">
                    Assign absent members to leaders?
                </p>

                <Button
                    variant="outline-danger"
                    onClick={handleAssignAbsentees}
                    loading={isAssigning}
                    disabled={!isFormValid || isAssigning}
                    className="w-full shadow"
                >
                    Assign to Leaders
                </Button>
            </div>
        </Animated>
    );
};

export default AttendanceReport;
// import Animated from '@/components/common/Animated'
// import Message from '@/components/common/Message'
// import SingleSelect from '@/components/form/SingleSelect'
// import Button from '@/components/ui/Button'
// import { useAssignAbsenteesToLeaders, useMarkAbsentees } from '@/queries/attendance.query'
// import { useCallback, useState } from 'react'
// import DatePicker from 'react-multi-date-picker'

// const AttendanceReport = ({ services = [] }) => {
//     const { mutate, isPending, isError, error } = useMarkAbsentees()
//     const { mutate: assignAbsenteesToLeaders, isPending: assignIspending, isError: isAssignError, error: assignError } = useAssignAbsenteesToLeaders()

//     const [data, setData] = useState({
//         'service_id': null,
//         'date': null,
//     })
//     const serviceOptions = services?.map(service => ({
//         value: service.id,
//         text: service.name
//     }));
//     const updateData = useCallback((key, value) => {
//         const newData = { ...data, [key]: value };
//         setData(newData);
//     }, [data]);

//     const markAbsentees = () => {
//         mutate(data)
//     }

//     return (
//         <Animated animation='fade-up' className='md:w-1/2 lg:w-1/2 xl:w-1/4 bg-red-50 p-4 border border-red-300 dark:bg-gray-900  dark:border-red-700 rounded-lg shadow animate-fadeIn w-full transition-all duration-300'>
//             <div className='flex gap-2'>
//                 <div>
//                     <label
//                         className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
//                     >
//                         Service date
//                     </label>
//                     <DatePicker placeholder="Service date" value={data.date} format='YYYY/MM/DD'
//                         onChange={(value) => updateData('date', value.format("YYYY/MM/DD"))}
//                     />
//                 </div>
//                 <div>
//                     <SingleSelect
//                         label="Select Service"
//                         name="service"
//                         options={serviceOptions}
//                         defaultValue={data.service_id}
//                         onChange={(value) => updateData('service_id', value)}
//                         placeholder="Select a service..."
//                         searchable
//                     />
//                 </div>
//             </div>
//             <div className='border-t-1 border-b-1 py-4'>
//                 {isError && <Message data={error?.data} variant='error' />}
//                 <p className='text-red-400 text-sm italic'>
//                     <b>Admin Mark Attendance:</b> Any user without a record will be automatically marked as <b>Absent</b>.</p>
//                 <Button variant='danger' onClick={markAbsentees} loading={isPending} className='w-full mt-1 shadow'>Mark as absent</Button>
//             </div>
//             <div className='mt-3'>
//                 {isAssignError && <Message data={assignError?.data} variant='error' />}
//                 <p className='text-red-400 text-sm italic'>Assign absent members to leaders?</p>
//                 <Button variant='outline-danger' onClick={() => assignAbsenteesToLeaders(data)} loading={assignIspending} className='w-full mt-1 shadow'>Assign</Button>
//             </div>
//         </Animated>
//     )
// }

// export default AttendanceReport
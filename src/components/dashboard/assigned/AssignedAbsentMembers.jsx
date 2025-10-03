import { SkeletonTableLoader } from '@/components/skeleton';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { formatDate } from '@/utils/helper';
import { Link } from 'react-router-dom';

const AssignedAbsentMembers = ({ assignedMembers }) => {
    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">

                <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Assigned Members
                        </h3>
                        <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                            Here's a list of absent members assigned to you to follow up.
                        </p>
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    S/N
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Email
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Phone
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Gender
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Service
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Service Date
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {assignedMembers?.map((member, index) => (
                                <TableRow key={member.id} className="">
                                    <TableCell className="py-3">
                                        <Link to={`/dashboard/members/${member.id}`} target="_blank" className='text-gray-500 text-theme-sm dark:text-gray-400'>
                                            {index + 1}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Link to={`/dashboard/members/${member.id}`} target="_blank" className='hover:underline'>
                                            <div className="flex items-center gap-3">
                                                <Avatar />
                                                <p className="font-medium hover:text-blue-500 text-gray-800 text-theme-sm dark:text-white/90">
                                                    {member.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="py-3 text-blue-500 text-theme-sm dark:text-gray-400">
                                        <Link to={`mailto:${member.email}`}>{member.email}</Link>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Link to={`tel:${member.phone}`}>{member.phone}</Link>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={
                                                member?.gender === "Male"
                                                    ? "primary"
                                                    : member.gender === "Female"
                                                        ? "info"
                                                        : "error"
                                            }
                                        >
                                            {member?.gender || 'N/A'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <p> {member?.attendance?.service?.name}</p>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <p>{formatDate(member?.attendance?.attendance_date)}</p>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={
                                                member?.attendance?.status === "present"
                                                    ? "success"
                                                    : member.status === "absent"
                                                        ? "error"
                                                        : "error"
                                            }
                                        >
                                            {member?.attendance?.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default AssignedAbsentMembers
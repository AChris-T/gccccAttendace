import { SkeletonTableLoader } from "../skeleton"
import Avatar from '../../components/ui/Avatar'
import { Image, UserRole } from '../../utils/constant'
import Badge from "./Badge"

const DataTable = ({ values, loading }) => {
    if (loading) return <SkeletonTableLoader />
    return (
        <>
            {/* <div className="px-4 md:px-10 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <p tabIndex="0" className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Tasks</p>
                    <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option className="text-sm text-indigo-800">Latest</option>
                            <option className="text-sm text-indigo-800">Oldest</option>
                            <option className="text-sm text-indigo-800">Latest</option>
                        </select>
                    </div>
                </div>
            </div> */}
            {/* <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                            <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                        <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>Done</p>
                            </div>
                        </a>
                        <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>Pending</p>
                            </div>
                        </a>
                    </div>
                    <button onclick="popuphandler(true)" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <p className="text-sm font-medium leading-none text-white">Add Task</p>
                    </button>
                </div> */}

            <div className="overflow-x-auto bg-white">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-100 sticky">
                        <tr>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Id
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Name
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Email
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Phone Number
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Gender
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >City/State
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Address
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Community
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Unit
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Date of Birth
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Status
                            </th>
                            <th
                                className="px-4 py-2 border-b text-left font-semibold text-gray-700"
                            >Role
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {values?.map((value, index) => <>
                            <tr key={value.id + index} tabIndex={index} className="focus:outline-none h-14 border border-gray-100 rounded">
                                <td>
                                    <div className="ml-4">
                                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                            <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                            <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                                <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                                    <path d="M5 12l5 5l10 -10"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex items-center pl-5">
                                        <Avatar src={value?.avatar || Image} />
                                        <p className="text-base font-medium leading-none text-gray-700 ml-2">{value?.full_name} </p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.email}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.phone_number}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.gender}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.city_or_state}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.address}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.community}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.units}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.date_of_birth}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <p className="text-sm leading-none text-gray-600 ml-2">{value?.status}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <Badge size="sm"
                                            color={
                                                value.role == UserRole.ADMIN || value.role == UserRole.SUPER_ADMIN
                                                    ? "error"
                                                    : value.role == UserRole.LEADER
                                                        ? "warning"
                                                        : "info"
                                            } >{value?.role}</Badge>
                                    </div>
                                </td>
                            </tr>
                            <tr className="h-3"></tr>
                        </>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DataTable
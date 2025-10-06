import { UserIcon, UserIcon2 } from '@/icons';
import { useUnits } from '../../../queries/unit.query'
import { UnitCardSkeleton } from '../../skeleton'
import UnitCard from './UnitCard'

import React, { useState } from 'react';
// import { Users, MoreVertical, Edit, Trash2, UserPlus, UserCheck, Eye } from 'lucide-react';

export default function UnitCards() {
    const [openMenuId, setOpenMenuId] = useState(null);

    const gradients = [
        'from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700',
        'from-pink-500 to-rose-600 dark:from-pink-600 dark:to-rose-700',
        'from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700',
        'from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700',
        'from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700',
        'from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700',
        'from-fuchsia-500 to-pink-600 dark:from-fuchsia-600 dark:to-pink-700',
        'from-lime-500 to-green-600 dark:from-lime-600 dark:to-green-700',
        'from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700',
        'from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700',
        'from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700',
        'from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700',
        'from-red-500 to-orange-600 dark:from-red-600 dark:to-orange-700',
        'from-purple-500 to-fuchsia-600 dark:from-purple-600 dark:to-fuchsia-700',
        'from-sky-500 to-indigo-600 dark:from-sky-600 dark:to-indigo-700'
    ];

    const avatarGradients = [
        'from-blue-500 to-purple-600',
        'from-pink-500 to-rose-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-red-600',
        'from-violet-500 to-purple-600',
        'from-cyan-500 to-blue-600',
        'from-fuchsia-500 to-pink-600',
        'from-lime-500 to-green-600',
        'from-amber-500 to-orange-600',
        'from-indigo-500 to-blue-600',
        'from-rose-500 to-pink-600',
        'from-teal-500 to-cyan-600',
        'from-red-500 to-orange-600',
        'from-purple-500 to-fuchsia-600',
        'from-sky-500 to-indigo-600'
    ];

    const assistantGradients = [
        'from-purple-500 to-pink-600',
        'from-rose-500 to-orange-600',
        'from-teal-500 to-emerald-600',
        'from-red-500 to-pink-600',
        'from-purple-500 to-indigo-600',
        'from-blue-500 to-cyan-600',
        'from-pink-500 to-fuchsia-600',
        'from-green-500 to-lime-600',
        'from-orange-500 to-amber-600',
        'from-blue-500 to-indigo-600',
        'from-pink-500 to-rose-600',
        'from-cyan-500 to-teal-600',
        'from-orange-500 to-red-600',
        'from-fuchsia-500 to-purple-600',
        'from-indigo-500 to-sky-600'
    ];

    const units = [
        { name: "Development Team Alpha", leader: "Sarah Johnson", assistantLeader: "Michael Chen", membersCount: 12 },
        { name: "Marketing Division", leader: "Emma Williams", assistantLeader: "David Martinez", membersCount: 8 },
        { name: "Design Studio", leader: "Oliver Brown", assistantLeader: "Sophia Garcia", membersCount: 15 },
        { name: "Sales Force Beta", leader: "James Wilson", assistantLeader: "Isabella Lopez", membersCount: 10 },
        { name: "Research Unit", leader: "Ava Anderson", assistantLeader: "Ethan Thomas", membersCount: 6 },
        { name: "Operations Team", leader: "Liam Taylor", assistantLeader: "Mia Rodriguez", membersCount: 14 },
        { name: "Customer Success", leader: "Noah Martinez", assistantLeader: "Charlotte Lee", membersCount: 9 },
        { name: "Product Innovation", leader: "Lucas Harris", assistantLeader: "Amelia Clark", membersCount: 11 },
        { name: "Engineering Core", leader: "Mason Lewis", assistantLeader: "Harper Walker", membersCount: 18 },
        { name: "Analytics Team", leader: "Elijah Hall", assistantLeader: "Evelyn Young", membersCount: 7 },
        { name: "Content Creators", leader: "Logan Allen", assistantLeader: "Abigail King", membersCount: 13 },
        { name: "Quality Assurance", leader: "Alexander Wright", assistantLeader: "Emily Scott", membersCount: 10 },
        { name: "Finance Department", leader: "Sebastian Green", assistantLeader: "Elizabeth Adams", membersCount: 5 },
        { name: "HR Excellence", leader: "Benjamin Baker", assistantLeader: "Sofia Nelson", membersCount: 8 },
        { name: "Technology Labs", leader: "Henry Carter", assistantLeader: "Avery Mitchell", membersCount: 16 }
    ];

    const menuItems = [
        { icon: 'Edit', label: "Edit Unit", action: () => console.log("Edit") },
        { icon: 'UserCheck', label: "Assign Leader", action: () => console.log("Assign Leader") },
        { icon: 'UserPlus', label: "Assign Assistant", action: () => console.log("Assign Assistant") },
        { icon: 'Users', label: "Assign Members", action: () => console.log("Assign Members") },
        { icon: 'Eye', label: "View Members", action: () => console.log("View Members") },
        { icon: 'Trash2', label: "Delete Unit", action: () => console.log("Delete"), danger: true }
    ];

    return (
        // <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-r ${gradients[index]} p-6 relative`}>
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-3">
                                    <UserIcon2 className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1">{unit.name}</h2>
                            </div>

                            {/* Menu Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === index ? null : index)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                                >;
                                    {/* <MoreVertical className="w-5 h-5 text-white" /> */}
                                </button>

                                {/* Dropdown Menu */}
                                {openMenuId === index && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setOpenMenuId(null)}
                                        />
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden">
                                            {menuItems.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        item.action();
                                                        setOpenMenuId(null);
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 ${item.danger
                                                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                        } ${idx !== menuItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-600' : ''}`}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                        {/* Leader Info */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div className={`w-10 h-10 bg-gradient-to-br ${avatarGradients[index]} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                                {unit.leader.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Unit Leader</p>
                                <p className="text-gray-900 dark:text-white font-semibold truncate">{unit.leader}</p>
                            </div>
                        </div>

                        {/* Assistant Leader Info */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div className={`w-10 h-10 bg-gradient-to-br ${assistantGradients[index]} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                                {unit.assistantLeader.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Assistant Leader</p>
                                <p className="text-gray-900 dark:text-white font-semibold truncate">{unit.assistantLeader}</p>
                            </div>
                        </div>

                        {/* Members Count */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm">
                                    <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Members</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{unit.membersCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        // </div>
    );
}

const UnitDisplay = () => {
    const { data: units = [], isError, error, isLoading } = useUnits()

    if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UnitCardSkeleton />
        <UnitCardSkeleton />
        <UnitCardSkeleton />
    </div>
    return (
        <>
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {units?.map((unit, i) => <UnitCard key={unit.id} unit={unit} index={i} />)}
            </div> */}
        </>
    )
}

// export default UnitDisplay
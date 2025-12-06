import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { ChevronUpIcon, CrownIcon, StarIcon, UsersIcon } from '@/icons';

const UnitsDetails = () => {
    const [expandedUnits, setExpandedUnits] = useState({});
    const { user } = useAuthStore();

    const toggleUnit = (unitId) => {
        setExpandedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };

    const getRoleBadge = (memberId, unit) => {
        if (unit.leader_id === memberId) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                    <CrownIcon className="w-3 h-3" />
                    Leader
                </span>
            );
        }
        if (unit.assistant_leader_id === memberId) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
                    <StarIcon className="w-3 h-3" />
                    Assistant
                </span>
            );
        }
        if (unit.assistant_leader_id_2 === memberId) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-sm">
                    <StarIcon className="w-3 h-3" />
                    Assistant
                </span>
            );
        }
        return null;
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const getAvatarColor = (name) => {
        const colors = [
            'bg-gradient-to-br from-purple-500 to-pink-500',
            'bg-gradient-to-br from-blue-500 to-cyan-500',
            'bg-gradient-to-br from-green-500 to-emerald-500',
            'bg-gradient-to-br from-orange-500 to-red-500',
            'bg-gradient-to-br from-indigo-500 to-purple-500',
        ];
        const index = name?.charCodeAt(0) % colors.length || 0;
        return colors[index];
    };

    const renderLeadershipCard = (person, role, IconComponent, iconColor, colorClass) => {
        if (!person) {
            return (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-dashed border-gray-300 dark:border-gray-600">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                            No {role}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className={`flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 transition-all duration-200 ${colorClass}`}>
                {person.avatar ? (
                    <img
                        src={person.avatar}
                        alt={person.full_name}
                        className="w-12 h-12 rounded-full object-cover shadow-md flex-shrink-0"
                    />
                ) : (
                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(person.full_name)} flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}>
                        {person.initials}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {person.full_name}
                        </p>
                        <IconComponent className={`w-4 h-4 flex-shrink-0 ${iconColor}`} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
                </div>
            </div>
        );
    };

    if (!user?.units?.length) {
        return (
            <div className="text-center py-12">
                <UsersIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No units found</p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {user.units.map((unit) => {
                const isExpanded = expandedUnits[unit.id] || false;

                return (
                    <div
                        key={unit.id}
                        className="group bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900/30 overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-6 py-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight truncate">
                                        {unit.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-blue-100">
                                        <UsersIcon className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-sm font-medium">
                                            {unit.members_count} {unit.members_count === 1 ? 'Member' : 'Members'}
                                        </span>
                                    </div>
                                </div>
                                {(unit.isLeader || unit.isAssistantLeader || unit.isAssistantLeader2 || unit.isMember) && (
                                    <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
                                        {unit.isLeader && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30 whitespace-nowrap">
                                                You're the Leader
                                            </span>
                                        )}
                                        {(unit.isAssistantLeader || unit.isAssistantLeader2) && !unit.isLeader && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30 whitespace-nowrap">
                                                You're the Assistant
                                            </span>
                                        )}
                                        {unit.isMember && !unit.isLeader && !unit.isAssistantLeader && !unit.isAssistantLeader2 && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30 whitespace-nowrap">
                                                Member
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Leadership Section */}
                        <div className="px-6 py-5 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Leader */}
                                {renderLeadershipCard(
                                    unit.leader,
                                    'Leader',
                                    CrownIcon,
                                    'text-amber-500',
                                    'hover:border-amber-300 dark:hover:border-amber-600'
                                )}

                                {/* Assistant Leader */}
                                {renderLeadershipCard(
                                    unit.assistantLeader,
                                    'Assistant Leader',
                                    StarIcon,
                                    'text-blue-500',
                                    'hover:border-blue-300 dark:hover:border-blue-600'
                                )}

                                {/* Assistant Leader 2 */}
                                {renderLeadershipCard(
                                    unit.assistantLeader2,
                                    'Assistant Leader',
                                    StarIcon,
                                    'text-violet-500',
                                    'hover:border-violet-300 dark:hover:border-violet-600'
                                )}
                            </div>
                        </div>

                        {/* Members Section */}
                        <div className="px-6 py-4">
                            <button
                                onClick={() => toggleUnit(unit.id)}
                                className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-3 group/btn"
                            >
                                <span>All Members ({unit.members_count})</span>
                                <ChevronUpIcon
                                    className={`w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110 ${isExpanded ? 'rotate-180' : 'rotate-0'
                                        }`}
                                />
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="space-y-2 overflow-y-auto max-h-[550px] pr-2 custom-scrollbar">
                                    {unit.members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
                                        >
                                            <div className={`w-10 h-10 rounded-full ${getAvatarColor(`${member.first_name} ${member.last_name}`)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                                {getInitials(member.first_name, member.last_name)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {member.first_name} {member.last_name}
                                                    </p>
                                                    {getRoleBadge(member.id, unit)}
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500 dark:text-gray-400">
                                                    <span className="truncate max-w-[200px]">{member.email}</span>
                                                    {member.phone_number && (
                                                        <>
                                                            <span className="text-gray-300 dark:text-gray-600">•</span>
                                                            <span className="whitespace-nowrap">{member.phone_number}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                Created {new Date(unit.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UnitsDetails;
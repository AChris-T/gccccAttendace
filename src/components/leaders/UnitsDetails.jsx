import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { ChevronUpIcon, CrownIcon, StarIcon, UsersIcon } from '@/icons';

const UnitsDetails = ({ unit }) => {
    const [expanded, setExpanded] = useState(false);
    const { user } = useAuthStore()

    const getRoleBadge = (memberId) => {
        if (unit?.leader_id === memberId) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                    <CrownIcon className="w-3 h-3" />
                    Leader
                </span>
            );
        }
        if (unit?.assistant_leader_id === memberId) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
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

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2'>
            {user?.units?.map((unit) =>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900/30 overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700">
                    {/* Header */}
                    <div className="bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-6 py-5">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                                    {unit.name}
                                </h3>
                                <div className="flex items-center gap-2 text-blue-100">
                                    <UsersIcon className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {unit.members_count} {unit.members_count === 1 ? 'Member' : 'Members'}
                                    </span>
                                </div>
                            </div>
                            {(unit.isLeader || unit.isAssistantLeader || unit.isMember) && (
                                <div className="flex flex-col gap-1.5 items-end">
                                    {unit.isLeader && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                                            You're the Leader
                                        </span>
                                    )}
                                    {unit.isAssistantLeader && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                                            You're Assistant Leader
                                        </span>
                                    )}
                                    {unit.isMember && !unit.isLeader && !unit.isAssistantLeader && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                                            Member
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Leadership Section */}
                    <div className="px-6 py-5 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Leader */}
                            {unit.leader && (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 transition-all duration-200 hover:border-amber-300 dark:hover:border-amber-600">
                                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(unit.leader.full_name)} flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}>
                                        {unit.leader.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                {unit.leader.full_name}
                                            </p>
                                            <CrownIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Unit Leader</p>
                                    </div>
                                </div>
                            )}

                            {/* Assistant Leader */}
                            {unit.assistantLeader ? (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
                                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(unit.assistantLeader.full_name)} flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}>
                                        {unit.assistantLeader.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                {unit.assistantLeader.full_name}
                                            </p>
                                            <StarIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Assistant Leader</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-dashed border-gray-300 dark:border-gray-600">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                                        <StarIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                                            No Assistant Leader
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Members Section */}
                    <div className="px-6 py-4">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-3"
                        >
                            <span>All Members ({unit.members_count})</span>
                            <ChevronUpIcon className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'}`} />
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="space-y-2">
                                {unit.members.map((member, idx) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 animate-in fade-in slide-in-from-left"
                                        style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'backwards' }}
                                    >
                                        <div className={`w-10 h-10 rounded-full ${getAvatarColor(`${member.first_name} ${member.last_name}`)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                            {getInitials(member.first_name, member.last_name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {member.first_name} {member.last_name}
                                                </p>
                                                {getRoleBadge(member.id)}
                                            </div>
                                            <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="truncate">{member.email}</span>
                                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                                <span>{member.phone_number}</span>
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
            )}
        </div>
    );
};

export default UnitsDetails;
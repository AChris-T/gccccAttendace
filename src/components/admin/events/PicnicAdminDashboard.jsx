import React, { useState } from 'react';
import {
    Users, Trophy, Target, Activity, ChevronDown,
    Sparkles, UserCheck, Crown, Mail, Phone
} from 'lucide-react';

export default function PicnicAdminDashboard({ data, isLoading = false }) {
    const [selectedGame, setSelectedGame] = useState(null);

    if (isLoading) {
        return <AdminDashboardSkeleton />;
    }

    const { year, statistics, game_groups, registrations } = data;

    // Filter only games with members
    const activeGames = game_groups.filter(game => game.total_members > 0);

    return (
        <div className="min-h-screen  dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20 transition-colors duration-300">
            <div className="w-full mx-auto space-y-8">
                {/* Hero Header Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-8 md:p-12 shadow">
                    {/* Animated Background Orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
                    </div>

                    <div className="relative z-10">
                        {/* Header Title */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow">
                                <Trophy className="w-10 h-10 text-yellow-300" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                    Picnic Dashboard
                                </h1>
                                <p className="text-white/80 text-lg mt-1">
                                    Annual Event {year} • Admin Overview
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard
                                icon={Users}
                                label="Total Registrations"
                                value={statistics.total_registrations}
                                subtext={`of ${statistics.max_capacity}`}
                                color="blue"
                            />
                            <StatCard
                                icon={Target}
                                label="Available Slots"
                                value={statistics.available_slots}
                                subtext="spots remaining"
                                color="green"
                            />
                            <StatCard
                                icon={Activity}
                                label="Capacity"
                                value={`${statistics.capacity_percentage}%`}
                                subtext="filled"
                                color="purple"
                            />
                            <StatCard
                                icon={Sparkles}
                                label="Total Support"
                                value={`₦${statistics.total_support.toLocaleString()}`}
                                subtext="contributed"
                                color="amber"
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Registrations Section */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow border-2 border-gray-100 dark:border-slate-700 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            Recent Registrations
                        </h2>
                        <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border border-purple-200 dark:border-purple-800">
                            <p className="text-sm font-bold text-purple-700 dark:text-purple-300">
                                {registrations.length} {registrations.length === 1 ? 'Registration' : 'Registrations'}
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto -mx-2">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b-2 border-gray-200 dark:border-slate-700">
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Participant</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Games Selected</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Support</th>
                                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((reg, idx) => (
                                    <RegistrationRow key={reg.id} registration={reg} index={idx} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Game Groups Section */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                <Trophy className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                            </div>
                            Game Groups
                        </h2>
                        <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border border-purple-200 dark:border-purple-800">
                            <p className="text-sm font-bold text-purple-700 dark:text-purple-300">
                                {activeGames.length} Active {activeGames.length === 1 ? 'Game' : 'Games'}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeGames.map((game, idx) => (
                            <GameGroupCard
                                key={game.game}
                                game={game}
                                index={idx}
                                isSelected={selectedGame === game.game}
                                onSelect={() => setSelectedGame(selectedGame === game.game ? null : game.game)}
                            />
                        ))}
                    </div>

                    {activeGames.length === 0 && (
                        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-gray-300 dark:border-slate-700">
                            <Trophy className="w-20 h-20 text-gray-300 dark:text-slate-600 mx-auto mb-4 opacity-50" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No active games yet</p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Game groups will appear as registrations come in</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-in {
                    animation: slideIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

// Enhanced Stat Card Component
function StatCard({ icon: Icon, label, value, subtext, color }) {
    const colorClasses = {
        blue: { bg: 'from-blue-500 to-cyan-500' },
        green: { bg: 'from-green-500 to-emerald-500' },
        purple: { bg: 'from-purple-500 to-pink-500' },
        amber: { bg: 'from-amber-500 to-orange-500' },
    };

    const colors = colorClasses[color];

    return (
        <div className="group relative overflow-hidden bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow cursor-pointer">
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <p className="text-white/70 text-xs font-semibold mb-1 uppercase tracking-wide">{label}</p>
                <p className="text-white text-3xl font-black mb-1 leading-tight">{value}</p>
                {subtext && <p className="text-white/60 text-xs font-medium">{subtext}</p>}
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        </div>
    );
}

// Enhanced Game Group Card Component
function GameGroupCard({ game, index, isSelected, onSelect }) {
    const getGameEmoji = (gameName) => {
        const emojiMap = {
            'Checkers': '🔴',
            'Card games': '🃏',
            'Ludo': '🎲',
            'Monopoly': '🏠',
            'Scrabble': '🔤',
            'Chess': '♟️',
            'Jenga': '🧱',
            'Snake and ladder': '🐍',
            'Ayo': '🪵'
        };
        return emojiMap[gameName] || '🎮';
    };

    return (
        <div
            className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow hover:shadow border-2 border-gray-100 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 cursor-pointer animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={onSelect}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow">
                        {getGameEmoji(game.game)}
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                            {game.game}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                            {game.total_members} {game.total_members === 1 ? 'Player' : 'Players'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full border border-purple-200 dark:border-purple-800">
                        <p className="text-sm font-black text-purple-700 dark:text-purple-300">
                            {game.total_members}
                        </p>
                    </div>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {/* Coordinator Badge */}
            {game.coordinator && (
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800 mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex-shrink-0">
                        <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wide mb-1">
                            Game Coordinator
                        </p>
                        <p className="text-base font-black text-amber-900 dark:text-amber-200 truncate mb-2">
                            {game.coordinator.name}
                        </p>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="truncate">{game.coordinator.email}</span>
                            </div>
                            {game.coordinator.phone_number && (
                                <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="truncate">{game.coordinator.phone_number}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Expandable Members List */}
            {isSelected && game.members.length > 0 && (
                <div className="mt-5 pt-5 border-t-2 border-gray-100 dark:border-slate-700 space-y-3 animate-slide-in">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                            All Players ({game.members.length})
                        </p>
                    </div>
                    <div className="grid gap-3 max-h-96 overflow-y-auto custom-scrollbar">
                        {game.members.map((member, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700/50 dark:to-slate-700/30 rounded-xl hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 border border-gray-200 dark:border-slate-600"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-black text-lg shadow flex-shrink-0">
                                    {member.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                            {member.name}
                                        </p>
                                        {member.is_coordinator && (
                                            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 rounded-full flex-shrink-0">
                                                <Crown className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Coordinator</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{member.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Registration Row Component
function RegistrationRow({ registration, index }) {
    return (
        <tr
            className="border-b border-gray-100 dark:border-slate-700 hover:bg-purple-50/50 dark:hover:bg-slate-700/50 transition-colors animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-black shadow flex-shrink-0">
                        {registration.user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white truncate">{registration.user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{registration.user.email}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex flex-wrap gap-2">
                    {registration?.games?.map((game, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold whitespace-nowrap border border-purple-200 dark:border-purple-800"
                        >
                            {game}
                        </span>
                    ))}
                </div>
            </td>
            <td className="py-4 px-4">
                <p className="font-black text-gray-900 dark:text-white whitespace-nowrap">
                    {registration.support_amount > 0 ? (
                        <span className="text-green-600 dark:text-green-400">₦{registration.support_amount.toLocaleString()}</span>
                    ) : (
                        <span className="text-gray-400 dark:text-gray-600">-</span>
                    )}
                </p>
            </td>
            <td className="py-4 px-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap font-medium">
                    {new Date(registration.registered_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </td>
        </tr>
    );
}

// Skeleton Loading Component
function AdminDashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20 py-8 px-4 animate-pulse">
            <div className="w-full mx-auto space-y-8">
                {/* Header Skeleton */}
                <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-slate-700 dark:to-slate-800 rounded-3xl p-8 md:p-12 h-72"></div>

                {/* Table Skeleton */}
                <div className="bg-gray-200 dark:bg-slate-800 rounded-3xl h-96"></div>

                {/* Content Grid Skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-gray-200 dark:bg-slate-800 rounded-3xl h-64"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
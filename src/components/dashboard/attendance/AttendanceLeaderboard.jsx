import React from 'react';
import { Trophy, Crown, Flame, TrendingUp, Award } from 'lucide-react';

const AttendanceLeaderboard = () => {
    // Sample data - replace with your actual data
    const topMembers = [
        {
            id: 1,
            name: 'John Adebayo',
            attendance: 100,
            streak: 12,
            avatar: 'JA',
            totalServices: 13,
            present: 13
        },
        {
            id: 2,
            name: 'Mary Okonkwo',
            attendance: 92,
            streak: 10,
            avatar: 'MO',
            totalServices: 13,
            present: 12
        },
        {
            id: 3,
            name: 'Peter Okeke',
            attendance: 85,
            streak: 8,
            avatar: 'PO',
            totalServices: 13,
            present: 11
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Podium Style - Refined Design</h1>
                    <p className="text-gray-600">Optimized colors for your church dashboard</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Design 1: Purple Theme (Matches Your Brand) */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Trophy className="text-purple-600" size={22} />
                                    Faithful Stewards
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Top 3 Most Consistent</p>
                            </div>
                            <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                                October 2025
                            </span>
                        </div>

                        <div className="flex items-end justify-center gap-3 pt-4">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-3">
                                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-purple-700 shadow-lg ring-4 ring-purple-50">
                                        {topMembers[1].avatar}
                                    </div>
                                    <div className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
                                        2
                                    </div>
                                </div>
                                <div className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-t-xl p-4 w-24 h-28 flex flex-col items-center justify-center border-2 border-purple-200">
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[1].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold text-purple-700">{topMembers[1].attendance}%</span>
                                    <span className="text-xs text-gray-600 mt-1">{topMembers[1].present}/{topMembers[1].totalServices}</span>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Flame className="text-orange-500" size={12} />
                                        <span className="text-xs text-gray-600">{topMembers[1].streak}w</span>
                                    </div>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center -mt-6">
                                <div className="relative mb-3">
                                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-xl ring-4 ring-purple-100">
                                        {topMembers[0].avatar}
                                    </div>
                                    <Crown className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-500" size={24} />
                                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg">
                                        1
                                    </div>
                                </div>
                                <div className="bg-gradient-to-b from-purple-600 to-purple-700 rounded-t-xl p-4 w-28 h-36 flex flex-col items-center justify-center border-2 border-purple-800 shadow-lg">
                                    <span className="text-xs font-semibold text-purple-100 mb-1">{topMembers[0].name.split(' ')[0]}</span>
                                    <span className="text-3xl font-bold text-white">{topMembers[0].attendance}%</span>
                                    <span className="text-xs text-purple-200 mt-1">{topMembers[0].present}/{topMembers[0].totalServices}</span>
                                    <div className="flex items-center gap-1 mt-2 bg-white/20 px-2 py-1 rounded-full">
                                        <Flame className="text-orange-400" size={12} />
                                        <span className="text-xs text-white font-semibold">{topMembers[0].streak}w</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-3">
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-purple-600 shadow-lg ring-4 ring-purple-50">
                                        {topMembers[2].avatar}
                                    </div>
                                    <div className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
                                        3
                                    </div>
                                </div>
                                <div className="bg-gradient-to-b from-purple-25 to-purple-50 rounded-t-xl p-4 w-24 h-24 flex flex-col items-center justify-center border-2 border-purple-100">
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[2].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold text-purple-600">{topMembers[2].attendance}%</span>
                                    <span className="text-xs text-gray-600 mt-1">{topMembers[2].present}/{topMembers[2].totalServices}</span>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Flame className="text-orange-500" size={12} />
                                        <span className="text-xs text-gray-600">{topMembers[2].streak}w</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Design 2: Clean Minimal Theme */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Award className="text-purple-600" size={22} />
                                    Top Attendees
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Excellence in Commitment</p>
                            </div>
                            <span className="text-xs text-gray-600 font-medium">
                                Oct 2025
                            </span>
                        </div>

                        <div className="flex items-end justify-center gap-3 pt-4">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-3">
                                    <div className="bg-white border-4 border-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-gray-600 shadow">
                                        {topMembers[1].avatar}
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        2
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-t-xl p-4 w-24 h-28 flex flex-col items-center justify-center border-2 border-gray-200">
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[1].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold text-gray-700">{topMembers[1].attendance}%</span>
                                    <span className="text-xs text-gray-500 mt-1">{topMembers[1].present}/{topMembers[1].totalServices}</span>
                                    <TrendingUp className="text-green-500 mt-1" size={14} />
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center -mt-6">
                                <div className="relative mb-3">
                                    <div className="bg-white border-4 border-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-purple-700 shadow-lg">
                                        {topMembers[0].avatar}
                                    </div>
                                    <Crown className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-purple-600" size={24} />
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow">
                                        1
                                    </div>
                                </div>
                                <div className="bg-purple-50 rounded-t-xl p-4 w-28 h-36 flex flex-col items-center justify-center border-2 border-purple-600 shadow">
                                    <span className="text-xs font-semibold text-purple-700 mb-1">{topMembers[0].name.split(' ')[0]}</span>
                                    <span className="text-3xl font-bold text-purple-700">{topMembers[0].attendance}%</span>
                                    <span className="text-xs text-purple-600 mt-1">{topMembers[0].present}/{topMembers[0].totalServices}</span>
                                    <div className="flex items-center gap-1 mt-2 bg-purple-600 px-2 py-1 rounded-full">
                                        <Flame className="text-orange-300" size={12} />
                                        <span className="text-xs text-white font-semibold">{topMembers[0].streak}w</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-3">
                                    <div className="bg-white border-4 border-orange-300 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-orange-600 shadow">
                                        {topMembers[2].avatar}
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        3
                                    </div>
                                </div>
                                <div className="bg-orange-50 rounded-t-xl p-4 w-24 h-24 flex flex-col items-center justify-center border-2 border-orange-200">
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[2].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold text-orange-600">{topMembers[2].attendance}%</span>
                                    <span className="text-xs text-gray-500 mt-1">{topMembers[2].present}/{topMembers[2].totalServices}</span>
                                    <TrendingUp className="text-green-500 mt-1" size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Design 3: Soft Pastel Theme */}
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-md p-6 border border-purple-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Trophy className="text-purple-600" size={22} />
                                    Outstanding Members
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Monthly Recognition</p>
                            </div>
                            <span className="text-xs text-purple-700 font-semibold">
                                Oct '25
                            </span>
                        </div>

                        <div className="flex items-end justify-center gap-3 pt-4">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-indigo-200 to-indigo-300 w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold text-indigo-800 shadow-lg mb-3 relative">
                                    {topMembers[1].avatar}
                                    <div className="absolute -top-2 -right-2 bg-white text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow border-2 border-indigo-200">
                                        2
                                    </div>
                                </div>
                                <div className="bg-white rounded-t-2xl p-4 w-24 h-28 flex flex-col items-center justify-center shadow-md border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[1].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold text-indigo-600">{topMembers[1].attendance}%</span>
                                    <span className="text-xs text-gray-500 mt-1">{topMembers[1].present}/{topMembers[1].totalServices}</span>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center -mt-6">
                                <Crown className="text-yellow-500 mb-1" size={28} />
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-xl mb-3 relative">
                                    {topMembers[0].avatar}
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg">
                                        1
                                    </div>
                                </div>
                                <div className="bg-white rounded-t-2xl p-4 w-28 h-36 flex flex-col items-center justify-center shadow-lg border-2 border-purple-200">
                                    <span className="text-xs font-semibold text-purple-700 mb-1">{topMembers[0].name.split(' ')[0]}</span>
                                    <span className="text-3xl font-bold text-purple-700">{topMembers[0].attendance}%</span>
                                    <span className="text-xs text-purple-600 mt-1">{topMembers[0].present}/{topMembers[0].totalServices}</span>
                                    <Flame className="text-orange-500 mt-2" size={16} />
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-pink-200 to-pink-300 w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold text-pink-800 shadow-lg mb-3 relative">
                                    {topMembers[2].avatar}
                                    <div className="absolute -top-2 -right-2 bg-white text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow border-2 border-pink-200">
                                        3
                                    </div>
                                </div>
                                <div className="bg-white rounded-t-2xl p-4 w-24 h-24 flex flex-col items-center justify-center shadow-md border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[2].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold text-pink-600">{topMembers[2].attendance}%</span>
                                    <span className="text-xs text-gray-500 mt-1">{topMembers[2].present}/{topMembers[2].totalServices}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Design 4: Bold Gradient Theme */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Crown className="text-purple-600" size={22} />
                                    Commitment Leaders
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Hall of Excellence</p>
                            </div>
                            <div className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                                October
                            </div>
                        </div>

                        <div className="flex items-end justify-center gap-3 pt-4">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg mb-3 ring-2 ring-purple-200 ring-offset-2">
                                    {topMembers[1].avatar}
                                </div>
                                <div className="bg-gradient-to-b from-purple-100 via-purple-50 to-white rounded-t-xl p-4 w-24 h-28 flex flex-col items-center justify-center border border-purple-200">
                                    <div className="w-6 h-1 bg-purple-400 rounded-full mb-2"></div>
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[1].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">{topMembers[1].attendance}%</span>
                                    <span className="text-xs text-gray-500 mt-1">{topMembers[1].present}/{topMembers[1].totalServices}</span>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center -mt-6">
                                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-2xl mb-3 ring-4 ring-yellow-300 ring-offset-2 relative">
                                    {topMembers[0].avatar}
                                    <Crown className="absolute -top-5 text-yellow-400" size={28} />
                                </div>
                                <div className="bg-gradient-to-b from-purple-200 via-purple-100 to-white rounded-t-xl p-4 w-28 h-36 flex flex-col items-center justify-center border-2 border-purple-400 shadow-lg">
                                    <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full mb-2"></div>
                                    <span className="text-xs font-semibold text-purple-800 mb-1">{topMembers[0].name.split(' ')[0]}</span>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">{topMembers[0].attendance}%</span>
                                    <span className="text-xs text-purple-700 mt-1 font-medium">{topMembers[0].present}/{topMembers[0].totalServices}</span>
                                    <Flame className="text-orange-500 mt-2" size={18} />
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg mb-3 ring-2 ring-purple-100 ring-offset-2">
                                    {topMembers[2].avatar}
                                </div>
                                <div className="bg-gradient-to-b from-purple-50 to-white rounded-t-xl p-4 w-24 h-24 flex flex-col items-center justify-center border border-purple-100">
                                    <div className="w-6 h-1 bg-purple-300 rounded-full mb-2"></div>
                                    <span className="text-xs font-semibold text-gray-700 mb-1">{topMembers[2].name.split(' ')[0]}</span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">{topMembers[2].attendance}%</span>
                                    <span className="text-xs text-gray-500 mt-1">{topMembers[2].present}/{topMembers[2].totalServices}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Positioning Suggestions */}
                <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                        </svg>
                        Dashboard Positioning Recommendations
                    </h4>
                    <div className="space-y-3 text-sm text-blue-800">
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="font-semibold mb-2">🎯 Option 1: Below Attendance Cards (RECOMMENDED)</p>
                            <p className="text-blue-700">Place it directly below your Present/Absent cards. This creates a natural flow: overview stats → top performers. Perfect for desktop and mobile layouts.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="font-semibold mb-2">📊 Option 2: Right Sidebar</p>
                            <p className="text-blue-700">Position it in the right column alongside "Monthly Target". Both use similar visual language (circular progress + recognition), creating visual harmony.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="font-semibold mb-2">🎨 Option 3: Full Width Below Daily Verse</p>
                            <p className="text-blue-700">Place it between "Daily Verse" and the video carousel. This gives it premium visibility while maintaining content hierarchy.</p>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                        <p className="text-sm font-semibold text-purple-900">💡 Pro Tip:</p>
                        <p className="text-sm text-purple-800 mt-1">The <strong>first design (Purple Theme)</strong> matches your brand perfectly. The podium heights create visual interest without overwhelming the dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceLeaderboard
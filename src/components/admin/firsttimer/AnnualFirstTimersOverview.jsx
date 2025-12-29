import { TrendingUp, TrendingDown, Minus, Users, BarChart3 } from 'lucide-react';

const AnnualFirstTimersOverview = ({ isVisible, selectedYear, statusesPerMonth = [], }) => {

    const statusColors = {
        'Integrated': { text: 'text-emerald-600 dark:text-emerald-400' },
        'Contacted': { text: 'text-blue-600 dark:text-blue-400' },
        'Visiting': { text: 'text-cyan-600 dark:text-cyan-400' },
        'Invited Again': { text: 'text-purple-600 dark:text-purple-400' },
        'Second Timer': { text: 'text-pink-600 dark:text-pink-400' },
        'Third Timer': { text: 'text-violet-600 dark:text-violet-400' },
        'Fourth Timer': { text: 'text-indigo-600 dark:text-indigo-400' },
        'Not Contacted': { text: 'text-amber-600 dark:text-amber-400' },
        'Away': { text: 'text-gray-600 dark:text-gray-400' },
        'Opt-out': { text: 'text-red-600 dark:text-red-400' },
        'Unknown': { text: 'text-slate-600 dark:text-slate-400' }
    };

    // Calculate metrics for each month
    const monthsWithMetrics = statusesPerMonth.map((month, index) => {
        const total = Object.entries(month)
            .filter(([key]) => key !== 'month')
            .reduce((sum, [, value]) => sum + value, 0);

        // Get all statuses including zeros, sorted by count
        const allStatuses = Object.entries(month)
            .filter(([key]) => key !== 'month')
            .map(([status, count]) => ({
                status,
                count,
                percentage: total > 0 ? ((count / total) * 100).toFixed(1) : '0.0'
            }))
            .sort((a, b) => b.count - a.count);

        const prevTotal = index > 0 ? Object.entries(statusesPerMonth[index - 1])
            .filter(([key]) => key !== 'month')
            .reduce((sum, [, value]) => sum + value, 0) : total;

        const trend = total > prevTotal ? 'up' : total < prevTotal ? 'down' : 'stable';
        const trendPercent = prevTotal > 0 ? (((total - prevTotal) / prevTotal) * 100).toFixed(1) : '0.0';

        return {
            ...month,
            total,
            allStatuses,
            trend,
            trendPercent
        };
    });

    const yearTotal = monthsWithMetrics.reduce((sum, month) => sum + month.total, 0);

    // Calculate year totals for each status
    const yearStatusTotals = {};
    statusesPerMonth.forEach(month => {
        Object.entries(month).forEach(([key, value]) => {
            if (key !== 'month') {
                yearStatusTotals[key] = (yearStatusTotals[key] || 0) + value;
            }
        });
    });

    const sortedYearStatuses = Object.entries(yearStatusTotals)
        .map(([status, count]) => ({
            status,
            count,
            percentage: yearTotal > 0 ? ((count / yearTotal) * 100).toFixed(1) : '0.0'
        }))
        .sort((a, b) => b.count - a.count);

    return (<>
        {isVisible && (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 p-4 md:p-8 transition-colors">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-slide-up-fade-in">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                {selectedYear} First-Timers Overview
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">Complete annual report</p>
                        </div>

                        {/* Annual Status Breakdown */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Annual Status Totals</h2>

                            {/* Summary Stats */}
                            <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                        <Users className="text-blue-600 dark:text-blue-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Total First-Timers</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{yearTotal}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                        <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Average Per Month</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{(yearTotal / 12).toFixed(1)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {sortedYearStatuses.map(({ status, count, percentage }) => (
                                    <div
                                        key={status}
                                        className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                                    >
                                        <p className={`${statusColors[status]?.text} font-semibold text-sm mb-2`}>{status}</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{count}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{percentage}% of total</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {monthsWithMetrics.map((month, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
                                    style={{
                                        animation: `slideInStagger 0.5s ease-out ${index * 0.05}s both`
                                    }}
                                >
                                    {/* Month Header */}
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{month.month}</h3>
                                            {month.trend === 'up' && (
                                                <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                                                    <TrendingUp className="text-white" size={16} />
                                                    <span className="text-white text-xs font-semibold">+{month.trendPercent}%</span>
                                                </div>
                                            )}
                                            {month.trend === 'down' && (
                                                <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                                                    <TrendingDown className="text-white" size={16} />
                                                    <span className="text-white text-xs font-semibold">-{Math.abs(month.trendPercent)}%</span>
                                                </div>
                                            )}
                                            {month.trend === 'stable' && <Minus className="text-white/70" size={20} />}
                                        </div>
                                        <p className="text-4xl font-bold text-white">{month.total}</p>
                                        <p className="text-blue-100 text-sm">Total First-Timers</p>
                                    </div>

                                    {/* Status List */}
                                    <div className="p-4">
                                        <div className="space-y-2">
                                            {month.allStatuses.map(({ status, count, percentage }) => (
                                                <div
                                                    key={status}
                                                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                                                >
                                                    <p className={`${statusColors[status]?.text} font-medium text-sm flex-1`}>{status}</p>
                                                    <div className="text-right ml-4">
                                                        <span className="text-lg font-bold text-gray-900 dark:text-white">{count}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({percentage}%)</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default AnnualFirstTimersOverview;
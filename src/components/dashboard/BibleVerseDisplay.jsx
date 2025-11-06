import { useState, useEffect } from 'react';

export default function BibleVerseDisplay() {
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchVerse = async () => {
        setLoading(true);

        try {
            const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
            const data = await response.json();
            setVerse(data[0]);
        } catch (err) {
            const verse = {
                text: 'Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.',
                bookname: 'John',
                chapter: '14',
                verse: '6',
            }
            setVerse(verse)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerse();
    }, []);

    return (
        <div className="w-full h-56 bg-white dark:bg-linear-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center relative overflow-hidden rounded-2xl">
            {/* Animated background elements - dark mode only */}
            <div className="absolute inset-0 overflow-hidden hidden dark:block">
                <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
            </div>

            {/* Main card with glassmorphism */}
            <div className="relative w-full h-56 backdrop-blur-xl bg-slate-100/80 dark:bg-white/10 rounded-2xl shadow border border-purple-200 dark:border-white/20 p-4 md:p-5 overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-linear-to-br from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-white/10">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-slate-700 via-purple-700 to-slate-700 dark:from-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
                            Daily Verse
                        </h1>
                    </div>

                    <button
                        onClick={fetchVerse}
                        disabled={loading}
                        className="p-2.5 bg-linear-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 dark:from-purple-500/30 dark:to-blue-500/30 dark:hover:from-purple-500/40 dark:hover:to-blue-500/40 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                        aria-label="Refresh verse"
                    >
                        <svg className={`w-5 h-5 text-purple-600 dark:text-purple-200 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-1 space-y-1">
                            <div className="relative">
                                <svg className="w-10 h-10 text-purple-600 dark:text-purple-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                <div className="absolute inset-0 bg-purple-400/30 blur-xl animate-pulse"></div>
                            </div>
                            <p className="text-purple-600 dark:text-purple-200/70 text-base">Loading inspiration...</p>
                        </div>
                    ) : verse ? (
                        <div className="space-y-4">
                            {/* Verse text with line clamp */}
                            <div className="relative">
                                <div className="absolute -left-3 top-0 text-4xl text-purple-300/40 dark:text-purple-300/20 font-serif">"</div>
                                <p className="text-base md:text-lg leading-relaxed bg-linear-to-r from-slate-800 via-purple-900 to-slate-800 dark:from-white dark:via-white dark:to-white/90 bg-clip-text text-transparent font-light italic pl-5 line-clamp-2">
                                    {verse.text}
                                </p>
                                <div className="absolute -right-1 bottom-0 text-4xl text-purple-300/40 dark:text-purple-300/20 font-serif">"</div>
                            </div>

                            {/* Reference */}
                            <div className="flex items-center justify-end gap-2 pt-2">
                                <div className="h-px grow bg-linear-to-r from-transparent to-purple-300/50 dark:to-purple-300/30"></div>
                                <p className="text-sm md:text-base font-semibold bg-linear-to-r from-slate-700 via-purple-700 to-blue-700 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
                                    {verse.bookname} {verse.chapter}:{verse.verse}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Decorative bottom shine */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-400/50 dark:via-purple-300/50 to-transparent"></div>
            </div>
        </div>
    );
}
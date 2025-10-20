import { Outlet } from 'react-router-dom';
import Navbar from '../components/header/Navbar';
import ProgressBar from '../components/others/ProgressBar';
import { ScrollToTop } from '../components/others/ScrollToTop';
import PageLoader from '@/components/ui/PageLoader';

const LayoutContent = () => {
    return (
        <div className='relative min-h-screen bg-[#24244e] dark:bg-gray-950 overflow-hidden'>
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-purple-500/20 dark:from-blue-400/25 dark:via-cyan-400/20 dark:to-purple-400/25 rounded-full blur-3xl animate-blob-slow"></div>
                <div className="absolute bottom-[-15%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 dark:from-indigo-400/25 dark:via-purple-400/20 dark:to-pink-400/25 rounded-full blur-3xl animate-blob-slower animation-delay-3000"></div>
                <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-blue-500/15 dark:from-violet-400/20 dark:via-fuchsia-400/15 dark:to-blue-400/20 rounded-full blur-3xl animate-blob-medium animation-delay-2000"></div>

                <div className="absolute inset-0 opacity-20 dark:opacity-15 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

                <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-blue-400/60 dark:bg-blue-300/60 rounded-full animate-float-subtle"></div>
                <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-purple-400/60 dark:bg-purple-300/60 rounded-full animate-float-subtle animation-delay-2000"></div>
                <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-pink-400/60 dark:bg-pink-300/60 rounded-full animate-float-subtle animation-delay-4000"></div>
                <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-indigo-400/60 dark:bg-indigo-300/60 rounded-full animate-float-subtle animation-delay-1000"></div>
                <div className="absolute top-[45%] left-[20%] w-2 h-2 bg-cyan-400/60 dark:bg-cyan-300/60 rounded-full animate-float-subtle animation-delay-3000"></div>
                <div className="absolute bottom-[35%] right-[25%] w-2 h-2 bg-violet-400/60 dark:bg-violet-300/60 rounded-full animate-float-subtle animation-delay-5000"></div>
                <div className="absolute top-[75%] left-[40%] w-2 h-2 bg-fuchsia-400/60 dark:bg-fuchsia-300/60 rounded-full animate-float-subtle animation-delay-1500"></div>
                <div className="absolute bottom-[50%] right-[35%] w-2 h-2 bg-blue-400/60 dark:bg-blue-300/60 rounded-full animate-float-subtle animation-delay-3500"></div>
                <div className="absolute top-[50%] left-[5%] w-2 h-2 bg-purple-400/60 dark:bg-purple-300/60 rounded-full animate-float-subtle animation-delay-2500"></div>
                <div className="absolute bottom-[60%] right-[8%] w-2 h-2 bg-pink-400/60 dark:bg-pink-300/60 rounded-full animate-float-subtle animation-delay-4500"></div>
                <div className="absolute top-[35%] left-[45%] w-2 h-2 bg-indigo-400/60 dark:bg-indigo-300/60 rounded-full animate-float-subtle animation-delay-500"></div>
                <div className="absolute bottom-[25%] right-[40%] w-2 h-2 bg-cyan-400/60 dark:bg-cyan-300/60 rounded-full animate-float-subtle animation-delay-5500"></div>

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgODAgMTAgTSAwIDIwIEwgODAgMjAgTSAwIDMwIEwgODAgMzAgTSAwIDQwIEwgODAgNDAgTSAwIDUwIEwgODAgNTAgTSAwIDYwIEwgODAgNjAgTSAwIDcwIEwgODAgNzAgTSAxMCAwIEwgMTAgODAgTSAyMCAwIEwgMjAgODAgTSAzMCAwIEwgMzAgODAgTSA0MCAwIEwgNDAgODAgTSA1MCAwIEwgNTAgODAgTSA2MCAwIEwgNjAgODAgTSA3MCAwIEwgNzAgODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 dark:opacity-20"></div>

                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#24244e]/30 dark:to-gray-950/30"></div>
            </div>

            <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent dark:via-blue-400/50"></div>

                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-400/10 rounded-br-full"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/5 to-transparent dark:from-purple-400/10 rounded-bl-full"></div>

                <Navbar title='Home' />
                <div className="relative container mx-auto overflow-y-hidden">
                    <Outlet />
                </div>

            </div>

            <style>{`
                @keyframes blob-slow {
                    0%, 100% { 
                        transform: translate(0px, 0px) scale(1);
                        opacity: 1;
                    }
                    33% { 
                        transform: translate(20px, -30px) scale(1.05);
                        opacity: 0.95;
                    }
                    66% { 
                        transform: translate(-15px, 20px) scale(0.98);
                        opacity: 1;
                    }
                }
                @keyframes blob-slower {
                    0%, 100% { 
                        transform: translate(0px, 0px) scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: translate(-25px, 25px) scale(1.08);
                        opacity: 0.9;
                    }
                }
                
                @keyframes blob-medium {
                    0%, 100% { 
                        transform: translate(0px, 0px) scale(1);
                    }
                    50% { 
                        transform: translate(18px, -22px) scale(1.06);
                    }
                }
                
                @keyframes float-subtle {
                    0%, 100% { 
                        transform: translateY(0px);
                        opacity: 0.4;
                    }
                    50% { 
                        transform: translateY(-15px);
                        opacity: 0.7;
                    }
                }
                
                .animate-blob-slow {
                    animation: blob-slow 18s ease-in-out infinite;
                }
                
                .animate-blob-slower {
                    animation: blob-slower 22s ease-in-out infinite;
                }
                
                .animate-blob-medium {
                    animation: blob-medium 15s ease-in-out infinite;
                }
                
                .animate-float-subtle {
                    animation: float-subtle 6s ease-in-out infinite;
                }
                
                .animation-delay-500 {
                    animation-delay: 0.5s;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-2500 {
                    animation-delay: 2.5s;
                }
                
                .animation-delay-3000 {
                    animation-delay: 3s;
                }
                
                .animation-delay-3500 {
                    animation-delay: 3.5s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                .animation-delay-4500 {
                    animation-delay: 4.5s;
                }
                
                .animation-delay-5000 {
                    animation-delay: 5s;
                }
                
                .animation-delay-5500 {
                    animation-delay: 5.5s;
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
                }
            `}</style>
        </div>
    );
};

const HomeLayout = () => {
    return (
        <>
            <ProgressBar />
            <ScrollToTop />
            <LayoutContent />
        </>
    );
};

export default HomeLayout;
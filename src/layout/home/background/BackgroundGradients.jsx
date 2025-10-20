const BackgroundGradients = () => (
    <>
        <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-purple-500/20 dark:from-blue-400/25 dark:via-cyan-400/20 dark:to-purple-400/25 rounded-full blur-3xl animate-blob-slow"></div>
        <div className="absolute bottom-[-15%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 dark:from-indigo-400/25 dark:via-purple-400/20 dark:to-pink-400/25 rounded-full blur-3xl animate-blob-slower animation-delay-3000"></div>
        <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-blue-500/15 dark:from-violet-400/20 dark:via-fuchsia-400/15 dark:to-blue-400/20 rounded-full blur-3xl animate-blob-medium animation-delay-2000"></div>
        <div className="absolute inset-0 opacity-20 dark:opacity-15 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
    </>
);

export default BackgroundGradients;

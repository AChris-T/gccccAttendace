const particlePositions = [
    ['top-[15%] left-[10%]', 'bg-blue-400/60 dark:bg-blue-300/60', ''],
    ['top-[30%] right-[20%]', 'bg-purple-400/60 dark:bg-purple-300/60', 'animation-delay-2000'],
    ['bottom-[20%] left-[30%]', 'bg-pink-400/60 dark:bg-pink-300/60', 'animation-delay-4000'],
    ['top-[60%] right-[15%]', 'bg-indigo-400/60 dark:bg-indigo-300/60', 'animation-delay-1000'],
    ['top-[45%] left-[20%]', 'bg-cyan-400/60 dark:bg-cyan-300/60', 'animation-delay-3000'],
    ['bottom-[35%] right-[25%]', 'bg-violet-400/60 dark:bg-violet-300/60', 'animation-delay-5000'],
    ['top-[75%] left-[40%]', 'bg-fuchsia-400/60 dark:bg-fuchsia-300/60', 'animation-delay-1500'],
    ['bottom-[50%] right-[35%]', 'bg-blue-400/60 dark:bg-blue-300/60', 'animation-delay-3500'],
    ['top-[50%] left-[5%]', 'bg-purple-400/60 dark:bg-purple-300/60', 'animation-delay-2500'],
    ['bottom-[60%] right-[8%]', 'bg-pink-400/60 dark:bg-pink-300/60', 'animation-delay-4500'],
    ['top-[35%] left-[45%]', 'bg-indigo-400/60 dark:bg-indigo-300/60', 'animation-delay-500'],
    ['bottom-[25%] right-[40%]', 'bg-cyan-400/60 dark:bg-cyan-300/60', 'animation-delay-5500'],
];

const BackgroundParticles = () => (
    <>
        {particlePositions.map(([pos, color, delay], i) => (
            <div
                key={i}
                className={`absolute ${pos} w-2 h-2 ${color} rounded-full animate-float-subtle ${delay}`}
            />
        ))}
    </>
);

export default BackgroundParticles;

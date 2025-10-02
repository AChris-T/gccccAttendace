const ConfettiShower = () => {
    const confettiPieces = Array.from({ length: 100 });

    const confettiStyles = (index) => {
        const colors = ['#FDC44C', '#1F7A8C', '#C44D58', '#2A9D8F', '#6A0DAD', '#000000', '#00f123', '#00f'];
        const delay = Math.random() * 2; // 0s to 2s
        const duration = 2 + Math.random() * 2; // 2s to 4s
        const left = Math.random() * 100; // 0% to 100%
        const size = 5 + Math.random() * 5; // 5px to 10px

        return {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: colors[index % colors.length],
            opacity: 0.9,
            left: `${left}vw`,
            animation: `fall ${duration}s linear ${delay}s infinite`,
            borderRadius: '2px',
            transform: `rotate(${Math.random() * 360}deg)`
        };
    };

    return (
        <>
            <style>
                {`
                @keyframes fall {
                    0% {
                        transform: translateY(-50vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(150vh) rotate(720deg);
                        opacity: 0.5;
                    }
                }
                .confetti-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 50; /* Above all dashboard elements */
                }
                `}
            </style>
            <div className="confetti-container">
                {confettiPieces.map((_, index) => (
                    <div key={index} style={confettiStyles(index)} />
                ))}
            </div>
        </>
    );
};

export default ConfettiShower;
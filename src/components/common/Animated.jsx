import { motion } from "framer-motion";
import { useAnimation } from "../../hooks/useAnimation";

const Animated = ({ children, animation, duration, delay, easing, className = "", ...props }) => {
    const motionProps = useAnimation({ animation, duration, delay, easing });

    return (
        <motion.div className={className} {...motionProps} {...props}>
            {children}
        </motion.div>
    );
};

export default Animated;
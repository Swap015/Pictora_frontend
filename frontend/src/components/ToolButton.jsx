import gsap from "gsap";
import { useRef } from "react";

const ToolButton = ({ icon, onClick }) => {
    const btnRef = useRef(null);

    const handleEnter = () => {
        gsap.to(btnRef.current, {
            scale: 1.2,
            duration: 0.2
        });
    };

    const handleLeave = () => {
        gsap.to(btnRef.current, {
            scale: 1,
            duration: 0.2
        });
    };

    return (
        <button
            ref={btnRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={onClick}
            className="text-xl"
        >
            {icon}
        </button>
    );
};

export default ToolButton;

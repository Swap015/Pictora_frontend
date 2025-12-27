import { useEffect, useRef } from "react";
import gsap from "gsap";


const EditorLayout = ({ children }) => {
    const navRef = useRef(null);
    const sidebarRef = useRef(null);
    const toolsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from(navRef.current, {
                y: -80,
                opacity: 0,
                duration: 1,
                ease: "expo.out"
            });

            gsap.from(sidebarRef.current, {
                x: -120,
                opacity: 0,
                duration: 1,
                ease: "elastic.out(1, 0.6)",
                delay: 0.2
            });

            const tools = toolsRef.current.filter(Boolean);

            gsap.from(tools, {
                scale: 0,
                opacity: 0,
                stagger: 0.12,
                duration: 0.5,
                ease: "back.out(1.7)",
                delay: 0.6
            });

        });

        return () => ctx.revert();
    }, []);


    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-[#0f0f0f] to-[#151515] text-white">


            <div
                ref={navRef}
                className="z-10 h-14 px-6 flex items-center justify-between border-b border-white/10 backdrop-blur"
            >
                <h1 className="font-semibold text-lg tracking-wide">
                    ✨ Pictora
                </h1>

                <button className="bg-indigo-500 hover:bg-indigo-600 transition px-4 py-1 rounded-md shadow-lg">
                    Export
                </button>

            </div>

            <div className="flex flex-1">


                <div
                    ref={sidebarRef}
                    className="z-16 w-16 bg-[#111] border-r border-white/10 flex flex-col items-center gap-6 pt-6"
                >
                    {["✂️", "🎨", "🔤", "🔄"].map((icon, i) => (
                        <button
                            key={i}
                            ref={el => toolsRef.current[i] = el}
                            className="text-xl z-16 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/80 transition hover:scale-110 text-white"
                        >
                            {icon}
                        </button>
                    ))}
                </div>


                <div className="flex-1 flex items-center justify-center bg-[#151515] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-pink-500/5 blur-3xl" />
                    {children}
                </div>

            </div>

        </div>
    );
};

export default EditorLayout;

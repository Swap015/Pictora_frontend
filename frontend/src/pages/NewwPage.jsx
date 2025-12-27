import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewwPage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const totalScroll =
      containerRef.current.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: true,
        pin: true,
      },
    });

    // Horizontal movement
    tl.to(containerRef.current, {
      x: -totalScroll,
      ease: "none",
    });

    // Text stagger inside panels
    panelsRef.current.forEach((panel) => {
      const texts = panel.querySelectorAll(".panel-text");

      tl.from(
        texts,
        {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
        },
        "<" // start together with horizontal scroll
      );
    });
  }, []);

  return (
    <div>
      {/* Intro */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl">Scroll Down 👇</h1>
      </div>

      {/* Horizontal Section */}
      <section
        ref={sectionRef}
        className="h-screen overflow-hidden bg-black text-white"
      >
        <div ref={containerRef} className="flex h-full">
          {[1, 2, 3].map((num, i) => (
            <div
              key={i}
              ref={(el) => (panelsRef.current[i] = el)}
              className="min-w-full h-full flex flex-col items-center justify-center gap-4"
            >
              <h2 className="panel-text text-4xl font-bold">
                Feature {num}
              </h2>
              <p className="panel-text text-lg max-w-md text-center">
                This feature improves your editing workflow and productivity.
              </p>
              <button className="panel-text px-6 py-2 bg-white text-black rounded">
                Try Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* End */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl">End 🚀</h1>
      </div>
    </div>
  );
};

export default NewwPage;

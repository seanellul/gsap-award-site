import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const logoRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "bottom center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation
      .to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      })
      .to(bgRef.current, {
        backgroundColor: "rgba(0, 0, 0, 1)", // From transparent to full gray-900
        ease: "power1.inOut",
        duration: 1, // Explicitly set duration
      }, "<") // Start at the same time as the previous animation
      .to(logoRef.current, {
        filter: "invert(1) brightness(100)",  // More reliable way to turn black SVG to white
        ease: "power1.inOut",
        duration: 1, // Match the exact same duration as background
      }, "<"); // Start at the same time as the previous animation

    // Logo hover animation
    const logo = logoRef.current;
    if (logo) {
      // Initial animation - gentle floating
      gsap.to(logo, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Rotation animation
      gsap.to(logo, {
        rotateY: 10,
        rotateX: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[20px]">
          Your Master Key To
        </p>



        <AnimatedTitle
          title="C<b>o</b>NFID<b>e</b>nce"
          containerClass="mt-5 !text-black text-center"
        />
          <p className="text-gray-500">
          Experience the power, speed, and control of tomorrow’s platform-today
          </p>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <div 
            ref={bgRef}
            className="absolute inset-0 bg-transparent"
          >
            <img 
              ref={logoRef}
              src="/img/LogoBlack.svg" 
              alt="Zentry Logo"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[70%] max-h-[70%] w-auto h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

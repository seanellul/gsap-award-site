import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "../Button";

gsap.registerPlugin(ScrollTrigger);

const GirlBackground = () => {
  const [showLoop, setShowLoop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const introVideoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    if (!isMobile) {
      // Set the initial clipPath and borderRadius for the video frame
      gsap.set("#video-frame", {
        clipPath: "polygon(0% 0,100% 0, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        backgroundColor: "rgba(245, 245, 245, 0.95)",
      });

      // Create a timeline for the video frame animation
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "girl-back",
          markers: false,
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: 1.5,
        },
      });

      // Animate the clipPath and borderRadius
      tl.to("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 30% 30%",
        backgroundColor: "rgba(245, 245, 245, 0)",
        ease: "power1.inOut",
      });

      // Add a subtle scale animation to the content
      gsap.to(".hero-content", {
        scale: 1.1,
        opacity: 0.8,
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: 1.5,
        },
      });
    }
  }, [isMobile]);

  return (
    <div className="relative h-[100dvh] w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-[100dvh] w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Main intro video, hidden after it ends */}
          {!showLoop && (
            <video
              ref={introVideoRef}
              src="videos/hero/hero-intro.mp4"
              autoPlay
              muted
              playsInline
              className="absolute left-0 top-0 w-full h-full object-cover object-center"
              onEnded={() => setShowLoop(true)}
            />
          )}
          {/* Looping video, shown after intro video ends */}
          {showLoop && (
            <video
              src="videos/hero/hero-loop.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute left-0 top-0 w-full h-full object-cover object-center"
            />
          )}
        </div>

        <div className="absolute left-0 top-10 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10 hero-content">
            <h1 className="font-onest font-black text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-4">
              Unlock Your <br /> Trading Game
            </h1>

            <h2 className="font-onest font-medium text-blue-100 text-lg sm:text-2xl md:text-3xl mb-8">
              The ultimate platform for winners. <div className="mb-2" /> Trade. Win. Repeat.
            </h2>

            <Button
              id="watch-trailer"
              title="Grab The Key"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-[--blue_lagoon] flex-center gap-1"
            />
          </div>
        </div>
{/* 
        <svg
          className="absolute left-0 bottom-0 w-full"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "200px" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,200 1440,0 L1440,200 L0,200 Z"
            fill="#f5f5f5"
          />
        </svg> */}
      </div>
    </div>
  );
};

export default GirlBackground;

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalVideos = isMobile ? 1 : 4; // Only load one video on mobile
  const nextVdRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos, totalVideos]);

  const handleMiniVdClick = () => {
    if (isMobile) return; // Disable click interaction on mobile
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked && !isMobile) {
        // Set the initial visibility of the next video to visible
        gsap.set("#next-video", { visibility: "visible" });
        // Animate the next video to scale up and fill the container
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current?.play(), // Play the video when the animation starts
        });
        // Animate the current video to scale down
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex, isMobile],
      revertOnUpdate: true, // Revert animations when dependencies change
    }
  );

  useGSAP(() => {
    if (!isMobile) {
      // Set the initial clipPath and borderRadius for the video frame
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });
      // Animate the clipPath and borderRadius on scroll
      gsap.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          markers: true,
          trigger: "#video-frame", // Element that triggers the animation
          start: "center center", // Start the animation when the element is in the center of the viewport
          end: "bottom center", // End the animation when the element reaches the bottom center of the viewport
          scrub: true, // Smoothly animate the changes as the user scrolls
        },
      });
    }
  }, [isMobile]);

  const getVideoSrc = (index) => `videos/hero-0.mp4`;

  return (
    <div className="relative h-[100dvh] w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-[100dvh] w-screen overflow-hidden bg-white">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-[100dvh] w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {!isMobile && (
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              <VideoPreview>
                <div
                  onClick={handleMiniVdClick}
                  className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                >
                  <video
                    ref={nextVdRef}
                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                    loop
                    muted
                    id="current-video"
                    className="size-64 origin-center scale-150 object-cover object-center"
                    onLoadedData={handleVideoLoad}
                  />
                </div>
              </VideoPreview>
            </div>
          )}

          {!isMobile && (
            <video
              ref={nextVdRef}
              src={getVideoSrc(currentIndex)}
              loop
              muted
              id="next-video"
              className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
          )}
          <video
            src="videos/hero-0.mp4"
            autoPlay
            loop
            muted
            playsInline // Add playsInline for better mobile support
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
          TR<b>A</b>DING
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-white">
              R<b>E</b>IMAGI<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Tomorrow's platform, <br /> today.
            </p>

            <Button
              id="watch-trailer"
              title="Learn More"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        T<b>R</b>ADING
      </h1>
    </div>
  );
};

export default Hero;

import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Scroller from "./scroller";
import gsap from "gsap";
import React from "react";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, isImage = false }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  useEffect(() => {
    if (isImage && contentRef.current) {
      // Extract the actual text content from the title JSX element
      const titleText = React.Children.toArray(title.props.children)
        .map(child => {
          if (typeof child === 'string') return child;
          if (child.props && child.props.children) return child.props.children;
          return '';
        })
        .join('')
        .trim();

      console.log('Title text:', titleText); // Debug log

      // Create a hash from the title to generate consistent but different values for each card
      const titleHash = titleText.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      console.log('Title hash:', titleHash); // Debug log
      
      // Generate unique animation parameters based on the title hash
      const yOffset = titleText.includes('Crystal-Clear') 
        ? -70 + (titleHash % 20)  // Larger offset for Crystal-Clear (30-70px)
        : 10 + (titleHash % 20); // Normal offset for others (10-30px)
      const rotation = 1 + (titleHash % 15); // Random rotation between 1-16 degrees
      const duration = 1.5 + (titleHash % 3.5); // Random duration between 1.5-5s
      const delay = (titleHash % 2); // Random delay between 0-2s
      
      // Determine rotation direction based on title
      const rotationDirection = titleHash % 2 === 0 ? 1 : -1;
      
      // Add scale animation only for Risk Snapshot
      const shouldScale = titleText.includes('RISK');
      const scaleAmount = shouldScale ? 0.10 : 0; // 5% scale variation

      // Remove rotation for Crystal-Clear Stopout
      const shouldRotate = !titleText.includes('Crystal-Clear');

      console.log('Animation settings:', { // Debug log
        titleText,
        shouldScale,
        shouldRotate,
        yOffset,
        rotation,
        duration,
        delay
      });

      // Create a continuous floating animation
      const floatingAnimation = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: delay,
      });

      floatingAnimation
        .to(contentRef.current, {
          y: -yOffset,
          rotation: shouldRotate ? rotation * rotationDirection : 0,
          scale: shouldScale ? 1 + scaleAmount : 1,
          duration: duration,
          ease: "sine.inOut",
        })
        .to(contentRef.current, {
          y: 0,
          rotation: shouldRotate ? -rotation * rotationDirection : 0,
          scale: shouldScale ? 1 - scaleAmount : 1,
          duration: duration,
          ease: "sine.inOut",
        });

      return () => {
        floatingAnimation.kill();
      };
    }
  }, [isImage, title]);

  return (
    <div className="relative size-full">
      {isImage ? (
        <div ref={contentRef} className="absolute left-0 top-0 size-full">
          <img
            src={src}
            alt={title}
            className="size-full object-cover object-center opacity-50"
          />
        </div>
      ) : (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="features" className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
    <Scroller/>
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Key Trader is simply built different.
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a beautifully designed platform, where details matter, and the experience is second to none.
        </p>
      </div>

   

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/platform_trade.mp4"
          title={
            <>
              Trade with Confi<b>n</b>ce
            </>
          }
          description="Stability harbours confidence. Key Trader is specifically engineered to deliver experience you need to close your trades."
          isComingSoon
        />
      </BentoTilt>



      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="img/assets/astro.webp"
            title={
              <>
                RISK SN<b>A</b>PSHOT
              </>
            }
            description="Know margin, SL/TP P&L, and liquidation price—before you even commit."
            isComingSoon
            isImage={true}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="img/assets/yinyan.png"
            title={
              <>
                HYB<b>r</b>id M<b>a</b>rgin
              </>
            }
            description="Cross-meets-Isolated: one wallet, two styles—switch on demand."
            isComingSoon
            isImage={true}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="img/assets/stopout.png"
            title={
              <>
                Crystal-Cle<b>a</b>r Stop<b>o</b>ut
              </>
            }
            description="See the exact liquidation price—before you ever click 'Buy'."
            isComingSoon
            isImage={true}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-[#082F6DFF] p-5">
            <h1 className="bento-title special-font max-w-64 text-white">
              With M<b>o</b>re Features on the horiz<b>o</b>n.
            </h1>

            {/* <TiLocationArrow className="m-5 scale-[5] self-end" /> */}
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            ref={(el) => {
              if (el) {
                el.playbackRate = 0.5;
              }
            }}
            src="videos/chart_studio.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;

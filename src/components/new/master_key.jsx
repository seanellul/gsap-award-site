import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import AnimatedTitle from "../AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Master_Key = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);

  useGSAP(() => {
    // Main timeline for the key transformation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1.5,
        markers: false,
        anticipatePin: 1,
        onLeave: () => {
          // Reset overlay when leaving the section
          gsap.set(overlayRef.current, { opacity: 0 });
          gsap.set([textRef.current, subtextRef.current], { color: "#000000" });
        },
        onEnterBack: () => {
          // Reapply overlay when scrolling back
          const progress = tl.progress();
          if (progress > 0.5) {
            gsap.set(overlayRef.current, { opacity: 0.95 });
            gsap.set([textRef.current, subtextRef.current], { color: "#ffffff" });
          }
        }
      },
    });

    // Set initial states
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(svgRef.current, { scale: 0.3, opacity: 0.2 });

    // Phase 1: Key grows and becomes prominent (0-40%)
    tl.to(svgRef.current, {
      scale: 3,
      opacity: 0.8,
      duration: 0.4,
      ease: "power2.out",
    })
    
    // Phase 2: Dramatic growth and background takeover (40-70%)
    .to(svgRef.current, {
      scale: 15,
      opacity: 1,
      y: -100,
      duration: 0.3,
      ease: "power2.inOut",
    }, 0.4)
    
    // Start background overlay
    .to(overlayRef.current, {
      opacity: 0.95,
      duration: 0.3,
      ease: "power2.inOut",
    }, 0.5)
    
    // Phase 3: Text color transformation
    .to([textRef.current, subtextRef.current], {
      color: "#ffffff",
      duration: 0.2,
      ease: "power2.inOut",
    }, 0.6)
    
    // Phase 4: Final upward lift (70-100%)
    .to(svgRef.current, {
      scale: 25,
      y: -800,
      opacity: 0.7,
      duration: 0.3,
      ease: "power3.in",
    }, 0.7)
    
    .to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.in",
    }, 0.7)
    
    .to(contentRef.current, {
      y: -100,
      opacity: 0.9,
      duration: 0.3,
      ease: "power2.in",
    }, 0.8);

    // Entrance animation for content
    gsap.fromTo(contentRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[150vh] w-screen overflow-hidden bg-white"
      style={{ 
        isolation: 'isolate',
        zIndex: 'auto'
      }}
    >
      {/* Black overlay that grows with the key */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ 
          zIndex: 1,
          willChange: 'opacity'
        }}
      />

      {/* Background SVG Section */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <img 
          ref={svgRef}
          src="/img/LogoBlack.svg" 
          alt="Master Key"
          className="w-[200px] h-auto object-contain"
          style={{
            filter: 'drop-shadow(0 0 50px rgba(0,0,0,0.3))',
            transformOrigin: 'center center',
            willChange: 'transform, opacity'
          }}
        />
      </div>

      {/* Content Section */}
      <div 
        ref={contentRef}
        className="relative flex flex-col items-center gap-5 pt-36 pb-20"
        style={{ zIndex: 3 }}
      >
        <p 
          ref={subtextRef}
          className="font-general text-sm uppercase md:text-[20px] transition-colors duration-500"
          style={{ 
            color: '#000000',
            willChange: 'color'
          }}
        >
          Your Master Key To
        </p>
        
        <div 
          ref={textRef} 
          style={{ 
            color: '#000000',
            willChange: 'color'
          }}
        >
          <h1 className="font-onest text-black text-center text-8xl font-bold">CONFIDENCE</h1>
        </div>
        
        <p 
          className="text-gray-500 max-w-md text-center leading-relaxed transition-colors duration-500"
          style={{ 
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            marginTop: '1rem'
          }}
        >
          Experience the power, speed, and control of tomorrow's platform—today
        </p>

        {/* Scroll indicator */}
        <div className="mt-8 opacity-60">
          <div className="w-px h-16 bg-current animate-pulse" />
        </div>
      </div>

      {/* Additional floating elements for visual interest */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-green-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default Master_Key;

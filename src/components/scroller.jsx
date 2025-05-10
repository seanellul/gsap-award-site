import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "../gsap/gsap-core";
import "../styles/Scroller.css";

// Register GSAP plugins explicitly to ensure they are recognized
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Scroller = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  // Array of image URLs
  const images = [
    "img/assets/bitcoin.png",
    "img/assets/oil.png",
    "img/assets/euro.png",
    "img/assets/dollar.png",
    "img/assets/tsla.png",
    "img/assets/nasdaq.png",
  ];

  // Data speeds for each image
  const speeds = [0.8, 0.9, 1, 1.1, 0.9, 1.2, 0.8, 1];

  // Heading text
  const headingText = "Trade Anything";

  useEffect(() => {
    // Create a context to batch our GSAP animations
    const ctx = gsap.context(() => {
      try {
        // Temporarily disable ScrollSmoother to test interference with other components
        // const smoother = ScrollSmoother.create({
        //   wrapper: wrapperRef.current,
        //   content: contentRef.current,
        //   smooth: 2,
        //   speed: 3,
        //   effects: true,
        //   normalizeScroll: false, // Prevent interference with main scroll
        //   ignoreMobileResize: true, // Avoid issues on mobile
        //   onUpdate: (self) => {
        //     const velocity = self.getVelocity() / -50;
        //     if (Math.abs(velocity) > 0.1) {
        //       skewSetter(clamp(velocity));
        //     }
        //   },
        //   onStop: () => skewSetter(0)
        // });

        // Create a skew effect specifically for scroller images
        const skewSetter = gsap.quickTo(".scroller-section .gsap-img", "skewY");
        const clamp = gsap.utils.clamp(-20, 20);
        
        // Create a scroll trigger that tracks the velocity
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity() / -50;
            if (Math.abs(velocity) > 0.1) {
              skewSetter(clamp(velocity));
            }
          },
          onLeave: () => skewSetter(0),
          onLeaveBack: () => skewSetter(0),
          markers: false
        });
        
        // Create a timeline for scrolling effects
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
        
        // Pin the section for a brief moment when it's in view
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 25%",
          end: "bottom 75%",
          pin: ".scroller-section .heading-container",
          pinSpacing: false
        });
        
        // Animate all images using their data-speed values
        gsap.utils.toArray(".scroller-section .gsap-img").forEach((img, i) => {
          const speed = parseFloat(img.getAttribute("data-speed")) || 1;
          
          // Parallax scroll effect
          tl.to(img, {
            y: () => (i % 2 === 0 ? -200 : -150) * speed,
            ease: "none"
          }, 0);
        });
        
        // Fade in and slide up the heading when it comes into view
        gsap.fromTo(".scroller-section .scroller-heading", 
          { opacity: 0, y: 50 }, 
          {
            opacity: 1, 
            y: 0,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 25%",
              scrub: true
            }
          }
        );
      } catch (error) {
        console.error("Error setting up GSAP animations:", error);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="scroller" 
      className="scroller-section"
    >
      {/* Images with grid layout */}
      <div className="scroll-wrapper" ref={wrapperRef}>
        <div className="scroll-content" ref={contentRef}>
          {/* Heading text with different styles */}
          <div className="heading-container">
            <h1 className="scroller-heading text">{headingText}</h1>
            <h1 aria-hidden="true" className="scroller-heading outline-text">{headingText}</h1>
            <h1 aria-hidden="true" className="scroller-heading filter-text">{headingText}</h1>
          </div>
          <div className="images">
            {images.map((src, index) => (
              <img 
                key={index} 
                data-speed={speeds[index]} 
                src={src} 
                alt={`Scroller image ${index + 1}`}
                className="gsap-img"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scroller;



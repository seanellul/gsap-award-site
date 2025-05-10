import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const FloatingImage = ({ src, className = "", delay = 0 }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      // Create a continuous floating animation
      const floatingAnimation = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: delay,
      });

      floatingAnimation
        .to(imageRef.current, {
          y: -15,
          rotation: 2,
          duration: 2,
          ease: "sine.inOut",
        })
        .to(imageRef.current, {
          y: 0,
          rotation: -2,
          duration: 2,
          ease: "sine.inOut",
        });

      return () => {
        floatingAnimation.kill();
      };
    }
  }, []);

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
};

const Contact = () => {
  return (
    <div id="contact" className="relative min-h-[50vh] w-screen overflow-hidden bg-black py-16">
      {/* Background Images with Floating Animation */}
      <div className="absolute inset-0">
        <FloatingImage 
          src="/img/assets/logo_frame.png" 
          className="absolute left-[18%] top-[25%] -translate-y-1/2 w-32 opacity-50"
          delay={0.2}
        />
        <FloatingImage 
          src="/img/assets/yinyan.png" 
          className="absolute left-[35%] top-[-25%] w-32 opacity-50"
          delay={0.4}
        />
        <FloatingImage 
          src="/img/assets/stopout.png" 
          className="absolute left-[30%] bottom-[-15%] w-40 opacity-50"
          delay={0.6}
        />
        <FloatingImage 
          src="/img/assets/astro.webp" 
          className="absolute top-[-65%] left-[60%] -translate-y-1/2 w-64 opacity-50"
          delay={0.8}
        />
        <FloatingImage 
          src="/img/assets/keytraderneon.png" 
          className="absolute top-[-130%] left-[69%] w-48 opacity-50 rotate-45"
          delay={0.9}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center text-center">
          <p className="mb-6 font-general text-[10px] uppercase text-blue-50">
            Join Us
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> tr<b>a</b>ding t<b>o</b>gether."
            className="special-font !md:text-[5rem] w-full font-zentry !text-4xl !font-black !leading-[.9] text-blue-50"
          />

          <Button 
            title="Grab The Key" 
            containerClass="mt-8 cursor-pointer hover:scale-105 transition-transform duration-300" 
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
};

export default Contact;

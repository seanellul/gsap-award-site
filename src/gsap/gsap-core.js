import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

// Register all plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export { gsap, ScrollTrigger, ScrollSmoother }; 
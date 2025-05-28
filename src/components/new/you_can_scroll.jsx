import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const YouCanScroll = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const listRef = useRef(null);
  const secondListRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const firstSection = firstSectionRef.current;
    const items = gsap.utils.toArray(listRef.current.querySelectorAll('li'));
    const secondItems = gsap.utils.toArray(secondListRef.current.querySelectorAll('li'));

    // Pin the first section for the scrolling word effect
    ScrollTrigger.create({
      trigger: firstSection,
      start: 'top top',
      end: () => `+=${firstSection.scrollHeight - window.innerHeight}`,
      pin: true,
      anticipatePin: 1,
      scrub: true,
      markers: false,
    });

    // Set initial opacity - first item visible, others dimmed
    gsap.set(items, { opacity: (i) => i !== 0 ? 0.2 : 1 });
    gsap.set(secondItems, { opacity: 0.2 });

    // Timeline for fading list items in/out (dimmer effect)
    const dimmer = gsap.timeline();
    dimmer
      .to(items.slice(1), {
        opacity: 1,
        stagger: 0.5,
        duration: 0.5,
        ease: 'none',
      })
      .to(
        items.slice(0, items.length - 1),
        {
          opacity: 0.2,
          stagger: 0.5,
          duration: 0.5,
          ease: 'none',
        },
        0.5
      );

    // ScrollTrigger for dimmer effect
    ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: 'center center',
      end: 'center center',
      animation: dimmer,
      scrub: 0.2,
      markers: false,
    });

    // Timeline for animating scrollbar color (hue rotation)
    const scroller = gsap.timeline().fromTo(
      document.documentElement,
      { '--hue': 0 },
      { '--hue': 360, ease: 'none' }
    );

    // ScrollTrigger for color animation
    ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: 'center center',
      end: 'center center',
      animation: scroller,
      scrub: 0.2,
      markers: false,
    });

    // Chroma entry effect
    const chromaEntry = gsap.fromTo(
      document.documentElement,
      { '--chroma': 0 },
      {
        '--chroma': 0.3,
        ease: 'none',
        scrollTrigger: {
          scrub: 0.2,
          trigger: items[0],
          start: 'center center+=40',
          end: 'center center',
        }
      }
    );

    // Chroma exit effect
    const chromaExit = gsap.fromTo(
      document.documentElement,
      { '--chroma': 0.3 },
      {
        '--chroma': 0,
        ease: 'none',
        scrollTrigger: {
          scrub: 0.2,
          trigger: items[items.length - 2],
          start: 'center center',
          end: 'center center-=40',
        }
      }
    );

    // Animation for second section items
    gsap.to(secondItems, {
      opacity: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: secondSectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        background: '#000',
        color: '#fff',
        fontFamily: '"General Sans", sans-serif',
        position: 'relative',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px 45px) 50% 50% / 45px 45px,
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px) 50% 50% / 45px 45px
          `,
          mask: 'linear-gradient(-20deg, transparent 50%, white)',
          WebkitMask: 'linear-gradient(-20deg, transparent 50%, white)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Header */}
      <header
        ref={headerRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingInline: '5rem',
        }}
      >
        <h1
          className="fluid"
          style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 0.8,
            margin: 0,
            background: 'linear-gradient(#fff 60%, rgba(255,255,255,0.6))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 900,
            textWrap: 'pretty',
          }}
        >
          Your Master Key<br /> to Confidence.
        </h1>
      </header>

      {/* Main content */}
      <main ref={mainRef} style={{ width: '100%' }}>
        {/* First section with pinned layout */}
        <section
          ref={firstSectionRef}
          style={{
            minHeight: '400vh', // Tall enough for scrolling effect
            position: 'relative',
            background: '#000',
          }}
        >
          {/* Sticky positioned text that stays in place */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '5rem',
              transform: 'translateY(-50%)',
              zIndex: 2,
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 6rem)',
                margin: 0,
                fontWeight: 600,
                background: 'linear-gradient(#fff 50%, rgba(255,255,255,0.4))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                whiteSpace: 'nowrap',
              }}
            >
              Experience the
            </h2>
          </div>

          {/* Scrolling word list */}
          <div
            style={{
              paddingTop: '50vh',
              paddingBottom: '50vh',
              paddingLeft: '20rem', // Offset to appear next to sticky text
            }}
          >
            <ul
              ref={listRef}
              style={{
                '--count': 3,
                '--start': 0,
                '--end': 360,
                '--step': 'calc((var(--end) - var(--start)) / (var(--count) - 1))',
                fontWeight: 600,
                paddingInline: 0,
                margin: 0,
                listStyleType: 'none',
                fontSize: 'clamp(2rem, 6vw, 6rem)',
              }}
            >
              {['SPEED', 'POWER', 'CONTROL'].map((word, index) => (
                <li
                  key={word}
                  style={{
                    '--i': index,
                    color: `oklch(75% 0.3 calc(var(--start) + (var(--step) * var(--i))))`,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '2rem',
                  }}
                >
                  {word.toLowerCase()}.
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Second section */}
        <section
          ref={secondSectionRef}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '2rem',
            background: '#000',
            paddingInline: '5rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 6rem)',
                margin: 0,
                fontWeight: 600,
                background: 'linear-gradient(#fff 50%, rgba(255,255,255,0.4))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: '2rem',
              }}
            >
              Of tomorrow's platform,
            </h2>
            <div
              style={{
                fontSize: 'clamp(2rem, 6vw, 6rem)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                ref={secondListRef}
                style={{
                  background: 'linear-gradient(#fff 50%, rgba(255,255,255,0.4))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                today.
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          paddingBlock: '2rem',
          opacity: 0.5,
          textAlign: 'center',
          fontSize: '0.9rem',
          background: '#000',
        }}
      >
        ʕ⊙ᴥ⊙ʔ Your Master Key &copy; 2024
      </footer>

      {/* CSS Custom Properties for dynamic colors */}
      <style jsx>{`
        :root {
          --hue: 0;
          --chroma: 0;
          --lightness: 75%;
          --start: 0;
          --end: 360;
        }
        
        html {
          scrollbar-color: oklch(var(--lightness) var(--chroma) var(--hue)) transparent;
        }
      `}</style>
    </div>
  );
};

export default YouCanScroll;

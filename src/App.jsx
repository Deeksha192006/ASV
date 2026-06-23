import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import About from './components/About';
import Verticals from './components/Verticals';
import Projects from './components/Projects';
import WhyChooseUs from './components/WhyChooseUs';
import Experience from './components/Experience';
import Investment from './components/Investment';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run animations once preloader load starts triggering content
    if (!isLoaded) return;

    // --- Lenis Smooth Scrolling ---
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenisInstance;

    // Sync ScrollTrigger with Lenis
    lenisInstance.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // --- Parallax Blueprint Grid ---
    const gridAnim = gsap.to('.grid-background', {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    // --- Character Split Text Reveal ---
    const initContentTypingReveals = () => {
      const textElements = document.querySelectorAll(
        '.hero-label, .hero-title-part, .hero-subtitle, .section-title, .section-desc, .feature-text h4, .feature-text p, .vertical-title, .vertical-text, .project-name, .project-type, .why-title, .why-desc, .metric-label, .experience-title, .experience-subtext, .investment-card h4, .investment-card p, .testimonial-quote, .author-name, .author-title, .detail-text h4, .detail-text p, .form-heading, .form-subheading, .footer-desc, .footer-link-group h4, .footer-link-group a'
      );
      
      const uniqueElements = Array.from(textElements).filter((el, idx, self) => self.indexOf(el) === idx);
      
      uniqueElements.forEach(element => {
        if (element.id === 'typed-text') return;
        
        const text = element.textContent.trim();
        if (!text) return;
        
        const words = text.split(/\s+/);
        element.innerHTML = '';
        
        words.forEach((word, wordIdx) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word-span';
          wordSpan.style.display = 'inline-block';
          wordSpan.style.whiteSpace = 'nowrap';
          
          const chars = Array.from(word);
          chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char-span';
            charSpan.style.display = 'inline-block';
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'translateY(6px)';
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });
          
          element.appendChild(wordSpan);
          
          if (wordIdx < words.length - 1) {
            const space = document.createTextNode('\u00A0');
            element.appendChild(space);
          }
        });
        
        element.classList.remove('fade-up');
        
        const charsToAnimate = element.querySelectorAll('.char-span');
        const isLongText = text.length > 80;
        const staggerDelay = isLongText ? 0.005 : 0.012;
        
        ScrollTrigger.create({
          trigger: element,
          start: 'top 95%',
          onEnter: () => {
            gsap.to(charsToAnimate, {
              opacity: 1,
              y: 0,
              stagger: staggerDelay,
              duration: 0.25,
              ease: 'power1.out'
            });
          },
          once: true
        });
      });
    };

    // --- Generic Fade Ups ---
    const initGenericFadeUps = () => {
      const fadeUps = document.querySelectorAll('.fade-up');
      fadeUps.forEach((element) => {
        if (element.closest('.hero-section')) return;

        gsap.fromTo(element, 
          {
            opacity: 0,
            y: 40
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    };

    // Initialize reveals with minor layout buffer
    const timer = setTimeout(() => {
      initContentTypingReveals();
      initGenericFadeUps();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tickerCallback);
      lenisInstance.destroy();
      window.lenis = null;
      if (gridAnim.scrollTrigger) gridAnim.scrollTrigger.kill();
      gridAnim.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded]);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <div className="grid-background"></div>
      
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <Metrics />
            <About />
            <Verticals />
            <Projects />
            <WhyChooseUs />
            <Experience />
            <Investment />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

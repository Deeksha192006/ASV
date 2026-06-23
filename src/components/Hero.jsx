import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    // --- Typing Text Loop ---
    const words = ["Landmarks.", "Ecosystems.", "Workspaces.", "Visions."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const typeText = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 150;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      timer = setTimeout(typeText, typeSpeed);
    };

    timer = setTimeout(typeText, 1500);

    // --- Hero Parallaxes ---
    gsap.registerPlugin(ScrollTrigger);

    const buildingAnim = gsap.fromTo('.hero-building-img', 
      { yPercent: -25 }, 
      {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    const card1Anim = gsap.fromTo('.card-1', 
      { yPercent: -35 }, 
      {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    const card2Anim = gsap.fromTo('.card-2', 
      { yPercent: 40 }, 
      {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    const card3Anim = gsap.fromTo('.card-3', 
      { yPercent: -28 }, 
      {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    return () => {
      clearTimeout(timer);
      if (buildingAnim.scrollTrigger) buildingAnim.scrollTrigger.kill();
      if (card1Anim.scrollTrigger) card1Anim.scrollTrigger.kill();
      if (card2Anim.scrollTrigger) card2Anim.scrollTrigger.kill();
      if (card3Anim.scrollTrigger) card3Anim.scrollTrigger.kill();
      buildingAnim.kill();
      card1Anim.kill();
      card2Anim.kill();
      card3Anim.kill();
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-label fade-up">CHENNAI'S PREMIER REAL ESTATE GROUP</span>
          <h1 className="hero-title">
            <span className="hero-title-part fade-up">Building Tomorrow's</span>{' '}
            <span className="gold-gradient-text" id="typed-text">{typedText}</span>
            <span className="typing-cursor">|</span><br />
            <span className="hero-title-part fade-up">Creating Spaces That Inspire Growth.</span>
          </h1>
          <p className="hero-subtitle fade-up">
            ASV Group is one of South India's most trusted real estate developers, creating premium commercial spaces, luxury residences, industrial parks, logistics hubs, and next-generation coworking ecosystems.
          </p>
          <div className="hero-buttons fade-up">
            <a href="#projects" className="btn btn-primary">Explore Projects</a>
            <a href="#contact" className="btn btn-secondary">Book Consultation</a>
          </div>
        </div>
        
        <div className="hero-visual fade-up">
          <div className="building-render-container">
            <img src="assets/hero_3d_tower.png" alt="ASV Commercial Tower Render" className="hero-building-img" />
            <div className="light-beam"></div>
            
            <div className="floating-card card-1 glass-card">
              <div className="card-icon"><i className="fa-solid fa-building-circle-check gold-text"></i></div>
              <div>
                <div className="card-title">Grade-A Space</div>
                <div className="card-desc">Leed Certified</div>
              </div>
            </div>
            
            <div className="floating-card card-2 glass-card">
              <div className="card-icon"><i className="fa-solid fa-location-dot gold-text"></i></div>
              <div>
                <div className="card-title">Prime Locations</div>
                <div className="card-desc">OMR & CBD Chennai</div>
              </div>
            </div>

            <div className="floating-card card-3 glass-card">
              <div className="card-icon"><i className="fa-solid fa-chart-line gold-text"></i></div>
              <div>
                <div className="card-title">HNI Investment</div>
                <div className="card-desc">High ROI Yield</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

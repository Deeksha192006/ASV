import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // About Section Column Parallax
    const sideAnim1 = gsap.fromTo('.about-image-side', 
      { yPercent: 22 }, 
      {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    const sideAnim2 = gsap.fromTo('.about-content-side', 
      { yPercent: -20 }, 
      {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // About image parallax inside its container
    const imgAnim = gsap.fromTo('.about-img', 
      { yPercent: -28 }, 
      {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Entrance fade scale reveal on the image wrapper
    const wrapperReveal = gsap.fromTo('.about-image-wrapper',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );

    return () => {
      if (sideAnim1.scrollTrigger) sideAnim1.scrollTrigger.kill();
      if (sideAnim2.scrollTrigger) sideAnim2.scrollTrigger.kill();
      if (imgAnim.scrollTrigger) imgAnim.scrollTrigger.kill();
      if (wrapperReveal.scrollTrigger) wrapperReveal.scrollTrigger.kill();
      sideAnim1.kill();
      sideAnim2.kill();
      imgAnim.kill();
      wrapperReveal.kill();
    };
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          
          <div className="about-image-side">
            <div className="about-image-wrapper">
              <img src="assets/about_building.png" alt="ASV Luxury Office Facade" className="about-img" />
              <div className="about-image-glow"></div>
            </div>
          </div>
          
          <div className="about-content-side">
            <span className="section-tag">OUR LEGACY</span>
            <div className="header-line"></div>
            <h2 className="section-title">Redefining Skylines Across South India</h2>
            <p className="section-desc">
              ASV Group has transformed urban landscapes through iconic commercial developments, premium residential communities, industrial infrastructure, and innovative workspaces. Every project reflects our commitment to quality, transparency, sustainability, and long-term value creation.
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-map-pin"></i></div>
                <div className="feature-text">
                  <h4>Premium Locations</h4>
                  <p>Strategically situated in Chennai's prime commercial corridors.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-file-shield"></i></div>
                <div className="feature-text">
                  <h4>CMDA Compliant Projects</h4>
                  <p>Fully compliant developments adhering to highest structural standards.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-briefcase"></i></div>
                <div className="feature-text">
                  <h4>Transparent Documentation</h4>
                  <p>Direct deal-making built on mutual trust and absolute integrity.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-clock"></i></div>
                <div className="feature-text">
                  <h4>Timely Delivery</h4>
                  <p>Consistently honoring handovers and timelines for decades.</p>
                </div>
              </div>
            </div>
            
            <div>
              <a href="#contact" className="btn btn-primary">Discover Our Legacy</a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

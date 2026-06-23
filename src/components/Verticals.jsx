import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Verticals() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const vertCards = document.querySelectorAll('.vertical-card');

    vertCards.forEach((card, idx) => {
      // 1. Column parallax shifts (scrubbed)
      const offset = idx % 2 === 0 ? -32 : 32;
      gsap.fromTo(card, 
        { yPercent: -offset }, 
        {
          yPercent: offset,
          ease: 'none',
          scrollTrigger: {
            trigger: '.verticals-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // 2. Entrance Fade Up Reveal (runs once)
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

      // 3D tilt effects
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          ease: 'power1.out',
          duration: 0.3,
          overwrite: 'auto'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          ease: 'power2.out',
          duration: 0.6,
          overwrite: 'auto'
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === '.verticals-section' || Array.from(vertCards).includes(trigger.vars.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="verticals" className="verticals-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">OUR PORTFOLIO</span>
          <div className="header-line"></div>
          <h2 className="section-title">Our Business Ecosystem</h2>
        </div>
        
        <div className="verticals-grid">
          
          {/* Card 1 */}
          <div className="vertical-card glass-card">
            <div className="vertical-card-img" style={{ backgroundImage: 'url(assets/vertical_commercial.png)' }}></div>
            <div className="vertical-card-overlay"></div>
            <div className="vertical-card-content">
              <div className="vertical-icon">
                <i className="fa-solid fa-building-user"></i>
              </div>
              <div>
                <h3 className="vertical-title">Business Scape</h3>
                <p className="vertical-text">
                  Luxury commercial office towers, IT parks, and Grade-A workspaces designed for modern enterprises.
                </p>
              </div>
              <span className="vertical-learn-more">Explore Portfolio <i className="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="vertical-card glass-card">
            <div className="vertical-card-img" style={{ backgroundImage: 'url(assets/vertical_residential.png)' }}></div>
            <div className="vertical-card-overlay"></div>
            <div className="vertical-card-content">
              <div className="vertical-icon">
                <i className="fa-solid fa-house-chimney-window"></i>
              </div>
              <div>
                <h3 className="vertical-title">Home Scape</h3>
                <p className="vertical-text">
                  Premium residences built around comfort, lifestyle, and long-term value.
                </p>
              </div>
              <span className="vertical-learn-more">Explore Portfolio <i className="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="vertical-card glass-card">
            <div className="vertical-card-img" style={{ backgroundImage: 'url(assets/vertical_industrial.png)' }}></div>
            <div className="vertical-card-overlay"></div>
            <div className="vertical-card-content">
              <div className="vertical-icon">
                <i className="fa-solid fa-warehouse"></i>
              </div>
              <div>
                <h3 className="vertical-title">Industrial & Logistics</h3>
                <p className="vertical-text">
                  Future-ready infrastructure supporting manufacturing, warehousing, and logistics excellence.
                </p>
              </div>
              <span className="vertical-learn-more">Explore Portfolio <i className="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="vertical-card glass-card">
            <div className="vertical-card-img" style={{ backgroundImage: 'url(assets/vertical_coworking.png)' }}></div>
            <div className="vertical-card-overlay"></div>
            <div className="vertical-card-content">
              <div className="vertical-icon">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <div>
                <h3 className="vertical-title">Coworking Spaces</h3>
                <p className="vertical-text">
                  Flexible managed workspaces empowering entrepreneurs, startups, and enterprises.
                </p>
              </div>
              <span className="vertical-learn-more">Explore Portfolio <i className="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

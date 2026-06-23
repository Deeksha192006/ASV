import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyChooseUs() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const whyCards = document.querySelectorAll('.why-card');

    // 1. Entrance stagger reveal of cards in parallel
    const entranceAnim = gsap.fromTo(whyCards,
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-grid',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );

    // 2. Parallel scroll shift (parallax)
    const shiftAnims = [];
    whyCards.forEach((card, idx) => {
      const speed = (idx % 3 - 1) * 20;
      
      const shiftAnim = gsap.fromTo(card, 
        { yPercent: -speed }, 
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: '.why-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
      shiftAnims.push(shiftAnim);

      // 3. 3D tilt effects
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
      if (entranceAnim.scrollTrigger) entranceAnim.scrollTrigger.kill();
      entranceAnim.kill();
      shiftAnims.forEach(anim => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      });
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === '.why-section' || trigger.vars.trigger === '.why-grid') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="why-asv" className="why-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">THE ASV ADVANTAGE</span>
          <div className="header-line"></div>
          <h2 className="section-title">Why Industry Leaders Choose ASV</h2>
        </div>
        
        <div className="why-grid">
          
          {/* Card 1 */}
          <div className="why-card glass-card">
            <div className="why-icon"><i className="fa-solid fa-gem brand-gradient-text"></i></div>
            <h3 className="why-title">20+ Years Expertise</h3>
            <p className="why-desc">A legacy of delivering top-tier commercial developments and asset appreciation.</p>
          </div>
          
          {/* Card 2 */}
          <div className="why-card glass-card">
            <div className="why-icon"><i className="fa-solid fa-map-location-dot brand-gradient-text"></i></div>
            <h3 className="why-title">Prime Business Locations</h3>
            <p className="why-desc">Developments located along Chennai's high-growth corridors for maximum visibility and accessibility.</p>
          </div>
          
          {/* Card 3 */}
          <div className="why-card glass-card">
            <div className="why-icon"><i className="fa-solid fa-compass-drafting brand-gradient-text"></i></div>
            <h3 className="why-title">World-Class Construction</h3>
            <p className="why-desc">Crafted in collaboration with international architects, complying with global standards.</p>
          </div>
          
          {/* Card 4 */}
          <div className="why-card glass-card">
            <div className="why-icon"><i className="fa-solid fa-shield-check brand-gradient-text"></i></div>
            <h3 className="why-title">Transparency & Trust</h3>
            <p className="why-desc">Uncompromising compliance, clean legal structures, and clear title ownerships.</p>
          </div>
          
          {/* Card 5 */}
          <div className="why-card glass-card">
            <div className="why-icon"><i className="fa-solid fa-microchip brand-gradient-text"></i></div>
            <h3 className="why-title">Future-Ready Infrastructure</h3>
            <p className="why-desc">Premium automation, high-speed fiber backbone, and modern backup utilities.</p>
          </div>
          
          {/* Card 6 */}
          <div className="why-card glass-card">
            <div className="why-icon"><i className="fa-solid fa-coins brand-gradient-text"></i></div>
            <h3 className="why-title">Strong Investment Value</h3>
            <p className="why-desc">Grade-A properties constructed to command high rental yields and long-term capital growth.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

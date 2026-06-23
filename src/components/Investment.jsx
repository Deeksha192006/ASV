import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Investment() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Left side column scroll parallax
    const shiftAnim1 = gsap.fromTo('.investment-content-side', 
      { yPercent: 15 }, 
      {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.investment-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Right side column scroll parallax
    const shiftAnim2 = gsap.fromTo('.investment-cards-side', 
      { yPercent: -15 }, 
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.investment-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Inner image parallax (moving in parallel within the viewport)
    const imgAnim = gsap.fromTo('.investment-img',
      { yPercent: -20 },
      {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.investment-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Stagger reveal of investment cards in parallel
    const cardsReveal = gsap.fromTo('.investment-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.investment-cards-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3D tilt effects on investment cards
    const investCards = document.querySelectorAll('.investment-card');
    investCards.forEach(card => {
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
      if (shiftAnim1.scrollTrigger) shiftAnim1.scrollTrigger.kill();
      if (shiftAnim2.scrollTrigger) shiftAnim2.scrollTrigger.kill();
      if (imgAnim.scrollTrigger) imgAnim.scrollTrigger.kill();
      if (cardsReveal.scrollTrigger) cardsReveal.scrollTrigger.kill();
      shiftAnim1.kill();
      shiftAnim2.kill();
      imgAnim.kill();
      cardsReveal.kill();
    };
  }, []);

  return (
    <section className="investment-section">
      <div className="container">
        <div className="investment-grid">
          
          <div className="investment-content-side">
            <span className="section-tag">PARTNERSHIPS</span>
            <div className="header-line"></div>
            <h2 className="section-title">Invest In The Future</h2>
            <p className="section-desc">
              From Grade-A commercial spaces and business parks to premium residential developments and industrial ecosystems, ASV offers investment opportunities built for long-term appreciation and growth.
            </p>
            <p className="section-desc-sub" style={{ color: 'var(--text-gray)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: '1.7' }}>
              Partner with us to diversify your wealth portfolio. Our legal compliance, prime land bank acquisitions, and operational efficiency ensure secure assets with strong capital yields.
            </p>
            <div className="investment-image-wrapper">
              <img src="assets/investment_highlight.png" alt="ASV Skyscraper Blueprint Illustration" className="investment-img" />
              <div className="about-image-glow"></div>
            </div>
          </div>
          
          <div className="investment-cards-side">
            <div className="investment-cards-grid">
              
              <div className="investment-card glass-card">
                <div className="invest-badge">Yield: 8-10%</div>
                <h4>Commercial</h4>
                <p>Invest in Grade-A office spaces and premium retail assets in prime locations.</p>
              </div>
              
              <div className="investment-card glass-card">
                <div className="invest-badge">Growth: High</div>
                <h4>Residential</h4>
                <p>Luxury apartments and villas built with premium specifications in Chennai.</p>
              </div>
              
              <div className="investment-card glass-card">
                <div className="invest-badge">Stable Rent</div>
                <h4>Industrial</h4>
                <p>Logistics hubs, warehousing parks, and manufacturing infrastructure assets.</p>
              </div>
              
              <div className="investment-card glass-card">
                <div className="invest-badge">Flex Return</div>
                <h4>Coworking</h4>
                <p>Invest in managed, modern, and shared workspaces driving high occupancy.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

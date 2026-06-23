import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Metrics() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
      const numberEl = card.querySelector('.metric-number');
      if (!numberEl) return;
      
      const targetVal = parseInt(numberEl.getAttribute('data-target'));
      const circleProgress = card.querySelector('.circle-progress');
      const counterObj = { count: 0 };

      let suffix = "+";
      if (targetVal === 3) {
        suffix = "M+";
      } else if (card.innerText.toLowerCase().includes("satisfaction") || (targetVal === 100 && card.innerText.includes("Satisfaction"))) {
        suffix = "%";
      }

      // Parallax diagonal shift (from original script)
      const index = Array.from(metricCards).indexOf(card);
      const speed = (index + 1) * 15 - 38;
      
      const cardParallax = gsap.fromTo(card, 
        { yPercent: -speed }, 
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: '.metrics-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Trigger metric counts
      const countTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(counterObj, {
            count: targetVal,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              numberEl.innerText = Math.floor(counterObj.count) + suffix;
            }
          });

          if (circleProgress) {
            gsap.to(circleProgress, {
              strokeDashoffset: 0,
              duration: 2.2,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        },
        onLeaveBack: () => {
          counterObj.count = 0;
          numberEl.innerText = "0" + suffix;
          if (circleProgress) {
            gsap.to(circleProgress, {
              strokeDashoffset: 283,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        }
      });

      // 3D tilt effect on metrics cards
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
        if (trigger.vars.trigger === '.metrics-section' || Array.from(metricCards).includes(trigger.vars.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="metrics-section">
      <div className="container">
        <div className="metrics-grid">
          
          <div className="metric-card glass-card">
            <div className="metric-icon-wrap">
              <svg className="metric-circle-svg" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="45"></circle>
                <circle className="circle-progress" cx="50" cy="50" r="45"></circle>
              </svg>
              <i className="fa-solid fa-award brand-gradient-text"></i>
            </div>
            <div className="metric-number" data-target="20">0</div>
            <div className="metric-label">Years of Excellence</div>
          </div>
          
          <div className="metric-card glass-card">
            <div className="metric-icon-wrap">
              <svg className="metric-circle-svg" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="45"></circle>
                <circle className="circle-progress" cx="50" cy="50" r="45"></circle>
              </svg>
              <i className="fa-solid fa-shapes brand-gradient-text"></i>
            </div>
            <div className="metric-number" data-target="3">0</div>
            <div className="metric-label">M+ Sq.Ft Delivered</div>
          </div>
          
          <div className="metric-card glass-card">
            <div className="metric-icon-wrap">
              <svg className="metric-circle-svg" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="45"></circle>
                <circle className="circle-progress" cx="50" cy="50" r="45"></circle>
              </svg>
              <i className="fa-solid fa-handshake brand-gradient-text"></i>
            </div>
            <div className="metric-number" data-target="100">0</div>
            <div className="metric-label">Corporate Clients</div>
          </div>
          
          <div className="metric-card glass-card">
            <div className="metric-icon-wrap">
              <svg className="metric-circle-svg" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="45"></circle>
                <circle className="circle-progress" cx="50" cy="50" r="45"></circle>
              </svg>
              <i className="fa-solid fa-face-smile brand-gradient-text"></i>
            </div>
            <div className="metric-number" data-target="100">0</div>
            <div className="metric-label">Client Satisfaction %</div>
          </div>

        </div>
      </div>
    </section>
  );
}

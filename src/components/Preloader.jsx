import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const loadObj = { val: 0 };
    const preloader = document.getElementById('preloader');
    const loaderBar = document.querySelector('.loader-bar');
    
    // First fade-in logo
    gsap.to('.loader-logo', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    const preloaderTl = gsap.timeline({
      onComplete: () => {
        // Dismiss preloader
        gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        })
        .to(preloader, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut'
        })
        .fromTo('.navbar', 
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-section .fade-up',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15 },
          '-=0.6'
        );
      }
    });

    preloaderTl.to(loadObj, {
      val: 100,
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        const currentVal = Math.floor(loadObj.val);
        setPercentage(currentVal);
        if (loaderBar) {
          loaderBar.style.width = `${currentVal}%`;
        }
      }
    });

    return () => {
      preloaderTl.kill();
    };
  }, [onComplete]);

  return (
    <div id="preloader">
      <div className="loader-content">
        <div className="loader-logo" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <img src="assets/logo.png" alt="ASV Group Logo" />
        </div>
        <div className="loader-bar-bg">
          <div className="loader-bar"></div>
        </div>
        <div className="loader-counter">{percentage}%</div>
      </div>
    </div>
  );
}

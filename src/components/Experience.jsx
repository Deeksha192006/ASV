import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Experience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const bgAnim = gsap.fromTo('.experience-parallax-bg',
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.experience-section',
          scrub: true,
          start: 'top bottom',
          end: 'bottom top'
        }
      }
    );

    const layersAnim = [];
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
      
      const layerAnim = gsap.fromTo(layer,
        { yPercent: -40 * speed },
        {
          yPercent: 40 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: '.experience-section',
            scrub: true,
            start: 'top bottom',
            end: 'bottom top'
          }
        }
      );
      layersAnim.push(layerAnim);
    });

    return () => {
      if (bgAnim.scrollTrigger) bgAnim.scrollTrigger.kill();
      bgAnim.kill();
      layersAnim.forEach(anim => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      });
    };
  }, []);

  return (
    <section className="experience-section">
      <div className="experience-parallax-bg"></div>
      <div className="experience-overlay"></div>
      
      <div className="parallax-layer layer-1" data-speed="0.2">
        <i className="fa-solid fa-compass-drafting"></i>
      </div>
      <div className="parallax-layer layer-2" data-speed="-0.15">
        <i className="fa-solid fa-shapes"></i>
      </div>
      
      <div className="container text-center experience-content">
        <h2 className="experience-title">Every Landmark Begins With A Vision</h2>
        <p className="experience-subtext">
          We don't just construct buildings. We create destinations that drive growth, inspire innovation, and shape the future.
        </p>
        <div>
          <a href="#contact" className="btn btn-primary">Explore Opportunities</a>
        </div>
      </div>
    </section>
  );
}

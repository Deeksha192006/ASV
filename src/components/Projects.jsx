import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Projects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const sliderContent = document.getElementById('projects-slider');
    const projectsSection = document.querySelector('.projects-section');
    
    if (sliderContent && projectsSection) {
      const getScrollWidth = () => {
        const firstCard = document.querySelector('.project-card');
        if (!firstCard) return 0;
        const cardWidth = firstCard.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(sliderContent).gap) || 0;
        const cardCount = document.querySelectorAll('.project-card').length;
        
        return (cardWidth * cardCount) + (gap * (cardCount - 1)) - window.innerWidth + 128;
      };

      const horizTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.projects-section',
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      horizTl.to(sliderContent, {
        x: () => -getScrollWidth(),
        ease: 'none'
      });

      horizTl.to('.project-img', {
        xPercent: 12,
        ease: 'none'
      }, 0);

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (horizTl.scrollTrigger) {
          horizTl.scrollTrigger.kill();
        }
        horizTl.kill();
      };
    }
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header-sticky">
        <div className="container">
          <span className="section-tag">PORTFOLIO SHIFT</span>
          <div className="header-line"></div>
          <h2 className="section-title">Signature Developments</h2>
        </div>
      </div>
      
      <div className="projects-horizontal-wrapper">
        <div className="projects-scroll-content" id="projects-slider">
          
          {/* Project 1 */}
          <div className="project-card">
            <div className="project-img-container">
              <img src="assets/project_suntech.png" alt="ASV Suntech Park" className="project-img" />
              <div className="project-overlay">
                <div className="project-info">
                  <span className="project-location"><i className="fa-solid fa-map-pin"></i> OMR, Chennai</span>
                  <h3 className="project-name">ASV Suntech Park</h3>
                  <p className="project-type">Premium IT Park</p>
                  <span className="project-details-btn">View Details <i className="fa-solid fa-plus"></i></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="project-card">
            <div className="project-img-container">
              <img src="assets/project_titanium.png" alt="ASV Titanium" className="project-img" />
              <div className="project-overlay">
                <div className="project-info">
                  <span className="project-location"><i className="fa-solid fa-map-pin"></i> Perungudi, Chennai</span>
                  <h3 className="project-name">ASV Titanium</h3>
                  <p className="project-type">Commercial Workspace</p>
                  <span className="project-details-btn">View Details <i className="fa-solid fa-plus"></i></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="project-card">
            <div className="project-img-container">
              <img src="assets/project_chandilya.png" alt="ASV Chandilya Tower" className="project-img" />
              <div className="project-overlay">
                <div className="project-info">
                  <span className="project-location"><i className="fa-solid fa-map-pin"></i> OMR, Chennai</span>
                  <h3 className="project-name">ASV Chandilya Tower</h3>
                  <p className="project-type">Grade-A Business Tower</p>
                  <span className="project-details-btn">View Details <i className="fa-solid fa-plus"></i></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project 4 */}
          <div className="project-card">
            <div className="project-img-container">
              <img src="assets/project_crown.png" alt="ASV Crown Plaza" className="project-img" />
              <div className="project-overlay">
                <div className="project-info">
                  <span className="project-location"><i className="fa-solid fa-map-pin"></i> Velachery, Chennai</span>
                  <h3 className="project-name">ASV Crown Plaza</h3>
                  <p className="project-type">Retail & Commercial Hub</p>
                  <span className="project-details-btn">View Details <i className="fa-solid fa-plus"></i></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project 5 */}
          <div className="project-card">
            <div className="project-img-container">
              <img src="assets/project_bethel.png" alt="ASV Bethel Square" className="project-img" />
              <div className="project-overlay">
                <div className="project-info">
                  <span className="project-location"><i className="fa-solid fa-map-pin"></i> Nungambakkam, Chennai</span>
                  <h3 className="project-name">ASV Bethel Square</h3>
                  <p className="project-type">Premium Corporate Address</p>
                  <span className="project-details-btn">View Details <i className="fa-solid fa-plus"></i></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

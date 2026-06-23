import React, { useState, useEffect, useRef } from 'react';

const TESTIMONIALS_DATA = [
  {
    quote: "ASV consistently delivers premium developments that exceed expectations. Their attention to structural detail and high-end aesthetics makes them a clear favorite for multinational corporate tenants.",
    name: "Rohan Krishnakumar",
    title: "VP Facilities, TechCorp Global",
    avatar: "assets/avatar_rohan.png"
  },
  {
    quote: "Exceptional quality, transparency, and long-term value. We've worked with several real estate firms, but ASV's transparent processes and focus on Grade-A design are unmatched.",
    name: "Ananya Sen",
    title: "Managing Director, Zenith Fund",
    avatar: "assets/avatar_ananya.png"
  },
  {
    quote: "A trusted partner for commercial real estate investments. Their commercial spaces along Chennai's OMR corridor have provided us with fantastic capital appreciation and reliable lease returns.",
    name: "Sanjay Ramaswamy",
    title: "Principal Investor, HNI Capital India",
    avatar: "assets/avatar_sanjay.png"
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayTimer = useRef(null);

  const resetAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
    autoplayTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 7000);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    resetAutoplay();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    resetAutoplay();
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    resetAutoplay();
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">TRUSTED BY LEADERS</span>
          <div className="header-line"></div>
          <h2 className="section-title">What Our Partners Say</h2>
        </div>
        
        <div className="testimonials-slider-container">
          <div className="testimonials-track" id="testimonials-track">
            {TESTIMONIALS_DATA.map((item, index) => (
              <div
                key={index}
                className={`testimonial-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="testimonial-quote">
                  "{item.quote}"
                </div>
                <div className="testimonial-author">
                  {item.avatar && (
                    <div className="testimonial-avatar">
                      <img src={item.avatar} alt={item.name} />
                    </div>
                  )}
                  <div className="author-details">
                    <h4 className="author-name">{item.name}</h4>
                    <p className="author-title">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-controls">
            <button className="control-btn prev-btn" onClick={handlePrev} aria-label="Previous Testimonial">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="slider-dots">
              {TESTIMONIALS_DATA.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
            <button className="control-btn next-btn" onClick={handleNext} aria-label="Next Testimonial">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

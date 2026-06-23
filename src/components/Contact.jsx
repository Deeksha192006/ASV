import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const shiftAnim1 = gsap.fromTo('.contact-info-side', 
      { yPercent: 18 }, 
      {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    const shiftAnim2 = gsap.fromTo('.contact-form-side', 
      { yPercent: -18 }, 
      {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // 3D tilt effect on the form card
    const formCard = document.querySelector('.contact-form-card');
    if (formCard) {
      const handleMouseMove = (e) => {
        const rect = formCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        gsap.to(formCard, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          ease: 'power1.out',
          duration: 0.3,
          overwrite: 'auto'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(formCard, {
          rotateX: 0,
          rotateY: 0,
          ease: 'power2.out',
          duration: 0.6,
          overwrite: 'auto'
        });
      };

      formCard.addEventListener('mousemove', handleMouseMove);
      formCard.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (shiftAnim1.scrollTrigger) shiftAnim1.scrollTrigger.kill();
      if (shiftAnim2.scrollTrigger) shiftAnim2.scrollTrigger.kill();
      shiftAnim1.kill();
      shiftAnim2.kill();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ message: '', type: '' });

    setTimeout(() => {
      setSubmitting(false);
      setFeedback({
        message: `Thank you, ${formData.name}! Your consultation request has been received. Our Relationship Director will contact you within 24 hours.`,
        type: 'success'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Auto scroll slightly to feedback if needed
      if (window.lenis) {
        const feedbackEl = document.getElementById('form-feedback');
        if (feedbackEl) {
          window.lenis.scrollTo(feedbackEl, { offset: -100 });
        }
      }

      // Hide feedback message after 8 seconds
      setTimeout(() => {
        const feedbackEl = document.getElementById('form-feedback');
        if (feedbackEl) {
          gsap.to(feedbackEl, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              setFeedback({ message: '', type: '' });
              // Reset opacity back for future submissions
              gsap.set(feedbackEl, { opacity: 1 });
            }
          });
        }
      }, 8000);

    }, 1800);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          
          <div className="contact-info-side">
            <span className="section-tag">GET IN TOUCH</span>
            <h2 className="section-title">Let's Build Something Extraordinary</h2>
            <p className="section-desc">
              Connect with our investment relation officers or commercial leasing experts to explore spaces that match your corporate vision.
            </p>
            
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="detail-icon"><i className="fa-solid fa-building-shield"></i></div>
                <div className="detail-text">
                  <h4>Corporate Office</h4>
                  <p>ASV Bethel Square, Nungambakkam, Chennai, India</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="detail-icon"><i className="fa-solid fa-phone-volume"></i></div>
                <div className="detail-text">
                  <h4>Phone Enquiry</h4>
                  <p><a href="tel:+919884685000">+91 98846 85000</a></p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="detail-icon"><i className="fa-solid fa-envelope-open-text"></i></div>
                <div className="detail-text">
                  <h4>Email Connect</h4>
                  <p><a href="mailto:crm@asvgroup.in">crm@asvgroup.in</a></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-side">
            <div className="contact-form-card glass-card">
              <h3 className="form-heading">Schedule A Private Tour</h3>
              <p className="form-subheading">Submit your details below, and our Relationship Director will get in touch with you shortly.</p>
              
              <form id="luxury-contact-form" className="luxury-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Corporate Email Address</label>
                </div>
                
                <div className="form-group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>
                
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="message">Describe Your Requirement</label>
                </div>
                
                <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span>Processing Request...</span>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                    </>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <i className="fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
              
              {feedback.message && (
                <div id="form-feedback" className={`form-feedback-message ${feedback.type}`}>
                  {feedback.message}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

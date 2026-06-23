import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="assets/logo.png" alt="ASV Group Logo" style={{ height: '45px', width: 'auto' }} />
            </div>
            <p className="footer-desc">
              Building iconic spaces that transform cities, inspire human collaboration, and create lasting financial value.
            </p>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-link-group">
              <h4>Business Verticals</h4>
              <ul>
                <li><a href="#verticals">Business Scape</a></li>
                <li><a href="#verticals">Home Scape</a></li>
                <li><a href="#verticals">Industrial & Logistics</a></li>
                <li><a href="#verticals">Coworking Spaces</a></li>
              </ul>
            </div>
            
            <div className="footer-link-group">
              <h4>Developments</h4>
              <ul>
                <li><a href="#projects">ASV Suntech Park</a></li>
                <li><a href="#projects">ASV Titanium</a></li>
                <li><a href="#projects">ASV Chandilya</a></li>
                <li><a href="#projects">ASV Crown Plaza</a></li>
                <li><a href="#projects">ASV Bethel Square</a></li>
              </ul>
            </div>
            
            <div className="footer-link-group">
              <h4>Corporate Connect</h4>
              <ul>
                <li><a href="#about">About Legacy</a></li>
                <li><a href="#why-asv">Why Choose ASV</a></li>
                <li><a href="#contact">Private Tour</a></li>
                <li><a href="#contact">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="footer-divider" />
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; 2026 ASV Group. All Rights Reserved.
          </div>
          
          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn" className="social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="Instagram" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="YouTube" className="social-icon"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section calculation
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (window.lenis) {
      if (!mobileMenuOpen) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    if (window.lenis) {
      window.lenis.start();
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#" className="logo" onClick={closeMobileMenu}>
          <img src="assets/logo.png" alt="ASV Group Logo" />
        </a>
        
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} id="nav-menu">
          <ul>
            <li>
              <a
                href="#home"
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#verticals"
                className={`nav-link ${activeSection === 'verticals' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Business Verticals
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#why-asv"
                className={`nav-link ${activeSection === 'why-asv' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Why ASV
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="nav-actions">
          <a href="#contact" className="btn btn-primary nav-cta">Schedule Consultation</a>
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

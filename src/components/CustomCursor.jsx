import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  useEffect(() => {
    // Only initialize on screens with pointer capability
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const cursorDot = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');

    if (cursorDot && cursorFollower) {
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(cursorDot, {
          x: mouseX,
          y: mouseY,
          duration: 0.02,
          overwrite: 'auto'
        });

        gsap.to(cursorFollower, {
          x: mouseX,
          y: mouseY,
          duration: 0.15,
          overwrite: 'auto'
        });
      };

      const handleMouseOver = (e) => {
        const target = e.target.closest('a, button, .btn, .project-card, .vertical-card, .why-card, .metric-card, .control-btn, .mobile-menu-toggle, input, textarea');
        if (target) {
          gsap.to(cursorFollower, {
            width: 60,
            height: 60,
            borderColor: '#C9A86A',
            backgroundColor: 'rgba(201, 168, 106, 0.05)',
            duration: 0.3
          });
          gsap.to(cursorDot, {
            scale: 0.5,
            backgroundColor: '#FFF',
            duration: 0.3
          });
        }
      };

      const handleMouseOut = (e) => {
        const target = e.target.closest('a, button, .btn, .project-card, .vertical-card, .why-card, .metric-card, .control-btn, .mobile-menu-toggle, input, textarea');
        if (target) {
          gsap.to(cursorFollower, {
            width: 40,
            height: 40,
            borderColor: '#C9A86A',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            duration: 0.3
          });
          gsap.to(cursorDot, {
            scale: 1,
            backgroundColor: '#C9A86A',
            duration: 0.3
          });
        }
      };

      const handleMouseDown = () => {
        gsap.to(cursorFollower, {
          scale: 0.8,
          backgroundColor: 'rgba(201, 168, 106, 0.2)',
          duration: 0.1
        });
      };

      const handleMouseUp = () => {
        gsap.to(cursorFollower, {
          scale: 1,
          backgroundColor: 'rgba(201, 168, 106, 0.05)',
          duration: 0.1
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return (
    <>
      <div className="custom-cursor"></div>
      <div className="custom-cursor-follower"></div>
    </>
  );
}

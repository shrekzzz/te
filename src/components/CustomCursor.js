'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    animateFollower();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{
          width: isHovering ? '18px' : '10px',
          height: isHovering ? '18px' : '10px',
          boxShadow: isHovering
            ? '0 0 20px rgba(92,200,255,0.8), 0 0 40px rgba(92,200,255,0.3)'
            : '0 0 12px rgba(92,200,255,0.5)',
        }}
      />
      <div
        ref={followerRef}
        className="cursor-follower"
        style={{
          width: isHovering ? '50px' : '36px',
          height: isHovering ? '50px' : '36px',
          borderColor: isHovering ? 'rgba(92,200,255,0.7)' : 'rgba(92,200,255,0.35)',
          boxShadow: isHovering ? '0 0 16px rgba(92,200,255,0.15)' : 'none',
        }}
      />
    </>
  );
}

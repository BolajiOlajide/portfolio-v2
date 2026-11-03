'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Smooth scrolling is motion; leave native scrolling alone for readers who opt out.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    document.querySelectorAll('a[href^="#"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const id = el.getAttribute('href')?.slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    requestAnimationFrame(raf);
  }, []);

  return children;
};

export default SmoothScroll;

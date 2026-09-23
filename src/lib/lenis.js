import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    infinite: false,
  });

  // Synchronize Lenis scroll position with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Connect GSAP ticker to Lenis RAF to avoid double requestAnimationFrame loops
  const updateRaf = (time) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(updateRaf);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function setupStackedSections(sectionIds) {
  // Clear any existing ScrollTrigger instances to prevent stale triggers
  ScrollTrigger.getAll().forEach((st) => st.kill());

  const elements = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el) => el !== null);

  if (elements.length <= 1) return;

  elements.forEach((el, index) => {
    // Ensure ascending z-index so subsequent sections smoothly cover previous ones
    el.style.zIndex = String((index + 1) * 10);

    // Skip pinning the final element (e.g. Footer)
    if (index === elements.length - 1) return;

    ScrollTrigger.create({
      trigger: el,
      start: () => {
        const h = el.offsetHeight;
        const v = window.innerHeight;
        // If content fits inside viewport, pin immediately when top hits top of viewport
        // If content is taller than viewport, user scrolls through content until bottom hits bottom of viewport
        return h <= v ? 'top top' : 'bottom bottom';
      },
      end: () => {
        const v = window.innerHeight;
        return `+=${v}`;
      },
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      refreshPriority: elements.length - index,
    });
  });

  ScrollTrigger.refresh();
}

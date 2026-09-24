import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.8,
    infinite: false,
  });

  // Synchronize Lenis scroll position with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Connect GSAP ticker to Lenis RAF
  const updateRaf = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(updateRaf);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function setupStackedSections(sectionIds: string[]) {
  // Clear any existing ScrollTrigger instances to prevent stale triggers
  ScrollTrigger.getAll().forEach((st) => st.kill());

  const elements = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (elements.length <= 1) return;

  // Sections that transition continuously into the next section without stopping
  const unpinnedSectionIds = [
    'hero-section',       // Hero -> HOW IT WORKS
    'looks',              // SELECTED LOOKS -> HOY IN MOTION
    'plans',              // STYLE PLANS -> READY WHEN YOU ARE
    'ready-when-you-are', // READY WHEN YOU ARE -> Footer
  ];

  elements.forEach((el, index) => {
    // Progressive z-index so subsequent sections smoothly cover previous ones
    el.style.zIndex = String((index + 1) * 10);

    // Skip pinning final element (Footer)
    if (index === elements.length - 1) return;

    // Skip pinning continuous paired sections
    if (unpinnedSectionIds.includes(el.id)) {
      return;
    }

    // Pin stacked base sections so the next section slides OVER them cleanly
    ScrollTrigger.create({
      trigger: el,
      start: () => {
        const h = el.offsetHeight;
        const v = window.innerHeight;
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

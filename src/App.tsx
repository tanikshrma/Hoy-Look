import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { StylePlans } from './components/StylePlans';
import { ReadyWhenYouAre } from './components/ReadyWhenYouAre';
import { Footer } from './components/Footer';
import { StyleQuizModal } from './components/StyleQuizModal';
import { PlanModal } from './components/PlanModal';
import { LegalPolicyModal } from './components/LegalPolicyModal';
import { OnboardingContainer } from './components/onboarding/OnboardingContainer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StylePlan } from './types';
import { initLenis, getLenis, setupStackedSections } from './lib/lenis';

const SECTIONS = [
  { id: 'hero-section', name: 'Hero' },
  { id: 'process', name: 'How It Works' },
  { id: 'plans', name: 'Style Plans' },
  { id: 'ready-when-you-are', name: 'Ready When You Are' },
];

function MainAppContent() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ plan: StylePlan; isAnnual: boolean } | null>(null);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const isTransitioningRef = useRef(false);

  const { setOnboardingStep } = useAuth();

  // Initialize single global Lenis instance & scroll listener
  useEffect(() => {
    const lenis = initLenis();

    const handleLenisScroll = () => {
      if (isTransitioningRef.current) return;
      let currentIdx = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            currentIdx = i;
          }
        }
      }
      setActiveSectionIndex(currentIdx);
    };

    lenis.on('scroll', handleLenisScroll);

    return () => {
      lenis.off('scroll', handleLenisScroll);
    };
  }, []);

  // Setup GSAP ScrollTrigger stacked panel pinning
  useEffect(() => {
    const sectionIds = SECTIONS.map((s) => s.id).concat(['main-footer']);
    
    const timer = setTimeout(() => {
      setupStackedSections(sectionIds);
    }, 100);

    const handleResize = () => {
      setupStackedSections(sectionIds);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smooth scroll to a specific section using Lenis
  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= SECTIONS.length) return;
    const targetId = SECTIONS[index].id;
    const element = document.getElementById(targetId);
    if (element) {
      isTransitioningRef.current = true;
      setActiveSectionIndex(index);
      
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(element, {
          duration: 1.2,
          onComplete: () => {
            isTransitioningRef.current = false;
          }
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 750);
      }
    }
  }, []);

  const handleOpenQuiz = () => setIsQuizOpen(true);
  const handleCloseQuiz = () => setIsQuizOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1E1E1E] font-sans-body antialiased flex flex-col selection:bg-[#E2D2BC] selection:text-[#1E1E1E] relative">
      
      {/* Fixed Header */}
      <Header
        onOpenQuiz={handleOpenQuiz}
        onNavigateSection={scrollToSection}
        activeSectionIndex={activeSectionIndex}
      />

      {/* Main Presentation Flow */}
      <main className="relative flex-1 w-full bg-[#FAF9F7]">
        
        {/* Section 0: Hero Presentation */}
        <Hero
          onOpenQuiz={handleOpenQuiz}
          onExploreClick={() => scrollToSection(1)}
        />

        {/* Section 1: How It Works (The Process) */}
        <HowItWorks />

        {/* Section 2: Style Plans */}
        <StylePlans
          onSelectPlan={(plan, isAnnual) => setSelectedPlan({ plan, isAnnual })}
        />

        {/* Section 3: Ready When You Are CTA */}
        <ReadyWhenYouAre onOpenQuiz={handleOpenQuiz} />

        {/* Footer */}
        <Footer
          onOpenQuiz={handleOpenQuiz}
          onOpenPolicy={setActivePolicy}
        />

      </main>

      {/* Interactive Modals */}
      {isQuizOpen && (
        <StyleQuizModal
          isOpen={isQuizOpen}
          onClose={handleCloseQuiz}
          onPlanSelect={(chosenPlan) => {
            handleCloseQuiz();
            if (chosenPlan) {
              setSelectedPlan({ plan: chosenPlan, isAnnual: false });
            } else {
              scrollToSection(2);
            }
          }}
        />
      )}

      {selectedPlan && (
        <PlanModal
          plan={selectedPlan.plan}
          isAnnual={selectedPlan.isAnnual}
          onClose={() => setSelectedPlan(null)}
          onOpenQuiz={handleOpenQuiz}
        />
      )}

      {/* Legal & Privacy Policy Modal */}
      {activePolicy && (
        <LegalPolicyModal
          policyKey={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}

      {/* Onboarding Flow Container */}
      <OnboardingContainer
        onComplete={() => {
          scrollToSection(2); // Scroll to Generated Looks App section
        }}
        onExit={() => {
          setOnboardingStep(0);
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

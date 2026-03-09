import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSplitText } from '@hooks/useSplitText';
import { useCharsHoverWave } from '@hooks/useCharsHoverWave';
import { useAdaptiveColor } from '@hooks/useAdaptiveColor';

interface ProjectTitleProps {
  title: string;
  id: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ title, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { chars } = useSplitText(title);
  
  // Hook for adaptive color based on sections
  const clipPath = useAdaptiveColor(containerRef);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Entrance animation
    const charsEl = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(
      charsEl,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.5,
        stagger: 0.02,
        ease: "expo.out",
      }
    );
  }, { scope: containerRef });

  // Hook for interactive wave hover
  useCharsHoverWave(containerRef);

  return (
    <div className="relative overflow-visible" ref={containerRef}>
      {/* Base Layer (White text on dark bg) */}
      <h1
        id="project-title-layer"
        className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-4 text-white"
        style={{ viewTransitionName: `project-title-${id}` }}
      >
        {chars}
      </h1>

      {/* Adaptive Dark Layer (Black text shown when overlapping light backgrounds) */}
      <h2
        className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-4 text-black absolute top-0 left-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{ clipPath }}
      >
        {chars}
      </h2>
    </div>
  );
};

export default ProjectTitle;

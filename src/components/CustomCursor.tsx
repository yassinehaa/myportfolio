import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'image' | 'portrait' | 'drag'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Position references
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Move inner dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Move background subtle spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(550px circle at ${e.clientX}px ${e.clientY}px, rgba(227, 43, 60, 0.045), transparent 75%)`;
      }

      // Contextual detection of element hovered
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const portraitCard = target.closest('[data-cursor="portrait"]');
      const projectCard = target.closest('.tilt-card');
      const interactive = target.closest('button, a, input, textarea, select, [role="button"]');
      const imageBox = target.closest('.image-zoom-box');

      if (portraitCard) {
        setCursorType('portrait');
        setCursorLabel('YASSINE');
      } else if (projectCard) {
        setCursorType('project');
        setCursorLabel('VIEW');
      } else if (imageBox) {
        setCursorType('image');
        setCursorLabel('SPECS');
      } else if (interactive) {
        setCursorType('pointer');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp loop for the trailing ring
    const render = () => {
      const ease = 0.18; // smooth lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* Subtle Ambient Mouse Spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      />

      {/* Immediate Sharp Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 -ml-1 -mt-1 will-change-transform"
      >
        <div
          className={`w-2 h-2 rounded-full bg-[#e32b3c] transition-all duration-150 ${
            cursorType === 'project' || cursorType === 'image' || cursorType === 'portrait'
              ? 'opacity-0 scale-0'
              : cursorType === 'pointer'
              ? 'scale-125 bg-white'
              : 'opacity-100 scale-100'
          }`}
        />
      </div>

      {/* Fluid Trailing Ring with Contextual Badges */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            cursorType === 'portrait'
              ? 'w-20 h-20 rounded-full border border-[#e32b3c] bg-[#090909]/90 text-white shadow-[0_0_24px_rgba(227,43,60,0.45)] backdrop-blur-sm'
              : cursorType === 'project' || cursorType === 'image'
              ? 'w-16 h-16 rounded-full bg-[#e32b3c] text-white shadow-lg shadow-[#e32b3c]/40'
              : cursorType === 'pointer'
              ? 'w-12 h-12 rounded-full border-2 border-[#e32b3c] bg-[#e32b3c]/15 backdrop-blur-[1px]'
              : 'w-8 h-8 rounded-full border border-white/30 bg-transparent'
          } ${isClicking ? 'scale-75' : 'scale-100'}`}
        >
          {cursorLabel && (
            <span className={`font-mono font-bold tracking-widest uppercase select-none animate-fadeIn ${
              cursorType === 'portrait' ? 'text-[9px] text-[#f2efeb] flex items-center gap-1' : 'text-[10px]'
            }`}>
              {cursorType === 'portrait' && <span className="w-1.5 h-1.5 rounded-full bg-[#e32b3c] animate-pulse" />}
              {cursorLabel}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

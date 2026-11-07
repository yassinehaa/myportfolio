import React, { useState, useEffect } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      setIsExited(true);
      return;
    }

    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth loader

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - rawProgress, 3);
      const current = Math.round(ease * 100);

      setProgress(current);

      if (rawProgress < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        // Trigger split shutter exit
        setTimeout(() => {
          setIsDismissing(true);
          setTimeout(() => {
            setIsExited(true);
            onComplete();
          }, 700);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(updateLoader);

    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (isExited) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-auto flex flex-col justify-between overflow-hidden select-none font-sans"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Top Shutter Curtain */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#090909] border-b border-white/5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDismissing ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom Shutter Curtain */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#090909] border-t border-white/5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDismissing ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Center Content Container */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-12 transition-opacity duration-300 ${
          isDismissing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Top Meta Header */}
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#a09c9a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e32b3c] animate-pulse" />
            <span className="text-[#f2efeb] font-semibold">INITIALIZING ARCHITECTURE</span>
          </div>
          <div className="hidden sm:block">
            BÉNI MELLAL, MOROCCO · GMT+1
          </div>
          <button
            onClick={() => {
              setIsDismissing(true);
              setTimeout(() => {
                setIsExited(true);
                onComplete();
              }, 400);
            }}
            className="text-[#a09c9a] hover:text-[#f2efeb] uppercase tracking-wider text-[10px] underline underline-offset-4 transition-colors"
          >
            Skip [ESC]
          </button>
        </div>

        {/* Center Monogram & Typography */}
        <div className="max-w-4xl mx-auto w-full text-center space-y-6">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[11px] font-mono text-[#e32b3c] tracking-widest uppercase mb-2">
            Full-Stack Developer Portfolio
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-[#f2efeb] leading-none">
            Yassine Hanini
          </h1>

          <div className="font-accent text-xl sm:text-2xl text-[#e32b3c] tracking-wide">
            Crafting resilient backends & fluid applications
          </div>

          {/* Progress Bar & Percentage */}
          <div className="pt-8 max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#a09c9a]">
              <span>LOADING ASSETS & REVEALS</span>
              <span className="text-[#f2efeb] font-bold tabular-nums">{progress}%</span>
            </div>

            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#e32b3c] transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_rgba(227,43,60,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Ticker Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#a09c9a]/70">
          <div>JAVA · SPRING BOOT · ANGULAR · REACT · REACT NATIVE · DOCKER</div>
          <div>VERIFIED EXPERIENCES & SOURCE CODE</div>
        </div>
      </div>
    </div>
  );
};

/**
 * ANIMATIONS ENGINE — Yassine Hanini Portfolio
 * Architected by Design-System & Quality Assurance Agents
 * Pure Vanilla JavaScript: IntersectionObserver, 3D Tilt, View Transitions API
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 1. Scroll Reveal Observer (15% visibility threshold)
   */
  function initScrollReveals() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -15% 0px', // Trigger at 15% visibility
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, unobserve to free resources
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /**
   * 2. 3D Tilt Effect on Project Cards (Max 4 degrees, disabled on touch)
   */
  function initTiltCards() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch || prefersReducedMotion) return;

    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation clamped between -4 and +4 degrees
        const rotateY = ((mouseX / cardWidth) - 0.5) * 8; // max ~4deg
        const rotateX = ((mouseY / cardHeight) - 0.5) * -8; // max ~4deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      };

      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });
  }

  /**
   * 3. Number Counter Engine (Genuine figures only)
   */
  function initCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    if (!counterElements.length) return;

    if (prefersReducedMotion) {
      counterElements.forEach((el) => {
        el.textContent = el.getAttribute('data-counter-target');
      });
      return;
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter-target'), 10);
          const duration = 1200; // ms
          const start = performance.now();

          const updateCount = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(easeOut * target);
            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target;
            }
          };

          requestAnimationFrame(updateCount);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  /**
   * 4. Sticky Header & Active Navigation Highlighting
   */
  function initNavigation() {
    const header = document.querySelector('.nav-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    // Header Shrink on scroll via IntersectionObserver on a top sentinel
    let sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.id = 'nav-sentinel';
      sentinel.style.position = 'absolute';
      sentinel.style.top = '60px';
      sentinel.style.height = '1px';
      sentinel.style.width = '1px';
      sentinel.style.pointerEvents = 'none';
      document.body.prepend(sentinel);
    }

    const navObserver = new IntersectionObserver(([entry]) => {
      if (header) {
        if (!entry.isIntersecting) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }
    }, { threshold: 0 });

    navObserver.observe(sentinel);

    // Active Section Tracking via IntersectionObserver
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  /**
   * 5. View Transitions API Helper
   */
  function navigateWithTransition(updateCallback) {
    if (document.startViewTransition && !prefersReducedMotion) {
      return document.startViewTransition(updateCallback);
    }
    return Promise.resolve(updateCallback());
  }

  // Initialize all animation subsystems upon DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveals();
      initTiltCards();
      initCounters();
      initNavigation();
    });
  } else {
    initScrollReveals();
    initTiltCards();
    initCounters();
    initNavigation();
  }

  // Expose global API
  window.PortfolioAnimations = {
    initScrollReveals,
    initTiltCards,
    initCounters,
    initNavigation,
    navigateWithTransition,
  };
})();

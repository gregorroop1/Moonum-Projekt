import { useEffect, useRef } from 'react';

interface UseMouseParallaxProps {
  sensitivity?: number;
  baseRotateX?: number;
  baseRotateZ?: number;
}

export function useMouseParallax({
  sensitivity = 25,
  baseRotateX = 55,
  baseRotateZ = -25,
}: UseMouseParallaxProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimateParallax = !prefersReducedMotion;

    // Initialize to center to prevent jump when entrance animation finishes
    pointerRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const updateTransforms = () => {
      frameRef.current = null;

      const x = (window.innerWidth / 2 - pointerRef.current.x) / sensitivity;
      const y = (window.innerHeight / 2 - pointerRef.current.y) / sensitivity;

      // Rotate the 3D Canvas
      wrapper.style.transform = `rotateX(${baseRotateX + y / 2}deg) rotateZ(${baseRotateZ + x / 2}deg) scale(1)`;

      // Apply depth shift to layers
      layerRefs.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldAnimateParallax) return;

      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateTransforms);
      }
    };

    const handleResize = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateTransforms);
      }
    };

    // Entrance Animation
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';
    
    let transitionTimeout: ReturnType<typeof setTimeout>;
    const timeout = setTimeout(() => {
      wrapper.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      wrapper.style.opacity = '1';
      wrapper.style.transform = `rotateX(${baseRotateX}deg) rotateZ(${baseRotateZ}deg) scale(1)`;
      
      transitionTimeout = setTimeout(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.transition = 'transform 0.1s ease-out';
        }
      }, 2500);
    }, 300);

    if (shouldAnimateParallax) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (shouldAnimateParallax) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
      clearTimeout(transitionTimeout);
    };
  }, [sensitivity, baseRotateX, baseRotateZ]);

  return { wrapperRef, layerRefs };
}

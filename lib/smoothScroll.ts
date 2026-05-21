/**
 * Custom smooth scroll with easing — guaranteed animation regardless of CSS.
 */
function smoothScrollTo(targetY: number, duration = 800): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const diff = targetY - startY;
    
    if (Math.abs(diff) < 2) {
      resolve();
      return;
    }

    let startTime: number | null = null;

    // Ease-in-out cubic for a natural feel
    function easeInOutCubic(t: number): number {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      const nextY = startY + diff * eased;
      window.scrollTo(0, nextY);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

/**
 * Smoothly scrolls to a section by its ID (or to the top if no ID / "#").
 * Works even if the browser is already at that hash.
 */
export function scrollToSection(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  href: string
) {
  e.preventDefault();

  // Scroll to top for "#" or empty
  if (!href || href === '#') {
    smoothScrollTo(0, 600);
    return;
  }

  const id = href.replace('#', '');
  const el = document.getElementById(id);

  if (el) {
    const rect = el.getBoundingClientRect();
    const targetY = window.pageYOffset + rect.top;
    
    // Dynamic duration based on distance for a snappier feel
    const distance = Math.abs(targetY - window.pageYOffset);
    const duration = Math.min(Math.max(distance / 4, 500), 1000); 
    
    smoothScrollTo(targetY, duration);
  }
}

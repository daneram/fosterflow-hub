
import { useCallback } from 'react';

/**
 * Hook to handle mobile-specific layout adjustments
 */
export const useMobileLayout = () => {
  // Position the last menu item at the bottom of the screen on mobile
  const positionLastItemAtBottom = useCallback((
    viewportElement: HTMLElement | null,
    contentElement: HTMLElement | null
  ) => {
    if (!viewportElement || !contentElement) return;
    
    // Find the last navigation item in the sidebar
    const allNavSections = contentElement.querySelectorAll('nav');
    const lastNavSection = allNavSections[allNavSections.length - 1];
    
    if (!lastNavSection) return;
    
    const lastItem = lastNavSection.querySelector('a:last-child');
    if (!lastItem) return;
    
    // Get heights and positions
    const viewportHeight = viewportElement.clientHeight;
    const lastItemHeight = (lastItem as HTMLElement).offsetHeight;
    const lastItemTop = (lastItem as HTMLElement).offsetTop;
    
    // Calculate how much padding we need to add to push the last item to the bottom
    // This is: viewport height - (last item's position from top + its height)
    const desiredPadding = Math.max(0, viewportHeight - (lastItemTop + lastItemHeight));
    
    // Apply the padding if it's different from current padding
    if (desiredPadding !== parseInt(contentElement.style.paddingBottom || '0', 10)) {
      contentElement.style.paddingBottom = `${desiredPadding}px`;
    }
  }, []);

  return { positionLastItemAtBottom };
};

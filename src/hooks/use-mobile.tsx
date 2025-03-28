import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Helper to detect if the device is a mobile device
function isMobileDevice() {
  const ua = window.navigator.userAgent.toLowerCase();
  return (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) ||
    // Include iPad Pro and other modern tablets that might report as desktop
    ('ontouchstart' in window && /macintosh/.test(ua))
  );
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobileState = () => {
      const isNarrowViewport = window.innerWidth < MOBILE_BREAKPOINT;
      const isMobileDeviceCheck = isMobileDevice();
      
      // Consider it mobile if:
      // 1. It's a mobile device (regardless of viewport size), or
      // 2. It's a narrow viewport on any device
      setIsMobile(isMobileDeviceCheck || isNarrowViewport);
    };

    // Check initial state
    checkMobileState();

    // Listen for viewport width changes
    const mqlWidth = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mqlWidth.addEventListener("change", checkMobileState);
    
    return () => {
      mqlWidth.removeEventListener("change", checkMobileState);
    };
  }, [])

  return !!isMobile
}

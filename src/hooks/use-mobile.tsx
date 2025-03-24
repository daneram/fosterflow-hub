
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Set initial value based on window width if running in browser
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  React.useEffect(() => {
    // Use matchMedia for better performance and correct initial value
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Handler function to update state when media query changes
    const updateIsMobile = () => {
      setIsMobile(mql.matches)
    }
    
    // Set initial value
    updateIsMobile()
    
    // Modern event listener method
    mql.addEventListener("change", updateIsMobile)
    
    // Cleanup
    return () => mql.removeEventListener("change", updateIsMobile)
  }, [])

  return isMobile
}

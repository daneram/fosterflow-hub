import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

// Add the missing constant
const SIDEBAR_WIDTH_MOBILE = "18rem"

// Duration of the sidebar collapse animation
const COLLAPSE_ANIMATION_DURATION = 300; // milliseconds

// Flag to track if navigation is in progress 
let isNavigating = false;

// Store information about delayed scroll
interface DelayedScrollInfo {
  targetElement: string | null;
  scrollToPosition: number | null;
  timestamp: number;
}
let delayedScrollInfo: DelayedScrollInfo = {
  targetElement: null,
  scrollToPosition: null,
  timestamp: 0
};

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile, isMounted } = useSidebar()
    
    // Track location changes to detect navigation
    const [currentPath, setCurrentPath] = React.useState("");
    
    // Handle any delayed scroll actions after sidebar collapses
    React.useEffect(() => {
      const handleDelayedScroll = () => {
        // Check if we have a delayed scroll action
        const { targetElement, scrollToPosition, timestamp } = delayedScrollInfo;
        
        // Ensure it's recent and we haven't processed it yet
        const isRecent = Date.now() - timestamp < 1000; 
        
        if (isRecent && (targetElement || scrollToPosition !== null)) {
          // Execute the delayed scroll
          setTimeout(() => {
            // If we have a target element, scroll to it
            if (targetElement) {
              const element = document.querySelector(targetElement);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }
            
            // If we have a scroll position, scroll to it
            if (scrollToPosition !== null) {
              window.scrollTo({ 
                top: scrollToPosition, 
                behavior: 'smooth'
              });
            }
            
            // Clear the delayed scroll info
            delayedScrollInfo = {
              targetElement: null,
              scrollToPosition: null,
              timestamp: 0
            };
          }, 50); // Small additional delay after sidebar is closed
        }
      };
      
      // When mobile sidebar closes, check for delayed scrolls
      if (isMobile && !openMobile) {
        // Wait for the collapse animation to complete
        const timer = setTimeout(handleDelayedScroll, COLLAPSE_ANIMATION_DURATION);
        return () => clearTimeout(timer);
      }
      
      return undefined;
    }, [isMobile, openMobile]);
    
    React.useEffect(() => {
      // Update current path and set navigation flag
      const handleNavigation = () => {
        if (currentPath && currentPath !== window.location.pathname) {
          isNavigating = true;
          
          // Reset the flag after navigation completes
          setTimeout(() => {
            isNavigating = false;
          }, 500);
        }
        setCurrentPath(window.location.pathname);
      };
      
      // Set initial path
      if (!currentPath) {
        setCurrentPath(window.location.pathname);
      }
      
      // Listen for history changes
      window.addEventListener('popstate', handleNavigation);
      
      // Listen for click events on links that might trigger navigation
      const handleClick = () => {
        setTimeout(() => {
          if (currentPath !== window.location.pathname) {
            handleNavigation();
          }
        }, 10);
      };
      
      document.addEventListener('click', handleClick);
      
      return () => {
        window.removeEventListener('popstate', handleNavigation);
        document.removeEventListener('click', handleClick);
      };
    }, [currentPath]);

    // Handle nav item clicks for mobile
    const handleMobileNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isMobile || !openMobile) return;
      
      e.preventDefault();
      
      const target = e.currentTarget;
      const href = target.getAttribute('href');
      const isCurrentPage = window.location.pathname === href;
      
      // Store current scroll position before doing anything else
      const scrollY = window.scrollY;
      
      // Prevent content shifting during transition
      document.body.classList.add('content-fixed');
      
      // Close the sidebar first
      setOpenMobile(false);
      
      // For same page navigation, just record scroll position for after closing
      if (isCurrentPage) {
        delayedScrollInfo = {
          targetElement: null,
          scrollToPosition: scrollY,
          timestamp: Date.now()
        };
        
        // Remove fixed class after transition completes
        const timer = setTimeout(() => {
          document.body.classList.remove('content-fixed');
        }, COLLAPSE_ANIMATION_DURATION + 50);
        
        return;
      }
      
      // For navigation to a new page, store intent to scroll
      delayedScrollInfo = {
        targetElement: null,
        scrollToPosition: 0, // Scroll to top for new pages
        timestamp: Date.now()
      };
      
      // Navigate after the sidebar has finished collapsing
      const timer = setTimeout(() => {
        if (href) {
          // Remove fixed class right before navigation
          document.body.classList.remove('content-fixed');
          window.location.href = href;
        }
      }, COLLAPSE_ANIMATION_DURATION);
    };

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      // For mobile, use a direct implementation without Sheet component
      return (
        <>
          {/* Mobile sidebar overlay - only show if mounted */}
          {isMounted && openMobile && (
            <div 
              className="fixed inset-0 z-40 bg-black/80 transition-opacity duration-300"
              onClick={() => setOpenMobile(false)}
            />
          )}

          {/* Toggle button - visible when sidebar is collapsed */}
          {isMounted && !openMobile && (
            <div className="fixed top-2.5 left-5 z-50">
              <button
                type="button"
                onClick={() => setOpenMobile(true)}
                className={cn(
                  "h-8 w-8 flex items-center justify-center",
                  "bg-white/90 backdrop-blur-sm",
                  "rounded-lg overflow-hidden",
                  "shadow-lg shadow-black/[0.08]",
                  "ring-1 ring-black/[0.08]",
                  "hover:bg-white/95 hover:shadow-xl",
                  "active:scale-95",
                  "transition-all duration-300"
                )}
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          )}

          {/* Mobile sidebar - only render if mounted */}
          {isMounted && (
            <div
              ref={ref}
              className={cn(
                "fixed inset-y-0 left-0 z-50 flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
                "transform-gpu transition-transform duration-300 ease-in-out",
                // Position offscreen by default and don't animate on initial load
                openMobile ? "translate-x-0" : "translate-x-[-101%]",
                // Hide immediately with visibility to avoid any flash
                !openMobile && "invisible",
                // Remove transition on initial render to prevent animation flash
                isMounted && openMobile ? "transition-all" : "transition-none",
                "shadow-lg",
                // Add will-change for smoother animation and backface-visibility to prevent layers
                "will-change-transform backface-visibility-hidden",
                // Ensure content position is preserved during transition
                "overflow-hidden",
                className
              )}
              style={{ 
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                // Preserve the scroll position during collapse
                contain: "paint size layout",
                // Ensure it's initially hidden
                visibility: !openMobile ? "hidden" : "visible", 
                // Apply immediate transform to prevent flash
                transform: openMobile ? "translateX(0)" : "translateX(-101%)"
              } as React.CSSProperties}
              data-state={openMobile ? "open" : "closed"}
              data-mobile="true"
              data-nav-handler={true}
              onClick={(e) => {
                // Handle clicks on anchor tags
                if (e.target instanceof HTMLElement) {
                  const anchor = e.target.closest('a');
                  if (anchor && anchor.hasAttribute('href')) {
                    handleMobileNavItemClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
                  }
                }
              }}
              {...props}
            >
              {/* Close button */}
              {openMobile && (
                <button
                  type="button"
                  onClick={() => setOpenMobile(false)}
                  className="absolute right-3 top-3 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
              <div className="flex h-full w-full flex-col">
                {children}
              </div>
            </div>
          )}
        </>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

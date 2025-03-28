import * as React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarContext } from "./types"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContextObject = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContextObject)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    
    // Initialize mobile state as closed
    const [openMobile, setOpenMobile] = React.useState(false)
    
    // Initialize desktop state based on defaultOpen prop
    const [_open, _setOpen] = React.useState(() => {
      // On mobile, always start closed regardless of defaultOpen
      if (isMobile) return false;
      
      // On desktop, try to get saved state from cookie
      const savedState = document.cookie
        .split('; ')
        .find(row => row.startsWith(SIDEBAR_COOKIE_NAME))
        ?.split('=')[1]
      
      return savedState ? savedState === 'true' : defaultOpen
    })
    
    // Use controlled state if provided
    const open = openProp ?? _open
    
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        
        // Don't allow opening on mobile through this method
        if (isMobile && openState) return;

        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // Save state in cookie only for desktop
        if (!isMobile) {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        }
      },
      [setOpenProp, open, isMobile]
    )

    // Helper to toggle the sidebar
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile(prev => !prev)
        : setOpen(prev => !prev)
    }, [isMobile, setOpen])

    // Close mobile sidebar on navigation
    React.useEffect(() => {
      if (isMobile && openMobile) {
        const handleNavigation = () => setOpenMobile(false)
        window.addEventListener('popstate', handleNavigation)
        return () => window.removeEventListener('popstate', handleNavigation)
      }
    }, [isMobile, openMobile])

    // Add keyboard shortcut (only for desktop)
    React.useEffect(() => {
      if (isMobile) return;
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar, isMobile])

    // Close mobile sidebar on resize to desktop
    React.useEffect(() => {
      if (!isMobile) {
        setOpenMobile(false)
      }
    }, [isMobile])

    // We add a state so that we can do data-state="expanded" or "collapsed"
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContextObject.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContextObject.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

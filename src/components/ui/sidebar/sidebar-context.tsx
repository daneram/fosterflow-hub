
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
    console.warn('[useSidebar] SidebarContext not found. Make sure you are using SidebarProvider.')
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
    const [openMobile, setOpenMobile] = React.useState(false)

    // Debug logging for initialize
    React.useEffect(() => {
      console.log('[SidebarProvider] Initialized with:', { 
        defaultOpen, 
        openProp, 
        isMobile, 
        openMobile 
      });
    }, [defaultOpen, openProp, isMobile]);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        console.log('[SidebarProvider] setOpen called with:', { 
          newOpenState: openState, 
          previousState: open 
        });
        
        if (setOpenProp) {
          console.log('[SidebarProvider] Using external setOpenProp');
          setOpenProp(openState)
        } else {
          console.log('[SidebarProvider] Using internal _setOpen');
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Log all setOpenMobile calls
    const wrappedSetOpenMobile = React.useCallback((newState: boolean) => {
      console.log('[SidebarProvider] setOpenMobile called:', { 
        newState, 
        currentState: openMobile 
      });
      setOpenMobile(newState);
    }, [openMobile]);

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      console.log('[SidebarProvider] toggleSidebar called', { isMobile, openMobile, open });
      return isMobile
        ? wrappedSetOpenMobile(!openMobile)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, openMobile, wrappedSetOpenMobile, open])

    // Log openMobile changes
    React.useEffect(() => {
      console.log('[SidebarProvider] openMobile changed:', openMobile);
    }, [openMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          console.log('[SidebarProvider] Keyboard shortcut triggered');
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile: wrappedSetOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, wrappedSetOpenMobile, toggleSidebar]
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


import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar 
      className="absolute top-0 right-0 z-10 hover:opacity-70 transition-opacity duration-200" 
      orientation="vertical"
    />
    <ScrollBar 
      className="absolute bottom-0 left-0 z-10 hover:opacity-70 transition-opacity duration-200" 
      orientation="horizontal"
    />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors bg-transparent",
      orientation === "vertical" ? "w-2.5 h-full" : "h-2.5 w-full",
      orientation === "vertical" ? "border-l border-l-transparent" : "border-t border-t-transparent",
      "p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb 
      className={cn(
        "relative flex-1 rounded-full bg-border/50 hover:bg-border",
        "aria-[hidden=true]:opacity-0"
      )}
      // Better touch support
      style={{ touchAction: "none" }}
      // Add accessible name for screen readers
      aria-label={orientation === "vertical" ? "Vertical scrollbar" : "Horizontal scrollbar"}
      // Ensure keyboard users can tab to the scrollbar
      tabIndex={0}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

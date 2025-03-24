
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
    <ScrollAreaPrimitive.Viewport 
      className="h-full w-full rounded-[inherit]"
      data-scrollarea-viewport
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
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
      "flex touch-none select-none transition-opacity duration-0",
      // Start with opacity-0 and invisible to ensure it's hidden completely
      "opacity-0 invisible data-[state=visible]:opacity-0 data-[state=visible]:invisible",
      // Only show when parent has scrolling-active class
      "[.scrolling-active_&]:opacity-100 [.scrolling-active_&]:visible [.scrolling-active_&]:data-[state=visible]:opacity-100 [.scrolling-active_&]:data-[state=visible]:visible",
      orientation === "vertical" &&
        "h-full w-1.5 border-l-0 p-0 absolute right-0",
      orientation === "horizontal" &&
        "h-1.5 flex-col border-t-0 p-0 absolute bottom-0",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb 
      className={cn(
        "relative flex-1 rounded-full bg-[var(--scrollbar-color)] hover:bg-[var(--scrollbar-hover-color)]"
      )} 
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

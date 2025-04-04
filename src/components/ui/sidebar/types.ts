import { ElementRef, ComponentPropsWithoutRef, ReactNode, HTMLAttributes } from "react"
import { VariantProps } from "class-variance-authority"
import { sidebarMenuButtonVariants } from "./sidebar-menu-button"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { TooltipContent } from "@/components/ui/tooltip"

export interface SidebarContext {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void
  toggleSidebar: () => void
  isMounted: boolean
}

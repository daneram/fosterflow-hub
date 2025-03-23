
import { ElementRef, ComponentPropsWithoutRef, ReactNode, HTMLAttributes } from "react"
import { VariantProps } from "class-variance-authority"
import { sidebarMenuButtonVariants } from "./sidebar-menu-button"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { TooltipContent } from "@/components/ui/tooltip"

export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

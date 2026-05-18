"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  Heart,
  Flag,
  Users,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Coffee,
  LogOut,
  User,
  Building2,
  BookOpen,
  Moon,
  Sun,
  Sparkles,
  Menu,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

const navigation = [
  {
    name: "Emotional States",
    href: "/emotional-states",
    icon: Heart,
  },
  {
    name: "Milestones",
    href: "/milestones",
    icon: Flag,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
  {
    name: "Team Feedback",
    href: "/team-feedback",
    icon: MessageSquare,
  },
]

interface SidebarProps {
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const isDark = mounted ? resolvedTheme === "dark" : true

  // Close mobile menu when navigating
  const handleNavClick = () => {
    if (onMobileClose) {
      onMobileClose()
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 z-50 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          // Desktop
          "lg:left-0",
          isExpanded ? "lg:w-64" : "lg:w-[72px]",
          // Mobile
          "w-72 lg:translate-x-0",
          isMobileOpen ? "left-0 translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3" onClick={handleNavClick}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {(isExpanded || isMobileOpen) && (
              <span className="text-lg font-semibold text-sidebar-foreground">
                VirtualE
              </span>
            )}
          </Link>
          
          {/* Close button for mobile */}
          <button
            onClick={onMobileClose}
            className="rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Collapse button for desktop */}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="hidden lg:flex rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
          )}
        </div>

        {/* User Profile */}
        <div className="p-3 border-b border-sidebar-border">
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-sidebar-accent",
                  (isExpanded || isMobileOpen) ? "justify-start" : "justify-center"
                )}
              >
                <div className="relative">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=progress" />
                    <AvatarFallback className="bg-primary/20 text-primary text-sm">
                      PE
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-emerald-500" />
                </div>
                {(isExpanded || isMobileOpen) && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-sidebar-foreground">
                        Progress Eze
                      </p>
                      <span className="inline-flex items-center rounded-md bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        Super Admin
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-sidebar-muted transition-transform",
                        isProfileOpen && "rotate-180"
                      )}
                    />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56"
              sideOffset={8}
            >
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Progress Eze</p>
                <p className="text-xs text-muted-foreground">
                  progress@virtuale.com
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center justify-between cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex items-center">
                  {isDark ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  Dark Mode
                </div>
                <Switch 
                  checked={isDark} 
                  onCheckedChange={toggleTheme}
                  className="ml-2"
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building2 className="mr-2 h-4 w-4" />
                Company Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                Best Practices
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              
              if (!isExpanded && !isMobileOpen) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={cn(
                          "flex items-center justify-center rounded-lg p-2.5 transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section - Take a Break Button */}
        <div className="border-t border-sidebar-border p-3">
          {(isExpanded || isMobileOpen) ? (
            <button className="group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]" style={{
              background: "linear-gradient(135deg, var(--purple-600) 0%, var(--purple-700) 100%)",
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)"
            }} onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(147, 51, 234, 0.6)"
            }} onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.4)"
            }}>
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{
                background: "linear-gradient(135deg, var(--purple-500) 0%, var(--purple-600) 100%)"
              }} />
              <Coffee className="relative h-5 w-5" />
              <span className="relative">Take a Break</span>
              <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full blur-xl opacity-50" style={{ backgroundColor: "var(--purple-400)" }} />
            </button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl p-3 text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95" style={{
                  background: "linear-gradient(135deg, var(--purple-600) 0%, var(--purple-700) 100%)",
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(147, 51, 234, 0.6)"
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.4)"
                }}>
                  <Coffee className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Take a Break</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Collapse Toggle (when collapsed on desktop) */}
        {!isExpanded && (
          <div className="hidden lg:block border-t border-sidebar-border p-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex w-full items-center justify-center rounded-lg p-2 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Expand menu</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}

// Export a mobile trigger button
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}

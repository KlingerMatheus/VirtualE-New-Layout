"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Heart,
  Flag,
  Users,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Search,
  Coffee,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
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

const navigation = [
  {
    name: "Emotional States",
    href: "/emotional-states",
    icon: Heart,
    badge: null,
  },
  {
    name: "Milestones",
    href: "/milestones",
    icon: Flag,
    badge: "3",
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
    badge: null,
  },
  {
    name: "Team Feedback",
    href: "/team-feedback",
    icon: MessageSquare,
    badge: "12",
  },
]

const quickActions = [
  { name: "Buscar", icon: Search, shortcut: "⌘K" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          isExpanded ? "w-64" : "w-[72px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {isExpanded && (
              <span className="text-lg font-semibold text-sidebar-foreground">
                VirtualE
              </span>
            )}
          </Link>
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
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
                  isExpanded ? "justify-start" : "justify-center"
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
                {isExpanded && (
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Ajuda
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Actions */}
        {isExpanded && (
          <div className="px-3 py-2">
            {quickActions.map((action) => (
              <button
                key={action.name}
                className="flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-3 py-2 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <action.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{action.name}</span>
                <kbd className="rounded bg-sidebar-border px-1.5 py-0.5 text-[10px] font-mono">
                  {action.shortcut}
                </kbd>
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-1">
            {!isExpanded && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex w-full items-center justify-center rounded-lg p-2 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors mb-2">
                    <Search className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Buscar</p>
                </TooltipContent>
              </Tooltip>
            )}
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              
              if (!isExpanded) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center rounded-lg p-2.5 transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.badge && (
                          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
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
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/20 text-primary"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-3">
          {isExpanded ? (
            <button className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 py-2.5 text-sm font-medium text-amber-500 transition-all hover:from-amber-500/30 hover:to-orange-500/30">
              <Coffee className="h-5 w-5" />
              <span>Fazer uma pausa</span>
            </button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-2.5 text-amber-500 transition-all hover:from-amber-500/30 hover:to-orange-500/30">
                  <Coffee className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Fazer uma pausa</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Collapse Toggle (when collapsed) */}
        {!isExpanded && (
          <div className="border-t border-sidebar-border p-3">
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
                <p>Expandir menu</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}

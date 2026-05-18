"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  Bell,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileMenuButton } from "./sidebar"

interface TopbarProps {
  sidebarExpanded?: boolean
  onMobileMenuClick?: () => void
}

const tabs = [
  { name: "Log Mood", href: "#log-mood", active: true },
  { name: "Mood Analytics", href: "#mood-analytics", active: false },
  { name: "My Notes", href: "#my-notes", active: false },
  { name: "Tomato Timer Analytics", href: "#tomato-timer", active: false },
  { name: "Team Analytics", href: "#team-analytics", active: false },
  { name: "Environment Notes", href: "#environment-notes", active: false },
]

const notifications = [
  {
    id: 1,
    title: "New feedback received",
    description: "Maria sent feedback about the project",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Milestone achieved",
    description: "You completed 30 days of tracking",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Break reminder",
    description: "Time for a quick break",
    time: "3 hours ago",
    unread: false,
  },
]

export function Topbar({ sidebarExpanded = true, onMobileMenuClick }: TopbarProps) {
  const [activeTab, setActiveTab] = useState("Log Mood")
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const unreadCount = notifications.filter((n) => n.unread).length

  const checkScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200
      tabsContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 flex flex-col border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-300",
        // Desktop
        sidebarExpanded ? "lg:left-64" : "lg:left-[72px]",
        // Mobile
        "left-0"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {onMobileMenuClick && (
            <MobileMenuButton onClick={onMobileMenuClick} />
          )}
          
          {/* Page Title */}
          <div>
            <h1 className="text-lg lg:text-xl font-semibold text-foreground">
              Emotional States
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <span className="text-sm font-medium">Notifications</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <span className="text-sm font-medium">
                        {notification.title}
                      </span>
                      {notification.unread && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {notification.description}
                    </span>
                    <span className="text-[10px] text-muted-foreground/70">
                      {notification.time}
                    </span>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="border-t border-border p-2">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Company Name (Static) */}
          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2 lg:px-3 py-2 text-primary">
            <Grid3X3 className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">VirtualE</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div
        className={cn(
          "relative border-t border-border bg-background/95 backdrop-blur-sm"
        )}
      >
        {/* Scroll Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-r from-background to-transparent"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {/* Tabs Container */}
        <div 
          ref={tabsContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-1 px-4 lg:px-6 overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "relative flex items-center gap-2 whitespace-nowrap px-3 lg:px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab.name
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.name}
              {activeTab === tab.name && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Scroll Right Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-l from-background to-transparent"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </header>
  )
}

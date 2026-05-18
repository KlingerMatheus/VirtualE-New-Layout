"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Bell,
  Search,
  Grid3X3,
  ChevronDown,
  Settings,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface TopbarProps {
  sidebarExpanded?: boolean
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
    title: "Novo feedback recebido",
    description: "Maria enviou feedback sobre o projeto",
    time: "2 min atrás",
    unread: true,
  },
  {
    id: 2,
    title: "Milestone alcançado",
    description: "Você completou 30 dias de tracking",
    time: "1 hora atrás",
    unread: true,
  },
  {
    id: 3,
    title: "Lembrete de pausa",
    description: "Hora de fazer uma pausa rápida",
    time: "3 horas atrás",
    unread: false,
  },
]

export function Topbar({ sidebarExpanded = true }: TopbarProps) {
  const [activeTab, setActiveTab] = useState("Log Mood")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 flex h-16 flex-col border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-300",
        sidebarExpanded ? "left-64" : "left-[72px]"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Page Title & Breadcrumb */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Emotional States
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                <input
                  type="text"
                  placeholder="Buscar..."
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                  className="h-9 w-64 rounded-lg border border-border bg-secondary/50 px-3 pr-9 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="absolute right-3 h-4 w-4 text-muted-foreground" />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>

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
                <span className="text-sm font-medium">Notificações</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
                  Marcar todas como lidas
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
                  Ver todas as notificações
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* App Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 gap-2 border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">VirtualE</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                VirtualE Pro
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Grid3X3 className="h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div
        className={cn(
          "fixed top-16 right-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-300",
          sidebarExpanded ? "left-64" : "left-[72px]"
        )}
      >
        <div className="flex items-center gap-1 px-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "relative flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
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
      </div>
    </header>
  )
}

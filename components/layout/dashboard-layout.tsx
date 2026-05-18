"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Listen to sidebar state changes via CSS
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector('aside')
      if (sidebar) {
        const isExpanded = sidebar.classList.contains('w-64')
        setSidebarExpanded(isExpanded)
      }
    }

    // Create observer to watch for class changes
    const observer = new MutationObserver(checkSidebarState)
    const sidebar = document.querySelector('aside')
    
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] })
    }

    // Initial check
    checkSidebarState()

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar sidebarExpanded={sidebarExpanded} />
      <main
        className={cn(
          "pt-28 pb-8 transition-all duration-300",
          sidebarExpanded ? "pl-64" : "pl-[72px]"
        )}
      >
        <div className="px-6">
          {children}
        </div>
      </main>
    </div>
  )
}

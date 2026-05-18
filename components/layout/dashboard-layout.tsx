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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Listen to sidebar state changes via CSS
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector('aside')
      if (sidebar) {
        const isExpanded = sidebar.classList.contains('w-64') || sidebar.classList.contains('lg:w-64')
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        onMobileClose={() => setIsMobileMenuOpen(false)} 
      />
      <Topbar 
        sidebarExpanded={sidebarExpanded} 
        onMobileMenuClick={() => setIsMobileMenuOpen(true)}
      />
      <main
        className={cn(
          "pt-28 pb-8 transition-all duration-300",
          // Desktop
          sidebarExpanded ? "lg:pl-64" : "lg:pl-[72px]",
          // Mobile
          "pl-0"
        )}
      >
        <div className="px-4 lg:px-6">
          {children}
        </div>
      </main>
    </div>
  )
}

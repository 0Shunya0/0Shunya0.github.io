"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "research", "about", "experience", "skills", "contact"]
      const scrollPosition = window.scrollY + 100
      setIsScrolled(window.scrollY > 50)
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "research", label: "Research" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Methods" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border/15 shadow-sm shadow-black/20"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 border border-border/30 flex items-center justify-center text-sm font-bold text-muted-foreground/60 font-chalk group-hover:border-primary/40 group-hover:text-primary/70 transition-all duration-300">
              शून्य
            </div>
            <span className="font-chalk font-bold text-lg text-muted-foreground/70 group-hover:text-foreground transition-colors duration-300 hidden sm:block">
              Shunya
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-xs font-mono tracking-wider uppercase transition-all duration-300 group ${activeSection === item.id
                    ? "text-foreground/90"
                    : "text-muted-foreground/45 hover:text-muted-foreground/80"
                  }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary/60 transition-all duration-300 group-hover:w-full ${activeSection === item.id ? "w-full" : "w-0"
                    }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground/50 hover:text-foreground hover:bg-muted/10 h-8 w-8 p-0"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/15">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2.5 text-xs font-mono tracking-wider uppercase transition-all duration-300 ${activeSection === item.id
                      ? "text-foreground/90 bg-muted/10"
                      : "text-muted-foreground/45 hover:text-muted-foreground/80 hover:bg-muted/5"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
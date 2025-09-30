import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

// Configuration
const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' }
]

const SCROLL_THRESHOLD = 50
const ANIMATION_DURATION = 0.3

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)
  const ctaRef = useRef(null)
  const overlayRef = useRef(null)

  // Optimized scroll handler with throttle
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD
    
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
      
      gsap.to(headerRef.current, {
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(251, 191, 36, 0.1)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(245, 158, 11, 0.15)" : "none",
        duration: ANIMATION_DURATION,
        ease: "power2.out"
      })
    }
  }, [isScrolled])

  // Initial mount animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      
      tl.fromTo(logoRef.current, 
        { x: -50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.8 }
      )
      .fromTo(navRef.current?.children || [], 
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      )
      .fromTo(ctaRef.current, 
        { x: 50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.8 },
        "-=0.6"
      )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  // Scroll listener with cleanup
  useEffect(() => {
    let ticking = false
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  // Mobile menu control with body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 })
    } else {
      document.body.style.overflow = ''
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 })
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
      setActiveSection(href.replace('#', ''))
      setIsMobileMenuOpen(false)
    }
  }

  const handleCTAClick = () => {
    // Add your CTA logic here
    console.log('CTA clicked')
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-amber-900/60 backdrop-blur-sm z-40 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ opacity: 0 }}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav 
            className="flex items-center justify-between py-4 sm:py-6"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#inicio"
              ref={logoRef}
              className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
              onClick={(e) => handleNavClick(e, '#inicio')}
              aria-label="Marquesa Express - Inicio"
            >
              <div className="relative">
                <img 
                  src="/img/LOGO FINAL MARQUESA EXPRESS.png" 
                  alt="Marquesa Express" 
                  className="h-12 sm:h-14 w-auto transition-transform duration-500 group-hover:scale-110 group-focus:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div 
              ref={navRef} 
              className="hidden md:flex items-center space-x-6 lg:space-x-8"
              role="menubar"
            >
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative text-sm lg:text-base font-medium transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-2 py-1
                    ${activeSection === item.href.replace('#', '') 
                      ? 'text-amber-600' 
                      : isScrolled ? 'text-gray-900 hover:text-amber-600' : 'text-gray-800 hover:text-amber-600'
                    }
                  `}
                  role="menuitem"
                  aria-current={activeSection === item.href.replace('#', '') ? 'page' : undefined}
                >
                  {item.label}
                  <span 
                    className={`
                      absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-red-400 
                      transition-all duration-300
                      ${activeSection === item.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'}
                    `}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div ref={ctaRef} className="hidden md:block">
              <a
                href="https://wa.me/584246312483"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative px-6 py-2.5 rounded-xl font-medium text-white overflow-hidden
                  bg-gradient-to-r from-amber-500 to-red-500
                  hover:shadow-lg hover:shadow-amber-500/50 hover:scale-105
                  active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                  transition-all duration-300
                  group
                "
                aria-label="WhatsApp +584246312483"
              >
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                  Contactanos
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="
                md:hidden p-2 rounded-lg relative z-50
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                hover:bg-white/10 transition-colors duration-300
              "
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <span 
                  className={`
                    block w-6 h-0.5 bg-gray-800 transition-all duration-300 rounded-full
                    ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
                  `} 
                />
                <span 
                  className={`
                    block w-6 h-0.5 bg-gray-800 transition-all duration-300 rounded-full
                    ${isMobileMenuOpen ? 'opacity-0' : ''}
                  `} 
                />
                <span 
                  className={`
                    block w-6 h-0.5 bg-gray-800 transition-all duration-300 rounded-full
                    ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
                  `} 
                />
              </div>
            </button>
          </nav>

          {/* Mobile Menu */}
          <div 
            id="mobile-menu"
            className={`
              md:hidden overflow-hidden transition-all duration-500 ease-out
              ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
            role="menu"
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="py-6 space-y-1 bg-white/90 backdrop-blur-xl rounded-2xl px-4 mb-4 border border-amber-200/50">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    block py-3 px-4 rounded-lg font-medium transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                    ${activeSection === item.href.replace('#', '')
                      ? 'text-amber-600 bg-amber-100/50' 
                      : 'text-gray-800 hover:text-amber-600 hover:bg-amber-50/50'
                    }
                  `}
                  role="menuitem"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {item.label}
                </a>
              ))}
              <button 
                onClick={handleCTAClick}
                className="
                  w-full mt-4 px-6 py-3 rounded-xl font-medium text-white
                  bg-gradient-to-r from-amber-500 to-red-500
                  hover:shadow-lg hover:shadow-amber-500/50
                  active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                  transition-all duration-300
                "
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Comenzar Ahora
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// CONFIGURATION
// ============================================
const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/marquesaexpress',
    icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
  },
  {
    name: 'Instagram',
    href: 'http://instagram.com/marquesaexpress',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.116 0-3.479.012-4.697.068-2.859.13-4.011 1.28-4.142 4.142-.056 1.218-.067 1.575-.067 4.697s.011 3.479.067 4.697c.13 2.861 1.282 4.011 4.142 4.142 1.218.056 1.58.068 4.697.068s3.479-.012 4.697-.068c2.861-.13 4.011-1.281 4.142-4.142.056-1.218.067-1.575.067-4.697s-.011-3.479-.067-4.697c-.13-2.861-1.282-4.011-4.142-4.142-1.218-.056-1.58-.068-4.697-.068zm0 3.192c-2.703 0-4.89 2.187-4.89 4.89s2.187 4.89 4.89 4.89 4.89-2.187 4.89-4.89-2.187-4.89-4.89-4.89zm0 7.939c-1.686 0-3.05-1.363-3.05-3.05s1.364-3.05 3.05-3.05 3.05 1.363 3.05 3.05-1.364 3.05-3.05 3.05zm6.406-7.348c-.765 0-1.385.62-1.385 1.385s.62 1.385 1.385 1.385 1.385-.62 1.385-1.385-.62-1.385-1.385-1.385z'
  }
]

const CONTACT_INFO = {
  email: 'marquesaexpress@gmail.com',
  whatsapp: {
    number: '+584246312483',
    display: '+58 424-6312483'
  }
}

const NAV_LINKS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Productos', href: '#productos' },
  { name: 'Testimonios', href: '#testimonios' }
]

// ============================================
// ICON COMPONENTS
// ============================================
const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ============================================
// MAIN FOOTER COMPONENT
// ============================================
const Footer = () => {
  const footerRef = useRef(null)
  const contentRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // ============================================
  // REDUCED MOTION DETECTION
  // ============================================
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // ============================================
  // SCROLL ANIMATION
  // ============================================
  useEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${CONTACT_INFO.email}`
  }, [])

  const handleWhatsAppClick = useCallback(() => {
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp.number.replace(/[^0-9]/g, '')}`, '_blank')
  }, [])

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      {/* Desktop Footer */}
      <footer 
        ref={footerRef}
        id="contacto" 
        className="hidden md:block relative border-t border-amber-200/50"
        role="contentinfo"
      >
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/[0.02] to-transparent" aria-hidden="true" />

        {/* Content Container */}
        <div className="relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div ref={contentRef} className="flex flex-col items-center gap-6 sm:gap-8">
              
              {/* Logo */}
              <a 
                href="#inicio"
                onClick={(e) => handleNavClick(e, '#inicio')}
                className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
                aria-label="Marquesa Express - Volver al inicio"
              >
                <img 
                  src="/img/LOGO FINAL MARQUESA EXPRESS.png" 
                  alt="Marquesa Express" 
                  className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </a>

              {/* Navigation Links */}
              <nav 
                className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
                aria-label="Footer navigation"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="
                      text-sm text-gray-600 hover:text-amber-600
                      transition-colors duration-300
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1
                    "
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Contact & Social */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                
                {/* Contact Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleEmailClick}
                    className="
                      flex items-center gap-2 px-3 py-1.5 rounded-lg
                      text-xs text-gray-600 hover:text-amber-600
                      hover:bg-amber-50/50
                      transition-all duration-300
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                    "
                    aria-label="Enviar email"
                  >
                    <MailIcon />
                    <span className="hidden sm:inline">Email</span>
                  </button>

                  <button
                    onClick={handleWhatsAppClick}
                    className="
                      flex items-center gap-2 px-3 py-1.5 rounded-lg
                      text-xs text-gray-600 hover:text-green-600
                      hover:bg-green-50/50
                      transition-all duration-300
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400
                    "
                    aria-label="Contactar por WhatsApp"
                  >
                    <WhatsAppIcon />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-4 bg-gray-300/50" aria-hidden="true" />

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-8 h-8 rounded-lg flex items-center justify-center
                        text-gray-500 hover:text-amber-600
                        hover:bg-amber-50/50
                        transition-all duration-300
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                      "
                      aria-label={`Visitar ${social.name}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center">
                 <p className="text-xs text-gray-500">
                   © Copyright 2025 Marquesa Express. Designe by{' '}
                   <a
                     href="https://www.impulsa360.tech"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="underline hover:text-amber-600 transition-colors"
                   >
                     impulsa360.tech🥇
                   </a>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile App-Style Bottom Navigation */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-amber-200/50"
        role="navigation"
        aria-label="Navegación móvil"
      >
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <button
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Inicio"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs text-gray-600">Inicio</span>
          </button>

          {/* Products */}
          <button
            onClick={(e) => handleNavClick(e, '#productos')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Productos"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-xs text-gray-600">Productos</span>
          </button>

          {/* Testimonials */}
          <button
            onClick={(e) => handleNavClick(e, '#testimonios')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Testimonios"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs text-gray-600">Testimonios</span>
          </button>

          {/* Contact */}
          <button
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            aria-label="Contacto"
          >
            <div className="relative">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xs text-green-600">Contacto</span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Footer
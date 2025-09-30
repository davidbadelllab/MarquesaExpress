import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Feature Icons Component - Optimized SVGs
const CheckCircleIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const BookIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const LightningIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

// Configuration
const FEATURES_DATA = [
  {
    id: 'proven-recipes',
    Icon: CheckCircleIcon,
    title: "Recetas Probadas",
    description: "Fórmulas testadas en el mercado que garantizan resultados consistentes y rentables.",
    gradient: "from-amber-400 to-amber-600",
    delay: 0
  },
  {
    id: 'simple-formats',
    Icon: BookIcon,
    title: "Formatos Sencillos",
    description: "Ebooks y video-guías fáciles de seguir, diseñados para el aprendizaje rápido.",
    gradient: "from-red-400 to-red-600",
    delay: 0.1
  },
  {
    id: 'high-performance',
    Icon: LightningIcon,
    title: "Alto Rendimiento",
    description: "Estrategias optimizadas para maximizar la rentabilidad de tu negocio de panadería.",
    gradient: "from-amber-400 to-red-400",
    delay: 0.2
  },
  {
    id: 'active-community',
    Icon: UsersIcon,
    title: "Comunidad Activa",
    description: "Acceso a una comunidad de emprendedores exitosos en el sector de panadería.",
    gradient: "from-red-400 to-amber-400",
    delay: 0.3
  },
  {
    id: 'fast-learning',
    Icon: ClockIcon,
    title: "Aprendizaje Rápido",
    description: "Metodología diseñada para que domines las técnicas en el menor tiempo posible.",
    gradient: "from-amber-400 to-amber-600",
    delay: 0.4
  },
  {
    id: 'results-tracking',
    Icon: ChartIcon,
    title: "Seguimiento de Resultados",
    description: "Herramientas para monitorear el crecimiento y rentabilidad de tu negocio.",
    gradient: "from-red-400 to-red-600",
    delay: 0.5
  }
]

// Feature Card Component
const FeatureCard = ({ feature, index, prefersReducedMotion }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    const card = cardRef.current
    const icon = card.querySelector('[data-feature-icon]')
    const title = card.querySelector('[data-feature-title]')
    const description = card.querySelector('[data-feature-description]')

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(icon, { 
        scale: 1.15, 
        rotate: 5, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      })
      gsap.to(title, { 
        y: -3, 
        duration: 0.3, 
        ease: "power2.out" 
      })
      gsap.to(description, { 
        y: -2, 
        duration: 0.3, 
        ease: "power2.out" 
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(icon, { 
        scale: 1, 
        rotate: 0, 
        duration: 0.4, 
        ease: "power2.out" 
      })
      gsap.to([title, description], { 
        y: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  const { Icon, title, description, gradient, id } = feature

  return (
    <article
      ref={cardRef}
      className="
        group relative p-6 sm:p-8 rounded-3xl overflow-hidden
        bg-white/80 backdrop-blur-sm border border-amber-200/50
        hover:border-amber-300/70
        transition-all duration-500
        focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2 focus-within:ring-offset-white
      "
      data-feature-card
      aria-labelledby={`feature-title-${id}`}
    >
      {/* Gradient Background Effect */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 
          group-hover:opacity-10 transition-opacity duration-500
        `}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Icon Container */}
        <div 
          className={`
            w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center
            bg-gradient-to-br ${gradient} text-white
            shadow-lg group-hover:shadow-2xl
            transition-shadow duration-500
          `}
          data-feature-icon
          aria-hidden="true"
        >
          <Icon />
        </div>

        {/* Title */}
        <h3 
          id={`feature-title-${id}`}
          className="
            text-xl sm:text-2xl font-bold text-gray-800
            group-hover:text-amber-600
            transition-colors duration-300
          "
          data-feature-title
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          className="text-gray-600 leading-relaxed text-sm sm:text-base"
          data-feature-description
        >
          {description}
        </p>
      </div>

      {/* Decorative Dots */}
      <div 
        className={`
          absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-400/30
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        `}
        aria-hidden="true"
      />
      <div 
        className={`
          absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-red-400/30
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        `}
        aria-hidden="true"
      />

      {/* Focus Indicator for Keyboard Navigation */}
      <div 
        className="
          absolute inset-0 rounded-3xl ring-2 ring-transparent
          group-focus-within:ring-amber-400
          pointer-events-none transition-all duration-300
        "
        aria-hidden="true"
      />
    </article>
  )
}

// Main Component
const Features = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const gridRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Title Animation
      const titleChildren = titleRef.current?.querySelectorAll('span')
      if (titleChildren) {
        gsap.fromTo(titleChildren,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Subtitle Animation
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Cards Animation
      const cards = gridRef.current?.querySelectorAll('[data-feature-card]')
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="productos"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-400/5" aria-hidden="true" />
      <div 
        className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-red-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" 
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div ref={titleRef} className="space-y-2 sm:space-y-4">
            <h2 
              id="features-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block text-gray-800">¿Por qué elegir</span>
              <span className="block bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                Marquesa Express
              </span>
              <span className="block text-gray-800">?</span>
            </h2>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-6 sm:mt-8 px-4"
          >
            Ofrecemos las herramientas y conocimientos necesarios para transformar 
            tu pasión por la panadería en un negocio próspero y sostenible.
          </p>
        </header>

        {/* Features Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          role="list"
        >
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
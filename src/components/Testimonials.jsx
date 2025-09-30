import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// CONFIGURATION & DATA
// ============================================
const TESTIMONIALS_DATA = [
  {
    id: 'maria-gonzalez',
    name: "María González",
    role: "Propietaria de Panadería",
    business: "Dulce Hogar",
    content: "Gracias a Marquesa Express, mi panadería ha crecido significativamente en los últimos meses. Las recetas son claras y los resultados consistentes.",
    rating: 5,
    date: "2024-11",
    verified: true,
    location: "Madrid, España",
    gradient: "from-amber-400 to-amber-600"
  },
  {
    id: 'carlos-rodriguez',
    name: "Carlos Rodríguez",
    role: "Emprendedor",
    business: "Pastelería CR",
    content: "Los video-guías me ayudaron a dominar técnicas nuevas. El contenido es profesional y fácil de seguir.",
    rating: 5,
    date: "2024-10",
    verified: true,
    location: "Barcelona, España",
    gradient: "from-red-400 to-red-600"
  },
  {
    id: 'ana-martinez',
    name: "Ana Martínez",
    role: "Chef Pastelera",
    business: "Independiente",
    content: "La calidad del contenido es muy buena. Cada receta está bien explicada y funciona como se describe.",
    rating: 4,
    date: "2024-09",
    verified: true,
    location: "Valencia, España",
    gradient: "from-amber-400 to-red-400"
  },
  {
    id: 'roberto-silva',
    name: "Roberto Silva",
    role: "Dueño de Cafetería",
    business: "Café Silva",
    content: "He implementado varias recetas y mis clientes están contentos. Buen material de referencia.",
    rating: 5,
    date: "2024-10",
    verified: true,
    location: "Sevilla, España",
    gradient: "from-red-400 to-amber-400"
  },
  {
    id: 'laura-fernandez',
    name: "Laura Fernández",
    role: "Instructora",
    business: "Escuela de Repostería",
    content: "Recomiendo estos recursos a mis estudiantes. Son completos y bien estructurados.",
    rating: 5,
    date: "2024-11",
    verified: true,
    location: "Bilbao, España",
    gradient: "from-amber-400 to-amber-600"
  },
  {
    id: 'miguel-torres',
    name: "Miguel Torres",
    role: "Panadero Artesanal",
    business: "Pan Torres",
    content: "Después de muchos años en el negocio, encontré técnicas útiles que no conocía. Buen material.",
    rating: 4,
    date: "2024-09",
    verified: true,
    location: "Málaga, España",
    gradient: "from-red-400 to-red-600"
  }
]

const ANIMATION_CONFIG = {
  duration: { fast: 0.6, medium: 0.8, slow: 1 },
  easing: { smooth: "power3.out", strong: "power4.out" },
  stagger: 0.12
}

// ============================================
// ICON COMPONENTS
// ============================================
const StarIcon = ({ filled = true }) => (
  <svg 
    className={`w-5 h-5 ${filled ? 'text-amber-400' : 'text-white/20'}`}
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const VerifiedBadgeIcon = () => (
  <svg 
    className="w-4 h-4 text-blue-400" 
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
      clipRule="evenodd" 
    />
  </svg>
)

const QuoteIcon = () => (
  <svg 
    className="w-8 h-8 text-amber-400/20" 
    fill="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

// ============================================
// UTILITY FUNCTIONS
// ============================================
const formatDate = (dateString) => {
  const [year, month] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return new Intl.DateTimeFormat('es-ES', { 
    month: 'long', 
    year: 'numeric' 
  }).format(date)
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ============================================
// TESTIMONIAL CARD COMPONENT
// ============================================
const TestimonialCard = ({ testimonial, index, prefersReducedMotion }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    const card = cardRef.current

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(card, {
        y: 0,
        scale: 1,
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

  return (
    <article
      ref={cardRef}
      className="relative group h-full"
      data-testimonial-card
      aria-labelledby={`testimonial-author-${testimonial.id}`}
    >
      <div className={`
        relative h-full p-6 sm:p-8 rounded-3xl
         bg-white/80 backdrop-blur-sm
         border border-amber-200/50
         hover:border-amber-300/70
        transition-all duration-500
        ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
      `}>
        
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-50" aria-hidden="true">
          <QuoteIcon />
        </div>

        {/* Rating Stars */}
        <div 
          className="flex items-center gap-1 mb-6"
          role="img"
          aria-label={`${testimonial.rating} de 5 estrellas`}
        >
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < testimonial.rating} />
          ))}
        </div>

        {/* Testimonial Content */}
        <blockquote className="mb-8">
           <p className="text-gray-700 leading-relaxed text-base group-hover:text-gray-800 transition-colors duration-300">
             "{testimonial.content}"
           </p>
        </blockquote>

        {/* Author Info */}
        <footer className="flex items-center gap-4">
          {/* Avatar */}
          <div 
            className={`
              w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
              bg-gradient-to-br ${testimonial.gradient}
              font-bold text-white text-base sm:text-lg
              flex-shrink-0
            `}
            aria-hidden="true"
          >
            {getInitials(testimonial.name)}
          </div>

          {/* Author Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
               <cite 
                 id={`testimonial-author-${testimonial.id}`}
                 className="font-bold text-gray-800 text-base not-italic"
               >
                {testimonial.name}
              </cite>
              {testimonial.verified && (
                <span 
                  title="Cliente verificado"
                  aria-label="Cliente verificado"
                >
                  <VerifiedBadgeIcon />
                </span>
              )}
            </div>
             <p className="text-gray-600 text-sm">
               {testimonial.role}
             </p>
             <p className="text-gray-500 text-xs mt-1">
               {testimonial.business} • {formatDate(testimonial.date)}
             </p>
          </div>
        </footer>
      </div>

      {/* Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-3xl blur-xl -z-10
          bg-gradient-to-r ${testimonial.gradient}
          opacity-0 group-hover:opacity-10
          transition-opacity duration-500
        `}
        aria-hidden="true"
      />
    </article>
  )
}

// ============================================
// MAIN TESTIMONIALS COMPONENT
// ============================================
const Testimonials = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)
  
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
  // SCROLL ANIMATIONS
  // ============================================
  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Title Animation
      const titleLines = titleRef.current?.querySelectorAll('[data-title-line]')
      if (titleLines) {
        gsap.fromTo(titleLines,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_CONFIG.duration.slow,
            stagger: ANIMATION_CONFIG.stagger,
            ease: ANIMATION_CONFIG.easing.strong,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
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
            duration: ANIMATION_CONFIG.duration.medium,
            ease: ANIMATION_CONFIG.easing.smooth,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Testimonial Cards Animation
      const cards = gridRef.current?.querySelectorAll('[data-testimonial-card]')
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: ANIMATION_CONFIG.duration.medium,
            stagger: ANIMATION_CONFIG.stagger,
            ease: ANIMATION_CONFIG.easing.smooth,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // CTA Animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_CONFIG.duration.medium,
            ease: ANIMATION_CONFIG.easing.smooth,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleStartClick = useCallback(() => {
    const productsSection = document.querySelector('#productos')
    productsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleMoreTestimonialsClick = useCallback(() => {
    console.log('More testimonials requested')
    // Implement pagination or modal with more testimonials
  }, [])

  // ============================================
  // RENDER
  // ============================================
  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-400/5" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-red-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" aria-hidden="true" />

      {/* Content Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div ref={titleRef} className="space-y-2 sm:space-y-4">
            <h2 
              id="testimonials-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
               <span data-title-line className="block text-gray-800">
                 Lo que dicen
               </span>
               <span data-title-line className="block text-gray-800">
                 nuestros
               </span>
               <span 
                 data-title-line 
                 className="block bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent"
               >
                 clientes
               </span>
            </h2>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-6 sm:mt-8 px-4"
          >
            Emprendedores reales compartiendo sus experiencias con nuestros productos.
          </p>
        </header>

        {/* Testimonials Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

       
      </div>
    </section>
  )
}

export default Testimonials
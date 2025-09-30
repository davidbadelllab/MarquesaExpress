import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// CONFIGURATION & DATA
// ============================================
const PRODUCTS_DATA = [
  {
    id: 'ebook-premium',
    name: "Ebook Premium",
    tagline: "Recetas Exclusivas",
    description: "50+ recetas probadas de panadería y pastelería con fórmulas de alto rendimiento.",
    benefits: [
      { id: 'instant-access', text: "Acceso inmediato tras la compra" },
      { id: 'downloadable', text: "Descarga ilimitada en todos tus dispositivos" },
      { id: 'offline-reading', text: "Lectura offline sin conexión a internet" },
      { id: 'lifetime-access', text: "Acceso de por vida sin renovaciones" },
      { id: 'updates', text: "Actualizaciones gratuitas automáticas" },
      { id: 'printable', text: "Versión imprimible para tu cocina" }
    ],
    popular: true,
    icon: "book",
    gradient: "from-amber-400 to-amber-600"
  },
  {
    id: 'video-guides',
    name: "Video-Guías",
    tagline: "Aprendizaje Visual",
    description: "Tutoriales en video HD para dominar las técnicas más avanzadas de panadería.",
    benefits: [
      { id: 'hd-quality', text: "Videos en alta definición (1080p)" },
      { id: 'mobile-friendly', text: "Optimizado para móviles y tablets" },
      { id: 'downloadable', text: "Descarga para ver sin internet" },
      { id: 'lifetime-access', text: "Acceso permanente sin límites" },
      { id: 'multiple-devices', text: "Sincronización entre dispositivos" },
      { id: 'bonus-content', text: "Contenido bonus exclusivo" }
    ],
    popular: false,
    icon: "video",
    gradient: "from-red-400 to-red-600"
  },
  {
    id: 'complete-bundle',
    name: "Paquete Completo",
    tagline: "Todo Incluido",
    description: "Acceso completo a todos nuestros productos digitales con beneficios exclusivos.",
    benefits: [
      { id: 'all-products', text: "Todos los productos incluidos" },
      { id: 'exclusive-content', text: "Contenido exclusivo solo para miembros" },
      { id: 'community-access', text: "Acceso a comunidad privada" },
      { id: 'priority-support', text: "Soporte prioritario 24/7" },
      { id: 'early-access', text: "Acceso anticipado a nuevos productos" },
      { id: 'money-back', text: "Garantía de satisfacción 30 días" }
    ],
    popular: false,
    icon: "package",
    gradient: "from-amber-400 to-red-400"
  }
]

const ANIMATION_CONFIG = {
  duration: { fast: 0.6, medium: 0.8, slow: 1 },
  easing: { smooth: "power3.out", strong: "power4.out" },
  stagger: 0.15
}

// ============================================
// ICON COMPONENTS
// ============================================
const BookIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const VideoIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const PackageIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

// ============================================
// UTILITY FUNCTIONS
// ============================================
const getIcon = (iconName) => {
  const icons = {
    book: BookIcon,
    video: VideoIcon,
    package: PackageIcon
  }
  return icons[iconName] || BookIcon
}

// Removed price formatting functions - focusing on benefits instead

// ============================================
// PRODUCT CARD COMPONENT
// ============================================
const ProductCard = ({ product, index, prefersReducedMotion, onPurchase }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const Icon = getIcon(product.icon)

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    const card = cardRef.current

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
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

  const handlePurchaseClick = () => {
    onPurchase(product)
  }

  return (
    <article
      ref={cardRef}
      className={`
        relative group h-full
        ${product.popular ? 'lg:scale-105' : ''}
      `}
      data-product-card
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Popular Badge */}
      {product.popular && (
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
          role="status"
          aria-label="Producto más popular"
        >
          <div className="
            flex items-center gap-2 px-4 py-2 rounded-full
            bg-gradient-to-r from-amber-400 to-red-400
            text-black text-sm font-bold
            shadow-lg shadow-amber-500/30
          ">
            <StarIcon />
            <span>Más Popular</span>
          </div>
        </div>
      )}

      {/* Card Container */}
      <div className={`
        relative h-full p-6 sm:p-8 rounded-3xl
         bg-white/80 backdrop-blur-sm
         border-2 transition-all duration-500
         ${product.popular 
           ? 'border-amber-400/50 shadow-xl shadow-amber-500/20' 
           : 'border-amber-200/50 hover:border-amber-300/70'
         }
        ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
      `}>
        
        {/* Icon & Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className={`
            inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 rounded-2xl
            bg-gradient-to-br ${product.gradient}
            shadow-lg group-hover:shadow-xl
            transition-all duration-500
            ${isHovered ? 'scale-110 rotate-3' : ''}
          `}>
            <Icon />
          </div>
          
           <h3 
             id={`product-title-${product.id}`}
             className="text-xl sm:text-2xl font-bold text-gray-800 mb-2"
           >
            {product.name}
          </h3>
          
          <p className={`
            font-medium bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent
          `}>
            {product.tagline}
          </p>
        </div>

        {/* Benefits Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Beneficios Incluidos
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed px-2">
              {product.description}
            </p>
          </div>
        </div>

        {/* Benefits List */}
        <ul 
          className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
          role="list"
          aria-label={`Beneficios de ${product.name}`}
        >
          {product.benefits.map((benefit) => (
            <li 
              key={benefit.id}
              className="flex items-start gap-3"
              role="listitem"
            >
              <div className={`
                flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                bg-gradient-to-r ${product.gradient}
              `}>
                <CheckCircleIcon />
              </div>
               <span className="text-sm text-gray-700 leading-relaxed">
                 {benefit.text}
               </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={handlePurchaseClick}
          className={`
            w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg
            transition-all duration-300
             focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white
            active:scale-95
            ${product.popular
              ? 'bg-gradient-to-r from-amber-400 to-red-400 text-black hover:shadow-xl hover:shadow-amber-500/50 focus-visible:ring-amber-400'
              : 'bg-gradient-to-r from-amber-500 to-red-500 text-white hover:shadow-xl hover:shadow-amber-500/30 focus-visible:ring-amber-500'
            }
          `}
          aria-label={`Obtener ${product.name}`}
        >
          Obtener Ahora
        </button>
      </div>

      {/* Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-3xl blur-xl -z-10
          bg-gradient-to-r ${product.gradient}
          opacity-0 group-hover:opacity-20
          transition-opacity duration-500
        `}
        aria-hidden="true"
      />
    </article>
  )
}

// ============================================
// MAIN PRODUCTS COMPONENT
// ============================================
const Products = () => {
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

      // Product Cards Animation
      const cards = gridRef.current?.querySelectorAll('[data-product-card]')
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
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_CONFIG.duration.medium,
            ease: ANIMATION_CONFIG.easing.smooth,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
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
  const handlePurchase = useCallback((product) => {
    console.log('Purchase initiated for:', product.name)
    // Implement your checkout logic here
    // Example: redirect to checkout, open modal, etc.
  }, [])

  const handleDemoClick = useCallback(() => {
    console.log('Demo requested')
    // Implement your demo logic here
  }, [])

  // ============================================
  // RENDER
  // ============================================
  return (
    <section
      ref={sectionRef}
      id="productos"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-400/5" aria-hidden="true" />
      <div className="absolute top-1/4 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-400/10 rounded-full blur-3xl -translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-red-400/10 rounded-full blur-3xl translate-x-1/2" aria-hidden="true" />

      {/* Content Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div ref={titleRef} className="space-y-2 sm:space-y-4">
            <h2 
              id="products-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
               <span data-title-line className="block text-gray-800">
                 Nuestros
               </span>
               <span 
                 data-title-line 
                 className="block bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent"
               >
                 Productos
               </span>
            </h2>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-6 sm:mt-8 px-4"
          >
            Elige el paquete que mejor se adapte a tus necesidades y comienza 
            tu transformación hacia el éxito en la panadería.
          </p>
        </header>

        {/* Products Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {PRODUCTS_DATA.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
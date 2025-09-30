import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import Lottie from 'lottie-react'
import footAnimation from '../../public/img/json/foot.json'

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================
const ANIMATION_CONFIG = {
  duration: {
    fast: 0.6,
    medium: 0.8,
    slow: 1.2,
    elastic: 1.5
  },
  easing: {
    smooth: "power3.out",
    bounce: "elastic.out(1, 0.3)",
    strong: "power4.out"
  },
  stagger: 0.15,
  delay: {
    title: 0,
    subtitle: 0.4,
    buttons: 0.6,
    features: 0.8
  }
}

const HERO_FEATURES = [
  { id: 'proven', text: "Recetas probadas", icon: "check" },
  { id: 'simple', text: "Formato sencillo", icon: "check" },
  { id: 'high-performance', text: "Alto rendimiento", icon: "check" }
]


// ============================================
// ICON COMPONENTS
// ============================================
const CheckIcon = () => (
  <svg 
    className="w-3 h-3" 
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd" 
    />
  </svg>
)


const ArrowRightIcon = () => (
  <svg 
    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13 7l5 5m0 0l-5 5m5-5H6" 
    />
  </svg>
)

// ============================================
// SUB-COMPONENTS
// ============================================
const FeatureBadge = ({ feature }) => (
  <div className="flex items-center gap-2 group">
    <div 
      className="
        w-6 h-6 rounded-full flex items-center justify-center
        bg-gradient-to-br from-amber-400 to-red-400
        text-black font-bold text-xs
        group-hover:scale-110 group-hover:rotate-12
        transition-all duration-300
        shadow-lg shadow-amber-500/25
      "
      aria-hidden="true"
    >
      <CheckIcon />
    </div>
    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
      {feature.text}
    </span>
  </div>
)

const LottieAnimation = ({ animationRef }) => (
  <div 
    ref={animationRef}
    className="
      relative w-full max-w-md mx-auto
      flex items-center justify-center
    "
  >
    <div 
      className="
        relative rounded-3xl p-8 sm:p-10
        bg-white/80 backdrop-blur-xl
        border border-amber-200/50
        shadow-2xl shadow-amber-500/20
        overflow-hidden
      "
    >
      {/* Lottie Animation Container */}
      <div className="relative w-80 h-80 mx-auto">
        <Lottie
          animationData={footAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-full"
          aria-label="Animación de cocina y pastelería"
        />
      </div>
      
      {/* Decorative blur orbs */}
      <div 
        className="absolute -top-8 -right-8 w-24 h-24 bg-amber-300/30 rounded-full blur-2xl pointer-events-none"
        style={{ animation: 'pulse 2s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-8 -left-8 w-32 h-32 bg-red-300/30 rounded-full blur-2xl pointer-events-none"
        style={{ animation: 'pulse 2s ease-in-out infinite 1s' }}
        aria-hidden="true"
      />
    </div>
  </div>
)

// ============================================
// MAIN HERO COMPONENT
// ============================================
const Hero = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const featuresRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef(null)
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

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
  // VISIBILITY DETECTION (Performance optimization)
  // ============================================
  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // ============================================
  // ANIMATIONS
  // ============================================
  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: ANIMATION_CONFIG.easing.smooth } })
      
      // Title animation
      const titleLines = titleRef.current?.querySelectorAll('[data-title-line]')
      if (titleLines) {
        tl.fromTo(titleLines,
          { y: 80, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: ANIMATION_CONFIG.duration.slow,
            stagger: ANIMATION_CONFIG.stagger,
            ease: ANIMATION_CONFIG.easing.strong
          }
        )
      }

      // Subtitle animation
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: ANIMATION_CONFIG.duration.medium 
          },
          `-=${ANIMATION_CONFIG.delay.subtitle}`
        )
      }

      // Buttons animation
      const buttons = buttonsRef.current?.children
      if (buttons) {
        tl.fromTo(buttons,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: ANIMATION_CONFIG.duration.fast,
            stagger: 0.1
          },
          `-=${ANIMATION_CONFIG.delay.buttons - 0.2}`
        )
      }

      // Features animation
      const features = featuresRef.current?.children
      if (features) {
        tl.fromTo(features,
          { x: -20, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: ANIMATION_CONFIG.duration.fast,
            stagger: 0.1
          },
          `-=${ANIMATION_CONFIG.delay.features - 0.4}`
        )
      }

      // Lottie animation container animation
      if (animationRef.current) {
        tl.fromTo(animationRef.current,
          { scale: 0.9, opacity: 0, rotateY: -10 },
          { 
            scale: 1, 
            opacity: 1, 
            rotateY: 0,
            duration: ANIMATION_CONFIG.duration.elastic,
            ease: ANIMATION_CONFIG.easing.bounce
          },
          `-=${ANIMATION_CONFIG.delay.features}`
        )
      }

      // Particles fade in
      const particles = particlesRef.current?.children
      if (particles) {
        gsap.fromTo(particles,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 0.4, 
            duration: 1.5,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.8
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // ============================================
  // CONTINUOUS ANIMATIONS (Only when visible)
  // ============================================
  useEffect(() => {
    if (prefersReducedMotion || !isVisible) return

    let floatAnimation, particleRotation

    // Floating animation for animation container
    if (animationRef.current) {
      floatAnimation = gsap.to(animationRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })
    }

    // Subtle particle rotation
    const particles = particlesRef.current?.children
    if (particles) {
      particleRotation = gsap.to(particles, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
        stagger: 1
      })
    }

    return () => {
      floatAnimation?.kill()
      particleRotation?.kill()
    }
  }, [prefersReducedMotion, isVisible])

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleExploreClick = useCallback(() => {
    const productsSection = document.querySelector('#productos')
    productsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleDemoClick = useCallback(() => {
    console.log('Demo requested')
    // Add your demo logic here
  }, [])

  // ============================================
  // RENDER
  // ============================================
  return (
    <section 
      ref={sectionRef}
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20"
      aria-labelledby="hero-heading"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)
        `
      }}
    >
      {/* Animated background particles */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-20 w-3 h-3 bg-amber-500/60 rounded-full blur-sm" />
        <div className="absolute top-40 right-32 w-4 h-4 bg-red-500/60 rounded-full blur-sm" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-amber-500/70 rounded-full blur-sm" />
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-red-500/60 rounded-full blur-sm" />
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-amber-500/80 rounded-full blur-sm" />
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-red-500/70 rounded-full blur-sm" />
      </div>

      {/* Content Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 sm:space-y-10">
            
            {/* Main Heading */}
            <header className="space-y-6">
              <h1 
                ref={titleRef}
                id="hero-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span data-title-line className="block text-gray-800">
                  Convierte tu
                </span>
                <span data-title-line className="block text-gray-800">
                  pasión en un
                </span>
                <span 
                  data-title-line 
                  className="block bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent"
                >
                  negocio exitoso
                </span>
              </h1>
              
              <p 
                ref={subtitleRef}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl"
              >
                Plataforma líder en infoproductos digitales de panadería y pastelería. 
                Recetas probadas y rentables para que aprendas rápido y emprendas.
              </p>
            </header>

            {/* CTA Section */}
            <div className="space-y-6 sm:space-y-8">
              
             
              {/* Feature Badges */}
              <div 
                ref={featuresRef}
                className="flex flex-wrap items-center gap-6"
                role="list"
                aria-label="Características principales"
              >
                {HERO_FEATURES.map((feature) => (
                  <div key={feature.id} role="listitem">
                    <FeatureBadge feature={feature} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Lottie Animation */}
          <div className="relative lg:block hidden">
            <LottieAnimation animationRef={animationRef} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
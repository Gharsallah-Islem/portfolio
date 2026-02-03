import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function WelcomeText() {
    const containerRef = useRef<HTMLDivElement>(null)
    const hiRef = useRef<HTMLSpanElement>(null)
    const nameRef = useRef<HTMLSpanElement>(null)
    const welcomeRef = useRef<HTMLSpanElement>(null)
    const cursorRef = useRef<HTMLSpanElement>(null)
    const underlineRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        // Initial entrance animation
        const tl = gsap.timeline({ delay: 0.5 })

        // Fade in container with scale
        tl.fromTo(containerRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )

        // Animate "Hi" text with typewriter effect
        tl.fromTo(hiRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.3'
        )

        // Animate name with character reveal
        tl.fromTo(nameRef.current,
            { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
            { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power2.out' },
            '-=0.2'
        )

        // Animate welcome text
        tl.fromTo(welcomeRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.2'
        )

        // Underline sweep animation
        tl.fromTo(underlineRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
        )

        // Blinking cursor
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        })

    }, [])

    // Hover animations
    const handleMouseEnter = () => {
        setIsHovered(true)

        // Scale up container slightly
        gsap.to(containerRef.current, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        })

        // Glow effect on name
        gsap.to(nameRef.current, {
            textShadow: '0 0 30px rgba(96,205,255,0.8), 0 0 60px rgba(96,205,255,0.4)',
            color: '#60cdff',
            duration: 0.3
        })

        // Underline color change
        gsap.to(underlineRef.current, {
            background: 'linear-gradient(90deg, #60cdff, #0078d4, #60cdff)',
            duration: 0.3
        })

        // Float animation on letters
        gsap.to(hiRef.current, {
            y: -3,
            duration: 0.3,
            ease: 'power2.out'
        })
    }

    const handleMouseLeave = () => {
        setIsHovered(false)

        gsap.to(containerRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        })

        gsap.to(nameRef.current, {
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            color: '#ffffff',
            duration: 0.3
        })

        gsap.to(underlineRef.current, {
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
            duration: 0.3
        })

        gsap.to(hiRef.current, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        })
    }

    // Mouse move parallax effect
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) / 50
        const deltaY = (e.clientY - centerY) / 50

        gsap.to(containerRef.current, {
            rotateY: deltaX,
            rotateX: -deltaY,
            duration: 0.3,
            ease: 'power2.out'
        })
    }

    const handleMouseLeaveContainer = () => {
        handleMouseLeave()
        gsap.to(containerRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'power2.out'
        })
    }

    return (
        <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
            style={{ perspective: '1000px' }}
        >
            <div
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeaveContainer}
                onMouseMove={handleMouseMove}
                className="relative text-center pointer-events-auto cursor-default px-8 py-6 rounded-2xl transition-all duration-300"
                style={{
                    background: isHovered
                        ? 'rgba(0,0,0,0.3)'
                        : 'rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: isHovered
                        ? '1px solid rgba(96,205,255,0.3)'
                        : '1px solid rgba(255,255,255,0.1)',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Main greeting line - stacks on mobile */}
                <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-1 sm:gap-3 mb-2">
                    <span
                        ref={hiRef}
                        className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90"
                        style={{
                            fontFamily: 'Segoe UI, system-ui, sans-serif',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}
                    >
                        Hi, I'm
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span
                            ref={nameRef}
                            className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white"
                            style={{
                                fontFamily: 'Segoe UI, system-ui, sans-serif',
                                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Islem Gharsallah
                        </span>
                        <span
                            ref={cursorRef}
                            className="text-2xl sm:text-4xl md:text-5xl font-light text-[#60cdff]"
                        >
                            |
                        </span>
                    </div>
                </div>

                {/* Animated underline */}
                <div
                    ref={underlineRef}
                    className="h-[2px] w-full mb-4 rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.4), rgba(255,255,255,0.1))'
                    }}
                />

                {/* Welcome message */}
                <span
                    ref={welcomeRef}
                    className="text-lg md:text-xl text-white/70 font-light tracking-wide"
                    style={{
                        fontFamily: 'Segoe UI, system-ui, sans-serif',
                        textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                    }}
                >
                    Welcome to my portfolio ✨
                </span>

                {/* Subtle hint */}
                <div className="mt-4 text-xs text-white/30 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    Double-click any icon to explore
                </div>
            </div>
        </div>
    )
}

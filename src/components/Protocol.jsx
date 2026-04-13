import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROTOCOL_STEPS } from '../constants/content'

/* ---------- SVG / Canvas Animation Components ---------- */

function RotatingMotif() {
  const svgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.motif-ring', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
        stagger: { each: 0, from: 'start' },
      })
      gsap.to('.motif-ring-reverse', {
        rotation: -360,
        duration: 30,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      })
    }, svgRef)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" className="w-full h-full opacity-20">
      {[30, 50, 70, 90].map((r, i) => (
        <circle
          key={i}
          className={i % 2 === 0 ? 'motif-ring' : 'motif-ring-reverse'}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? '#CC5833' : '#2E4036'}
          strokeWidth="0.5"
          strokeDasharray={`${4 + i * 2} ${8 + i * 3}`}
        />
      ))}
    </svg>
  )
}

function ScannerLine() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    let animId
    let scanY = 0

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx2d.clearRect(0, 0, w, h)

      // Dot grid
      const spacing = 16
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const dist = Math.abs(y - scanY)
          const alpha = dist < 30 ? 0.5 - dist / 60 : 0.05
          ctx2d.fillStyle = `rgba(204, 88, 51, ${alpha})`
          ctx2d.beginPath()
          ctx2d.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx2d.fill()
        }
      }

      // Scan line
      ctx2d.strokeStyle = 'rgba(204, 88, 51, 0.4)'
      ctx2d.lineWidth = 1
      ctx2d.beginPath()
      ctx2d.moveTo(0, scanY)
      ctx2d.lineTo(w, scanY)
      ctx2d.stroke()

      scanY += 0.5
      if (scanY > h) scanY = 0
      animId = requestAnimationFrame(draw)
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx2d.scale(2, 2)
    }

    resize()
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-30"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

function PulsingWaveform() {
  const svgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.waveform-path', {
        strokeDashoffset: -1000,
        duration: 8,
        ease: 'none',
        repeat: -1,
      })
    }, svgRef)
    return () => ctx.revert()
  }, [])

  const points = Array.from({ length: 100 }, (_, i) => {
    const x = (i / 99) * 400
    const y =
      50 +
      Math.sin(i * 0.3) * 20 +
      (i % 12 < 3 ? Math.sin(i * 1.5) * 30 : 0)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg ref={svgRef} viewBox="0 0 400 100" className="w-full h-full opacity-25" preserveAspectRatio="none">
      <polyline
        className="waveform-path"
        points={points}
        fill="none"
        stroke="#CC5833"
        strokeWidth="1.5"
        strokeDasharray="500"
        strokeDashoffset="0"
      />
    </svg>
  )
}

/* ---------- Main Protocol Component ---------- */

const ANIMATIONS = [RotatingMotif, ScannerLine, PulsingWaveform]
const CARD_COLORS = ['bg-white/80 border-moss/10', 'bg-white/80 border-clay/10', 'bg-white/80 border-charcoal/[0.06]']

export default function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')

      // Only apply sticky stacking on desktop
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 80px',
              end: '+=70%',
              pin: true,
              pinSpacing: true,
              onUpdate: (self) => {
                const progress = self.progress
                gsap.to(card, {
                  scale: 1 - progress * 0.06,
                  filter: `blur(${progress * 8}px)`,
                  opacity: 1 - progress * 0.3,
                  duration: 0.1,
                  overwrite: true,
                })
              },
            })
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="protocol" ref={containerRef} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
          How It Works
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tighter-custom text-charcoal mt-4">
          Three steps to
          <br />
          <span className="font-drama italic text-clay">operational readiness.</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-6 md:space-y-0">
        {PROTOCOL_STEPS.map((step, i) => {
          const Animation = ANIMATIONS[i]
          return (
            <div
              key={step.number}
              className={`protocol-card ${CARD_COLORS[i]} border rounded-4xl p-8 md:p-12 min-h-[60vh] md:min-h-[70vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 shadow-md shadow-charcoal/[0.04]`}
            >
              {/* Content */}
              <div className="flex-1">
                <span className="font-mono text-sm text-charcoal/30 mb-4 block">
                  {step.number}
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-4xl tracking-tight-custom text-charcoal mb-4">
                  {step.title}
                </h3>
                <p className="text-charcoal/50 text-base md:text-lg leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Animation */}
              <div className="w-full md:w-1/2 h-48 md:h-64 flex items-center justify-center">
                <Animation />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

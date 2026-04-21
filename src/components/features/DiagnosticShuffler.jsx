import { useState, useEffect, useRef } from 'react'

const SCENARIOS = [
  {
    label: 'Scenario Generation',
    detail: 'Armed robbery at convenience store',
    accent: 'bg-clay/15 text-clay border-clay/20',
    bar: 'bg-clay/50',
    metrics: [85, 92, 78],
    metricLabels: ['Location', 'Tombstone', 'Safety'],
    improvement: 'Confirm suspect direction of travel',
  },
  {
    label: 'Adaptive Difficulty',
    detail: 'Multi-vehicle collision, low visibility',
    accent: 'bg-clay/15 text-clay border-clay/20',
    bar: 'bg-clay/50',
    metrics: [68, 95, 88],
    metricLabels: ['Location', 'Tombstone', 'Safety'],
    improvement: 'Confirm mile marker earlier in call',
  },
  {
    label: 'Rapid Onboarding',
    detail: 'Domestic disturbance, child present',
    accent: 'bg-clay/15 text-clay border-clay/20',
    bar: 'bg-clay/50',
    metrics: [72, 84, 91],
    metricLabels: ['Location', 'Tombstone', 'Safety'],
    improvement: 'Ask about weapons before dispatching',
  },
]

export default function DiagnosticShuffler() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('enter') // 'enter' | 'exit'
  const timeoutRef = useRef(null)

  useEffect(() => {
    const cycle = () => {
      // Start exit
      setDirection('exit')

      timeoutRef.current = setTimeout(() => {
        // Swap card and start enter
        setActiveIndex((prev) => (prev + 1) % SCENARIOS.length)
        setDirection('enter')
      }, 400)
    }

    const interval = setInterval(cycle, 3200)
    return () => {
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const scenario = SCENARIOS[activeIndex]
  const isVisible = direction === 'enter'

  return (
    <div className="relative h-56 w-full flex flex-col">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mb-3">
        {SCENARIOS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIndex
                ? 'w-6 bg-clay'
                : 'w-1.5 bg-charcoal/15'
            }`}
          />
        ))}
        <span className="ml-auto font-mono text-[10px] text-charcoal/30">
          {activeIndex + 1}/{SCENARIOS.length}
        </span>
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-2xl border border-charcoal/[0.06] bg-white/70 p-4 overflow-hidden"
        style={{
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-12px)',
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-charcoal/80 font-heading font-medium">
            {scenario.detail}
          </p>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${scenario.accent}`}>
            ACTIVE
          </span>
        </div>

        {/* Metrics */}
        <div className="space-y-2 mt-auto">
          {scenario.metrics.map((val, j) => (
            <div key={j} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-charcoal/35 w-16 uppercase tracking-wider">
                {scenario.metricLabels[j]}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-charcoal/[0.06] overflow-hidden">
                <div
                  className={`h-full rounded-full ${scenario.bar}`}
                  style={{
                    width: isVisible ? `${val}%` : '0%',
                    transition: `width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${j * 0.1}s`,
                  }}
                />
              </div>
              <span className="font-mono text-[10px] text-charcoal/40 w-6 text-right">
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Improvement note */}
        <div className="mt-3 pt-2 border-t border-charcoal/[0.06] flex items-start gap-1.5">
          <span className="font-mono text-[9px] text-clay/70 uppercase tracking-wider mt-[1px]">
            Fix
          </span>
          <span className="text-[11px] text-charcoal/60 leading-snug">
            {scenario.improvement}
          </span>
        </div>
      </div>
    </div>
  )
}

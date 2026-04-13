import { useState, useEffect, useRef } from 'react'

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const ACTIVE_DAYS = [1, 3, 5] // Mon, Wed, Fri
const CURSOR_SEQUENCE = [
  { target: 1, delay: 600 },
  { target: 3, delay: 800 },
  { target: 5, delay: 700 },
  { target: 'save', delay: 500 },
]

export default function CursorScheduler() {
  const [activeDays, setActiveDays] = useState([])
  const [cursorPos, setCursorPos] = useState({ x: -20, y: -20 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [pressing, setPressing] = useState(false)
  const [saveActive, setSaveActive] = useState(false)
  const gridRef = useRef(null)
  const cellRefs = useRef({})
  const saveRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const animate = async () => {
      // Reset
      setActiveDays([])
      setSaveActive(false)
      setCursorVisible(true)

      for (const step of CURSOR_SEQUENCE) {
        if (cancelled) return

        // Move cursor to target
        await new Promise((resolve) => setTimeout(resolve, 400))
        if (cancelled) return

        let targetEl
        if (step.target === 'save') {
          targetEl = saveRef.current
        } else {
          targetEl = cellRefs.current[step.target]
        }

        if (targetEl && gridRef.current) {
          const gridRect = gridRef.current.getBoundingClientRect()
          const targetRect = targetEl.getBoundingClientRect()
          setCursorPos({
            x: targetRect.left - gridRect.left + targetRect.width / 2,
            y: targetRect.top - gridRect.top + targetRect.height / 2,
          })
        }

        // Wait for cursor to arrive
        await new Promise((resolve) => setTimeout(resolve, step.delay))
        if (cancelled) return

        // Click
        setPressing(true)
        await new Promise((resolve) => setTimeout(resolve, 150))
        if (cancelled) return
        setPressing(false)

        if (step.target === 'save') {
          setSaveActive(true)
        } else {
          setActiveDays((prev) => [...prev, step.target])
        }

        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      // Fade cursor out
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (cancelled) return
      setCursorVisible(false)

      // Wait then restart
      await new Promise((resolve) => setTimeout(resolve, 2000))
      if (!cancelled) animate()
    }

    animate()
    return () => { cancelled = true }
  }, [])

  return (
    <div ref={gridRef} className="relative h-48">
      {/* Week header */}
      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {DAYS.map((day, i) => (
          <div
            key={`header-${i}`}
            className="text-center font-mono text-[10px] text-charcoal/30 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {[0, 1, 2, 3].map((week) => (
        <div key={week} className="grid grid-cols-7 gap-1.5 mb-1.5">
          {DAYS.map((_, dayIndex) => {
            const isActiveTarget = week === 1 && activeDays.includes(dayIndex)
            return (
              <div
                key={`${week}-${dayIndex}`}
                ref={(el) => {
                  if (week === 1) cellRefs.current[dayIndex] = el
                }}
                className={`aspect-square rounded-lg border transition-all duration-300 ${
                  isActiveTarget
                    ? 'bg-clay/20 border-clay/40 scale-95'
                    : 'bg-charcoal/[0.03] border-charcoal/5'
                }`}
              />
            )
          })}
        </div>
      ))}

      {/* Save button */}
      <div className="mt-2 flex justify-end">
        <button
          ref={saveRef}
          className={`px-3 py-1 rounded-full font-mono text-[10px] font-medium transition-all duration-300 ${
            saveActive
              ? 'bg-clay text-cream'
              : 'bg-charcoal/5 text-charcoal/40'
          }`}
        >
          Save Schedule
        </button>
      </div>

      {/* Animated cursor */}
      <svg
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: cursorPos.x - 8,
          top: cursorPos.y - 2,
          opacity: cursorVisible ? 1 : 0,
          transform: pressing ? 'scale(0.85)' : 'scale(1)',
          width: 20,
          height: 24,
        }}
        viewBox="0 0 20 24"
        fill="none"
      >
        <path
          d="M4 0L18 10.5L10.5 11.5L14 22L10.5 23.5L7 13L2 17.5L4 0Z"
          fill="#1A1A1A"
          stroke="#F2F0E9"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react'

const DATA_POINTS = [62, 58, 71, 75, 82, 94]
const SESSION_LABELS = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']

const PADDING = { top: 8, right: 8, bottom: 4, left: 8 }
const SVG_WIDTH = 280
const SVG_HEIGHT = 120

const chartW = SVG_WIDTH - PADDING.left - PADDING.right
const chartH = SVG_HEIGHT - PADDING.top - PADDING.bottom

const minVal = Math.min(...DATA_POINTS) - 10
const maxVal = Math.max(...DATA_POINTS) + 5

const points = DATA_POINTS.map((val, i) => ({
  x: PADDING.left + (i / (DATA_POINTS.length - 1)) * chartW,
  y: PADDING.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH,
}))

const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
const areaPath = `${linePath} L${points[points.length - 1].x},${PADDING.top + chartH} L${points[0].x},${PADDING.top + chartH} Z`

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function SparklineProgress() {
  const [lineProgress, setLineProgress] = useState(0)
  const [visiblePoints, setVisiblePoints] = useState([])
  const [areaOpacity, setAreaOpacity] = useState(0)
  const [score, setScore] = useState(null)
  const [containerOpacity, setContainerOpacity] = useState(1)
  const pathRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)
  const rafRef = useRef(null)

  const getPointThresholds = useCallback(() => {
    if (!pathLength) return []
    return points.map((_, i) => {
      const fraction = i / (points.length - 1)
      return fraction
    })
  }, [pathLength])

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  useEffect(() => {
    if (!pathLength) return

    let cancelled = false
    const thresholds = getPointThresholds()

    const countUp = (target, durationMs) => {
      return new Promise((resolve) => {
        const start = performance.now()
        const tick = (now) => {
          if (cancelled) return resolve()
          const elapsed = now - start
          const progress = Math.min(elapsed / durationMs, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setScore(+(eased * target).toFixed(1))
          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            resolve()
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      })
    }

    const animate = async () => {
      // Reset
      setLineProgress(0)
      setVisiblePoints([])
      setAreaOpacity(0)
      setScore(null)
      setContainerOpacity(1)

      await sleep(300)
      if (cancelled) return

      // Draw line over ~1.8s by stepping progress
      const drawDuration = 1800
      const drawStart = performance.now()

      await new Promise((resolve) => {
        const step = (now) => {
          if (cancelled) return resolve()
          const elapsed = now - drawStart
          const raw = Math.min(elapsed / drawDuration, 1)
          const eased = 1 - Math.pow(1 - raw, 2)
          setLineProgress(eased)

          // Show points as line reaches them
          const newVisible = []
          thresholds.forEach((t, i) => {
            if (eased >= t) newVisible.push(i)
          })
          setVisiblePoints(newVisible)

          if (raw < 1) {
            rafRef.current = requestAnimationFrame(step)
          } else {
            resolve()
          }
        }
        rafRef.current = requestAnimationFrame(step)
      })

      if (cancelled) return

      // Fade in area fill
      setAreaOpacity(1)
      await sleep(600)
      if (cancelled) return

      // Count up score
      await countUp(94.2, 800)
      if (cancelled) return

      // Hold
      await sleep(2000)
      if (cancelled) return

      // Fade out
      setContainerOpacity(0)
      await sleep(900)
      if (cancelled) return

      // Restart
      if (!cancelled) animate()
    }

    animate()
    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [pathLength, getPointThresholds])

  const dashOffset = pathLength ? pathLength * (1 - lineProgress) : pathLength

  return (
    <div
      className="relative h-48 flex flex-col"
      style={{
        opacity: containerOpacity,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest">
          Call Duration
        </span>
        <span
          className="font-heading font-bold text-lg text-clay tabular-nums"
          style={{
            opacity: score !== null ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          {score !== null ? `${score}%` : ''}
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CC5833" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#CC5833" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#areaGrad)"
            style={{
              opacity: areaOpacity,
              transition: 'opacity 0.6s ease-out',
            }}
          />

          {/* Line */}
          <path
            ref={pathRef}
            d={linePath}
            fill="none"
            stroke="#CC5833"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: dashOffset,
            }}
          />

          {/* Data points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#CC5833"
              stroke="#F2F0E9"
              strokeWidth="1.5"
              style={{
                transform: visiblePoints.includes(i) ? 'scale(1)' : 'scale(0)',
                transformOrigin: `${p.x}px ${p.y}px`,
                transformBox: 'fill-box',
                transition: visiblePoints.includes(i)
                  ? 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  : 'none',
              }}
            />
          ))}
        </svg>
      </div>

      {/* Session labels */}
      <div className="flex justify-between px-1 mt-1">
        {SESSION_LABELS.map((label, i) => (
          <span
            key={label}
            className="font-mono text-[9px] text-charcoal/30"
            style={{
              opacity: visiblePoints.includes(i) ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

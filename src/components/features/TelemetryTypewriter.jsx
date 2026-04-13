import { useState, useEffect, useRef } from 'react'
import { FEATURES } from '../../constants/content'

const MESSAGES = FEATURES[1].typewriterMessages

export default function TelemetryTypewriter() {
  const [lines, setLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const feedRef = useRef(null)

  useEffect(() => {
    if (msgIndex >= MESSAGES.length) {
      // Reset cycle
      const timeout = setTimeout(() => {
        setLines([])
        setMsgIndex(0)
        setCharIndex(0)
        setCurrentText('')
      }, 2000)
      return () => clearTimeout(timeout)
    }

    const msg = MESSAGES[msgIndex]

    if (charIndex < msg.length) {
      const timeout = setTimeout(() => {
        setCurrentText(msg.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 35)
      return () => clearTimeout(timeout)
    } else {
      // Finished typing current message
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev.slice(-4), msg])
        setCurrentText('')
        setMsgIndex(msgIndex + 1)
        setCharIndex(0)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [msgIndex, charIndex])

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [lines, currentText])

  return (
    <div className="bg-charcoal rounded-xl p-4 h-48 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-clay opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-clay" />
        </span>
        <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">
          Live Feed
        </span>
      </div>
      <div
        ref={feedRef}
        className="flex-1 overflow-hidden font-mono text-xs leading-relaxed"
      >
        {lines.map((line, i) => (
          <div key={i} className="text-cream/40 mb-1">
            {line}
          </div>
        ))}
        {currentText && (
          <div className="text-cream/70 mb-1">
            {currentText}
            <span className="cursor-blink text-clay ml-0.5">|</span>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useRef, useState, useEffect, type ReactNode, Children } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface CardDeckProps {
  children: ReactNode
  className?: string
}

/**
 * Rope-ladder card stack.
 * All cards start stacked on top of each other. As the user scrolls,
 * each card drops down to its natural position in a vertical list —
 * like rungs of a rope ladder falling into place. Thin string lines
 * connect the cards. The drop happens quickly (tight scroll runway).
 *
 * On mobile (<768px), renders a simple stacked list instead.
 */
export function CardDeck({ children, className }: CardDeckProps) {
  const items = Children.toArray(children)
  const containerRef = useRef<HTMLDivElement>(null)
  const count = items.length
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div className={`flex flex-col gap-6 ${className ?? ''}`}>
        {items.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      // Just enough runway for all drops — no dead scroll space
      style={{ height: `${count * 35}vh` }}
    >
      <div className="sticky top-20">
        {items.map((child, index) => (
          <LadderRung
            key={index}
            index={index}
            total={count}
            containerRef={containerRef}
          >
            {child}
          </LadderRung>
        ))}
      </div>
    </div>
  )
}

interface LadderRungProps {
  children: ReactNode
  index: number
  total: number
  containerRef: React.RefObject<HTMLDivElement | null>
}

function LadderRung({ children, index, total, containerRef }: LadderRungProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.4', 'end end'],
  })

  const isFirst = index === 0

  // Drops chain back-to-back with no dead scroll space.
  // Card 0 is already visible. Cards 1, 2, 3 each get an equal
  // slice of the full 0→1 scroll range, end-to-end.
  const droppableCards = Math.max(total - 1, 1)
  const dropStart = (index - 1) / droppableCards
  const dropEnd = index / droppableCards

  const stackOffset = index * -16

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 1]
      : [dropStart, dropEnd],
    isFirst
      ? [0, 0]
      : [stackOffset, 0],
  )

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 1]
      : [dropStart, dropStart + (dropEnd - dropStart) * 0.3, dropEnd],
    isFirst
      ? [1, 1]
      : [0, 1, 1],
  )

  const scale = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 1]
      : [dropStart, dropEnd],
    isFirst
      ? [1, 1]
      : [0.97, 1],
  )

  const stringHeight = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 1]
      : [dropStart, dropEnd],
    isFirst
      ? ['0px', '0px']
      : ['0px', '24px'],
  )

  const stringOpacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 1]
      : [dropStart, dropStart + (dropEnd - dropStart) * 0.4],
    isFirst
      ? [0, 0]
      : [0, 1],
  )

  return (
    <div>
      {/* String connectors — appear between cards as they separate */}
      {!isFirst && (
        <motion.div
          className="flex justify-between px-10"
          style={{ opacity: stringOpacity }}
        >
          <motion.div
            className="w-px bg-gradient-to-b from-accent/60 to-accent/20"
            style={{ height: stringHeight }}
          />
          <motion.div
            className="w-px bg-gradient-to-b from-accent/60 to-accent/20"
            style={{ height: stringHeight }}
          />
        </motion.div>
      )}

      {/* The card */}
      <motion.div
        style={{
          y,
          opacity,
          scale,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

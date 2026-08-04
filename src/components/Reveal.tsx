import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Scroll-reveal wrapper: fades/slides children in when they enter the
 * viewport. `delay` (ms) staggers siblings.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // No IntersectionObserver (old browsers, some crawlers): show immediately.
    if (!('IntersectionObserver' in window)) {
      el.classList.add('revealed')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle rather than fire-once: cards animate in every time they
        // enter the viewport, scrolling down or back up.
        el.classList.toggle('revealed', entry.isIntersecting)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className ?? ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

import { useEffect, useRef } from 'react'

/**
 * Subtle full-page background animation: slow-drifting "data node" dots
 * with faint connecting lines, fixed behind all content.
 * Respects prefers-reduced-motion and pauses when the tab is hidden.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const LINK_DIST = 140
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    const particles: P[] = []

    const makeParticle = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.8,
    })

    /** Full-width coral bands currently on screen, as y-ranges. */
    const coralRanges = (): Array<[number, number]> => {
      const out: Array<[number, number]> = []
      for (const el of document.querySelectorAll<HTMLElement>('.bg-accent')) {
        const r = el.getBoundingClientRect()
        if (r.width >= w * 0.9 && r.height > 120 && r.bottom > 0 && r.top < h) {
          out.push([r.top, r.bottom])
        }
      }
      return out
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // keep the particle pool sized to the viewport (also handles the
      // pool being empty if the page mounted while hidden)
      const target = Math.min(70, Math.floor((w * h) / 22000))
      while (particles.length < target) particles.push(makeParticle())
      particles.length = Math.min(particles.length, target)
    }
    resize()

    const CORAL = '224, 120, 86'
    const CHARCOAL = '35, 42, 49'

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const ranges = coralRanges()
      const colorAt = (y: number) =>
        ranges.some(([a, b]) => y >= a && y <= b) ? CHARCOAL : CORAL

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const rgb = colorAt((a.y + b.y) / 2)
            const base = rgb === CHARCOAL ? 0.16 : 0.1
            ctx.strokeStyle = `rgba(${rgb}, ${base * (1 - d / LINK_DIST)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of particles) {
        const rgb = colorAt(p.y)
        ctx.fillStyle = `rgba(${rgb}, ${rgb === CHARCOAL ? 0.38 : 0.28})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}

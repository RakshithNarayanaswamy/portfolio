import { useEffect, useState } from 'react'

/** Thin coral progress bar fixed under the nav showing scroll position. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent transition-transform duration-75"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden="true"
    />
  )
}

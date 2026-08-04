import type { ReactNode } from 'react'
import clsx from 'clsx'

/**
 * Section wrapper with a clean heading.
 * Charcoal & Coral pattern: default sections are charcoal with a coral
 * heading; `variant="coral"` flips to a full-bleed coral block with a
 * charcoal heading, so the page alternates color blocks as you scroll.
 */
export function Section({
  id,
  title,
  children,
  className,
  variant,
}: {
  id: string
  title: string
  children: ReactNode
  className?: string
  variant?: 'coral'
}) {
  const coral = variant === 'coral'
  return (
    <div className={coral ? 'bg-accent' : undefined}>
      <section id={id} className={clsx('mx-auto max-w-6xl px-4 py-20 sm:px-6', className)}>
        <div className="mb-10">
          <h2
            className={clsx(
              'text-2xl font-bold tracking-tight sm:text-3xl',
              coral ? 'text-[#232a31]' : 'text-accent',
            )}
          >
            {title}
          </h2>
          <div
            className={clsx(
              'mt-4 h-px w-full bg-gradient-to-r via-transparent to-transparent',
              coral ? 'from-[#232a31]/50' : 'from-accent/50',
            )}
          />
        </div>
        {children}
      </section>
    </div>
  )
}

/** Small mono badge/pill. */
export function Badge({
  children,
  tone = 'default',
}: {
  children: ReactNode
  tone?: 'default' | 'accent' | 'green' | 'violet'
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium leading-5',
        tone === 'default' && 'border-border bg-panel-2 text-ink-dim',
        tone === 'accent' && 'border-accent/30 bg-accent/10 text-accent',
        tone === 'green' && 'border-accent-2/30 bg-accent-2/10 text-accent-2',
        tone === 'violet' && 'border-accent-3/30 bg-accent-3/10 text-accent-3',
      )}
    >
      {children}
    </span>
  )
}

/** Panel with terminal chrome (traffic lights + title bar). */
export function TerminalPanel({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-lg border border-border bg-panel shadow-xl shadow-black/30',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-panel-2 px-4 py-2.5">
        <span className="size-3 rounded-full bg-danger/70" />
        <span className="size-3 rounded-full bg-warn/70" />
        <span className="size-3 rounded-full bg-accent-2/70" />
        <span className="ml-3 truncate text-xs text-ink-dim">{title}</span>
      </div>
      {children}
    </div>
  )
}

/** Brand icons - lucide removed these, so they live here as inline SVGs. */
export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.13-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

/** Green/amber status dot with pulse. */
export function StatusDot({ tone = 'green' }: { tone?: 'green' | 'amber' | 'cyan' }) {
  const color =
    tone === 'green' ? 'bg-accent-2' : tone === 'amber' ? 'bg-warn' : 'bg-accent'
  return (
    <span className="relative inline-flex size-2">
      <span className={clsx('absolute inline-flex size-full animate-ping rounded-full opacity-60', color)} />
      <span className={clsx('relative inline-flex size-2 rounded-full', color)} />
    </span>
  )
}

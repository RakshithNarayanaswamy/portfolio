import { useState } from 'react'
import { Menu, Terminal, X } from 'lucide-react'
import { contact, identity } from '../data'
import { StatusDot } from './ui'

const links = [
  { href: '#stack', label: 'stack' },
  { href: '#pipelines', label: 'pipelines' },
  { href: '#dashboard', label: 'metrics' },
  { href: '#snippets', label: 'snippets' },
  { href: '#contact', label: 'contact' },
] as const

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm text-ink">
          <Terminal className="size-4 text-accent" />
          <span className="font-semibold">rakshith@dataeng</span>
          <span className="text-ink-faint">:~$</span>
          <span className="cursor-blink text-accent">▊</span>
        </a>

        <nav className="hidden items-center gap-6 font-mono text-sm md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-dim transition-colors hover:text-accent">
              ./{l.label}
            </a>
          ))}
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded border border-border-bright bg-panel-2 px-3 py-1.5 text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            <StatusDot tone="green" />
            open to work
          </a>
        </nav>

        <button
          className="text-ink-dim md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-panel px-4 py-3 font-mono text-sm md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-ink-dim hover:text-accent"
            >
              ./{l.label}
            </a>
          ))}
          <p className="mt-2 border-t border-border pt-2 text-ink-faint">{identity.location}</p>
        </nav>
      )}
    </header>
  )
}

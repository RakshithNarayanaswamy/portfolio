import { Mail } from 'lucide-react'
import { contact, identity } from '../data'
import { GithubIcon, LinkedinIcon, Section, StatusDot } from './ui'

const channels = [
  {
    id: 'email',
    icon: Mail,
    label: 'email',
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    id: 'github',
    icon: GithubIcon,
    label: 'github',
    value: `@${contact.githubHandle}`,
    href: contact.github,
  },
  {
    id: 'linkedin',
    icon: LinkedinIcon,
    label: 'linkedin',
    value: `/in/${contact.linkedinHandle}`,
    href: contact.linkedin,
  },
] as const

export function Contact() {
  return (
    <>
      <Section id="contact" command="curl -X POST /contact" title="Get In Touch">
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((ch) => {
            const Icon = ch.icon
            return (
              <a
                key={ch.id}
                href={ch.href}
                target={ch.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                className="group rounded-lg border border-border bg-panel p-5 transition-colors hover:border-accent/40"
              >
                <Icon className="size-5 text-ink-faint transition-colors group-hover:text-accent" />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  {ch.label}
                </p>
                <p className="mt-1 truncate font-mono text-sm text-ink group-hover:text-accent">
                  {ch.value}
                </p>
              </a>
            )
          })}
        </div>
      </Section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 font-mono text-xs text-ink-faint sm:px-6">
          <span className="flex items-center gap-2">
            <StatusDot tone="green" />
            {identity.name} · {new Date().getFullYear()}
          </span>
          <span>
            exit code <span className="text-accent-2">0</span> · built with React + Vite +
            Tailwind
          </span>
        </div>
      </footer>
    </>
  )
}

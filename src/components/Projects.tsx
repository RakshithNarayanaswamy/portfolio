import { useState } from 'react'
import clsx from 'clsx'
import {
  Activity,
  ChevronDown,
  ExternalLink,
  GitBranch,
  Network,
} from 'lucide-react'
import { projects, type Project } from '../data'
import { Badge, GithubIcon, Section, StatusDot } from './ui'
import { Reveal } from './Reveal'

type TabId = 'challenge' | 'architecture' | 'metrics'

const tabs: { id: TabId; label: string; icon: typeof Activity }[] = [
  { id: 'challenge', label: 'The Challenge', icon: GitBranch },
  { id: 'architecture', label: 'Pipeline Architecture', icon: Network },
  { id: 'metrics', label: 'Key Data Metrics', icon: Activity },
]

const domainTone: Record<Project['domain'], 'accent' | 'green' | 'violet' | 'default'> = {
  Logistics: 'green',
  'E-commerce': 'accent',
  FinTech: 'violet',
  Governance: 'default',
}

function ProjectCard({ project, defaultOpen }: { project: Project; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const [tab, setTab] = useState<TabId>('challenge')

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-panel transition-colors hover:border-border-bright">
      {/* Card header - always visible, toggles expansion */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusDot tone={project.status === 'production' ? 'green' : 'cyan'} />
            <h3 className="text-base font-semibold text-ink sm:text-lg">
              {project.name}
            </h3>
            <Badge tone={domainTone[project.domain]}>{project.domain}</Badge>
          </div>
          <p className="mt-1 text-[11px] font-medium tracking-wide text-accent">
            {project.processingModel}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-dim">
            {project.tagline}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
        <ChevronDown
          className={clsx(
            'mt-1 size-5 shrink-0 text-ink-faint transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Expanded body - animated expand/collapse */}
      <div
        className={clsx(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
        <div className="border-t border-border">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-border bg-panel-2">
            {tabs.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={clsx(
                    'flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium transition-colors sm:text-sm',
                    tab === t.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-ink-faint hover:text-ink-dim',
                  )}
                >
                  <Icon className="size-3.5" />
                  {t.label}
                </button>
              )
            })}
          </div>

          <div key={tab} className="tab-fade p-5 sm:p-6">
            {tab === 'challenge' && (
              <div className="space-y-4">
                {project.challenge.map((para, i) => (
                  <p key={i} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-2/70" />
                    <span>{para}</span>
                  </p>
                ))}
              </div>
            )}

            {tab === 'architecture' && (
              <div>
                <pre className="ascii-diagram overflow-x-auto rounded border border-border bg-bg p-4 text-[11px] leading-none text-accent-2 sm:text-xs">
                  {project.architectureDiagram}
                </pre>
                <ul className="mt-4 space-y-2">
                  {project.architectureNotes.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                      <span className="text-xs font-semibold text-accent">[{i + 1}]</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'metrics' && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded border border-border bg-panel-2 p-4">
                    <p className="text-[11px] uppercase tracking-wider text-ink-faint">
                      {m.label}
                    </p>
                    <p className="mt-1 text-xl font-bold text-accent">{m.value}</p>
                    {m.detail && <p className="mt-1 text-xs text-ink-dim">{m.detail}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Action links */}
            <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
              >
                <GithubIcon className="size-4" /> View code
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <Section
      id="pipelines"
      variant="coral"
      title="Featured Pipelines & Architectures"
    >
      <p className="mb-8 max-w-3xl text-sm font-medium leading-relaxed text-[#232a31]/85">
        Four connected systems spanning the three processing models - batch, micro-batch, and
        real-time streaming - plus the governance layer that keeps their AI components safe.
        Click a card to inspect the architecture.
      </p>
      <div className="space-y-4">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 100}>
            <ProjectCard project={p} defaultOpen={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

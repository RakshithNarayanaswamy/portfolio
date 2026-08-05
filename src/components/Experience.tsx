import { useState } from 'react'
import clsx from 'clsx'
import { Briefcase, ChevronDown } from 'lucide-react'
import { experience, type ExperienceEntry } from '../data'
import { Badge, Section } from './ui'
import { Reveal } from './Reveal'

function ExperienceCard({ job, defaultOpen }: { job: ExperienceEntry; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="relative pl-12 sm:pl-14">
      {/* timeline node */}
      <span className="absolute left-0 top-1 flex size-8 items-center justify-center rounded-full border border-border-bright bg-panel sm:size-10">
        <Briefcase className="size-3.5 text-accent sm:size-4" />
      </span>

      <div className="overflow-hidden rounded-lg border border-border bg-panel transition-colors hover:border-border-bright">
        {/* Header - always visible, toggles expansion */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
          aria-expanded={open}
        >
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-ink sm:text-lg">
              {job.role} · <span className="text-accent">{job.company}</span>
            </h3>
            <p className="mt-1 text-xs font-medium tracking-wide text-ink-faint">
              {job.location} · {job.period}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((tech) => (
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

        {/* Expanded bullets - animated expand/collapse */}
        <div
          className={clsx(
            'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border p-5 sm:p-6">
              <ul className="space-y-3">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-2/70" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative space-y-8 before:absolute before:inset-y-2 before:left-[15px] before:w-px before:bg-border sm:before:left-[19px]">
        {experience.map((job, i) => (
          <Reveal key={job.id} delay={i * 100}>
            <ExperienceCard job={job} defaultOpen={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

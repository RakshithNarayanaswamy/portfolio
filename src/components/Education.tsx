import { BookOpen, GraduationCap } from 'lucide-react'
import { education } from '../data'
import { Section } from './ui'
import { Reveal } from './Reveal'

export function Education() {
  return (
    <Section id="education" title="Education" variant="coral">
      <div className="space-y-6">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 120}>
            <div className="rounded-lg border border-border bg-panel p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded border border-border-bright bg-panel-2 text-accent">
                    <GraduationCap className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-ink sm:text-lg">
                      {edu.school}
                    </h3>
                    <p className="text-sm text-ink-dim">{edu.degree}</p>
                    <p className="mt-0.5 text-xs font-medium tracking-wide text-ink-faint">
                      {edu.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium tracking-wide text-ink-faint">
                    {edu.period}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-accent-2">
                    Grade: {edu.grade}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                  <BookOpen className="size-4 text-accent" /> Coursework
                </p>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {edu.coursework.map((course) => (
                    <li key={course} className="flex gap-2.5 text-sm text-ink-dim">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/70" />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

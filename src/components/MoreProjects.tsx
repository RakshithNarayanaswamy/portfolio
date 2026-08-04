import { ExternalLink, FolderGit2 } from 'lucide-react'
import { moreProjects } from '../data'
import { Badge, GithubIcon, Section } from './ui'
import { Reveal } from './Reveal'

export function MoreProjects() {
  return (
    <Section
      id="more-projects"
      title="More Pipelines & Analytics"
    >
      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-ink-dim">
        Additional end-to-end projects across domains - city operations, healthcare streaming,
        aviation, finance, and supply chain - each with its own warehouse model, pipeline, and
        BI layer.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {moreProjects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 100} className="flex">
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="group flex w-full flex-col rounded-lg border border-border bg-panel p-5 transition-colors hover:border-accent/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <FolderGit2 className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
                <h3 className="truncate text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
              </div>
              <ExternalLink className="size-3.5 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-ink-dim">{p.description}</p>

            {p.highlight && (
              <p className="mt-2 border-l-2 border-accent-2/50 pl-3 text-[13px] leading-relaxed text-accent-2">
                {p.highlight}
              </p>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
              {p.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
              <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-ink-faint transition-colors group-hover:text-accent">
                <GithubIcon className="size-3.5" /> Repo
              </span>
            </div>
          </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

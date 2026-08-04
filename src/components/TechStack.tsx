import { techStack } from '../data'
import { Badge, Section } from './ui'

export function TechStack() {
  return (
    <Section id="stack" command="ls -la ./stack --group-by=layer" title="The Tech Stack">
      <div className="grid gap-4 md:grid-cols-2">
        {techStack.map((cat) => {
          const Icon = cat.icon
          return (
            <div
              key={cat.id}
              className="group rounded-lg border border-border bg-panel p-5 transition-colors hover:border-border-bright"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded border border-border-bright bg-panel-2 text-accent">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="font-mono text-base font-semibold text-ink">{cat.label}</h3>
                </div>
                <span className="font-mono text-[10px] tracking-widest text-ink-faint">
                  {cat.layer}
                </span>
              </div>

              <ul className="space-y-2.5">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent-2">▸</span>
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="font-mono text-sm font-medium text-ink">
                        {skill.name}
                      </span>
                      {skill.featured && <Badge tone="green">core</Badge>}
                      {skill.note && (
                        <span className="text-xs text-ink-faint">{skill.note}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

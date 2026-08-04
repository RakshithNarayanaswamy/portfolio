import { Award } from 'lucide-react'
import { certifications, techStack } from '../data'
import { Badge, Section } from './ui'
import { Reveal } from './Reveal'

/** Every skill, flattened for the marquee strip. */
const marqueeItems = techStack.flatMap((cat) =>
  cat.skills.map((s) => ({ name: s.name, logo: s.logo })),
)

/** Brand logo (self-hosted in public/logos); hides itself if missing. */
function SkillLogo({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}${src}`}
      alt=""
      loading="lazy"
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

function TechMarquee() {
  // Track is duplicated so the -50% translate loops seamlessly.
  const loop = [...marqueeItems, ...marqueeItems]
  return (
    <div className="mb-10 overflow-hidden rounded-lg border border-border bg-panel py-3.5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track gap-8">
        {loop.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-ink-dim">
            {item.logo ? (
              <SkillLogo src={item.logo} className="size-5 object-contain" />
            ) : (
              <span className="size-1.5 rounded-full bg-accent/70" />
            )}
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export function TechStack() {
  return (
    <Section id="stack" title="The Tech Stack">
      <TechMarquee />

      <div className="grid gap-4 md:grid-cols-2">
        {techStack.map((cat, ci) => {
          const Icon = cat.icon
          // Cards stay charcoal; the color pattern lives at section level
          const coral = false
          return (
            <Reveal key={cat.id} delay={ci * 120}>
              <div
                className={
                  coral
                    ? 'group h-full rounded-lg bg-accent p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30'
                    : 'group h-full rounded-lg border border-border bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border-bright hover:shadow-lg hover:shadow-black/30'
                }
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        coral
                          ? 'flex size-9 items-center justify-center rounded bg-[#232a31] text-accent transition-transform duration-300 group-hover:scale-110'
                          : 'flex size-9 items-center justify-center rounded border border-border-bright bg-panel-2 text-accent transition-transform duration-300 group-hover:scale-110'
                      }
                    >
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className={coral ? 'text-base font-bold text-[#232a31]' : 'text-base font-semibold text-ink'}>
                      {cat.label}
                    </h3>
                  </div>
                  <span
                    className={
                      coral
                        ? 'text-[10px] font-semibold tracking-widest text-[#232a31]/60'
                        : 'text-[10px] tracking-widest text-ink-faint'
                    }
                  >
                    {cat.layer}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="skill-row flex items-center gap-3">
                      {skill.logo ? (
                        <SkillLogo src={skill.logo} className="skill-arrow size-4 shrink-0 object-contain" />
                      ) : (
                        <span className={coral ? 'skill-arrow text-xs text-[#232a31]' : 'skill-arrow text-xs text-accent-2'}>▸</span>
                      )}
                      <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className={coral ? 'text-sm font-semibold text-[#232a31]' : 'text-sm font-medium text-ink'}>
                          {skill.name}
                        </span>
                        {skill.featured &&
                          (coral ? (
                            <span className="inline-flex items-center rounded bg-[#232a31] px-2 py-0.5 text-[11px] font-medium leading-5 text-accent-3">
                              core
                            </span>
                          ) : (
                            <Badge tone="green">core</Badge>
                          ))}
                        {skill.note && (
                          <span className={coral ? 'text-xs text-[#232a31]/70' : 'text-xs text-ink-faint'}>
                            {skill.note}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Certifications */}
      <Reveal delay={120}>
        <div className="mt-6 rounded-lg border border-border bg-panel p-5">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
            <Award className="size-4 text-accent" /> Licenses & Certifications
          </p>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex items-baseline gap-2.5 text-sm">
                <span className="mt-1 size-1.5 shrink-0 self-center rounded-full bg-accent-3/70" />
                <span className="text-ink">{cert.name}</span>
                <span className="text-xs text-ink-faint">{cert.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

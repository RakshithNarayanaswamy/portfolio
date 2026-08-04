import { useEffect, useState } from 'react'
import { ArrowDown, MapPin } from 'lucide-react'
import { identity, pipelineStages } from '../data'
import { Badge, StatusDot, TerminalPanel } from './ui'

/**
 * Animated SVG pipeline: 4 stage nodes connected by flowing dashed lines,
 * with packet dots traveling left → right and per-stage throughput counters.
 */
function PipelineVisualizer() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500)
    return () => clearInterval(id)
  }, [])

  // Deterministic pseudo-random throughput per stage per tick
  const throughput = (i: number) =>
    (12.4 + 3.1 * Math.abs(Math.sin(tick * 1.7 + i * 2.3))).toFixed(1)

  const nodeW = 150
  const nodeH = 64
  const gap = 56
  const totalW = pipelineStages.length * nodeW + (pipelineStages.length - 1) * gap
  const y = 40

  return (
    <TerminalPanel title="pipeline-topology — live simulation" className="grid-bg">
      <div className="overflow-x-auto p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${totalW} ${nodeH + 80}`}
          className="mx-auto block min-w-[520px]"
          role="img"
          aria-label="Animated data pipeline: ingestion to processing to storage to analytics"
        >
          {pipelineStages.map((stage, i) => {
            const x = i * (nodeW + gap)
            const colors = ['#22d3ee', '#34d399', '#a78bfa', '#fbbf24']
            const c = colors[i % colors.length]
            return (
              <g key={stage.id}>
                {/* connector to next node */}
                {i < pipelineStages.length - 1 && (
                  <>
                    <line
                      x1={x + nodeW}
                      y1={y + nodeH / 2}
                      x2={x + nodeW + gap}
                      y2={y + nodeH / 2}
                      stroke={c}
                      strokeWidth={1.5}
                      className="flow-line"
                      opacity={0.7}
                    />
                    {/* traveling packet */}
                    <circle r={3.5} fill={c}>
                      <animate
                        attributeName="cx"
                        values={`${x + nodeW};${x + nodeW + gap}`}
                        dur={`${0.9 + i * 0.15}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cy"
                        values={`${y + nodeH / 2};${y + nodeH / 2}`}
                        dur="1s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        dur={`${0.9 + i * 0.15}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}

                {/* node */}
                <rect
                  x={x}
                  y={y}
                  width={nodeW}
                  height={nodeH}
                  rx={8}
                  fill="#0f1420"
                  stroke={c}
                  strokeOpacity={0.55}
                  strokeWidth={1.5}
                  className="pulse-node"
                />
                <circle cx={x + 14} cy={y + 16} r={3} fill={c} className="pulse-node" />
                <text
                  x={x + 26}
                  y={y + 20}
                  fill="#c9d4e3"
                  fontSize={12}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                >
                  {stage.label}
                </text>
                <text
                  x={x + 14}
                  y={y + 40}
                  fill="#7b8aa1"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                >
                  {stage.sublabel}
                </text>
                <text
                  x={x + 14}
                  y={y + 55}
                  fill={c}
                  fontSize={9.5}
                  fontFamily="var(--font-mono)"
                >
                  ▸ {throughput(i)}k ev/s
                </text>

                {/* stage index below */}
                <text
                  x={x + nodeW / 2}
                  y={y + nodeH + 24}
                  fill="#4a5568"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                  textAnchor="middle"
                >
                  [{String(i + 1).padStart(2, '0')}]
                </text>
              </g>
            )
          })}
        </svg>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 font-mono text-[11px] text-ink-faint">
          <span className="flex items-center gap-2">
            <StatusDot tone="green" /> topology: healthy · 0 dead-letter events
          </span>
          <span>uptime 99.98% · simulated</span>
        </div>
      </div>
    </TerminalPanel>
  )
}

export function Hero() {
  return (
    <div id="top" className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 font-mono text-sm text-accent-2">
            <StatusDot tone="green" />
            {identity.title} — open to opportunities
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            {identity.headline}
            <span className="cursor-blink text-accent">_</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-dim">
            {identity.subheadline}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {identity.targetRoles.map((role) => (
              <Badge key={role} tone="accent">
                {role}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#pipelines"
              className="rounded border border-accent/50 bg-accent/10 px-5 py-2.5 font-mono text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
            >
              view pipelines →
            </a>
            <a
              href="#contact"
              className="rounded border border-border-bright px-5 py-2.5 font-mono text-sm text-ink-dim transition-colors hover:border-accent/40 hover:text-ink"
            >
              ./contact
            </a>
            <span className="flex items-center gap-1.5 font-mono text-xs text-ink-faint">
              <MapPin className="size-3.5" /> {identity.location}
            </span>
          </div>
        </div>

        <PipelineVisualizer />
      </div>

      {/* About */}
      <div className="mt-16 rounded-lg border border-border bg-panel/60 p-6 sm:p-8">
        <p className="mb-4 font-mono text-sm text-ink-faint">
          <span className="text-accent-2">$</span> cat ABOUT.md
        </p>
        <div className="space-y-4 text-[15px] leading-relaxed text-ink-dim">
          {identity.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <a href="#stack" aria-label="Scroll to tech stack">
          <ArrowDown className="size-5 animate-bounce text-ink-faint" />
        </a>
      </div>
    </div>
  )
}

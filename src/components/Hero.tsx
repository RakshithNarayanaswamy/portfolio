import { useEffect, useState } from 'react'
import { ArrowDown, MapPin } from 'lucide-react'
import { identity } from '../data'
import { Badge, TerminalPanel } from './ui'
import { Reveal } from './Reveal'

/**
 * Data engineering lifecycle topology:
 * GENERATION → INGESTION → TRANSFORMATION → SERVING → { ANALYTICS, AI }
 * with STORAGE underpinning ingestion → serving.
 */
/* One DMC color per element group - no repeats:
   brown = AI bar · fern = main stages · beige = storage ·
   khaki = outputs · tan = undercurrents */
/* Charcoal & Coral */
const C = {
  tan: '#e07856',
  khaki: '#e07856',
  beige: '#e07856',
  fern: '#e07856',
  brown: '#ef9273',
  panel: '#2a323b',
  ink: '#f4f2ef',
  dim: '#b9c0c7',
  faint: '#828d97',
}

const mainStages = [
  { label: 'GENERATION', sub: ['Source Systems'], color: C.fern },
  { label: 'INGESTION', sub: ['Batch · Stream · Micro-batch', 'Push vs Pull'], color: C.fern },
  { label: 'TRANSFORMATION', sub: ['Spark · dbt · Airflow'], color: C.fern },
  { label: 'SERVING', sub: ['Data'], color: C.fern },
] as const

const outputs = [
  { label: 'ANALYTICS', sub: 'Business Intelligence', color: C.khaki },
  { label: 'MACHINE LEARNING', sub: 'Forecasting · Anomaly Detection', color: C.khaki },
  { label: 'REVERSE ETL', sub: 'Warehouse → Operational Tools', color: C.khaki },
] as const

const undercurrents =
  'UNDERCURRENTS · Security · Data Management · DataOps · Data Architecture · Orchestration · Software Engineering'

function PipelineVisualizer() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500)
    return () => clearInterval(id)
  }, [])

  const throughput = (i: number) =>
    (12.4 + 3.1 * Math.abs(Math.sin(tick * 1.7 + i * 2.3))).toFixed(1)

  const nodeW = 250
  const nodeH = 116
  const gap = 56
  const step = nodeW + gap
  const mainEndX = mainStages.length * step - gap // right edge of SERVING
  const outX = mainEndX + 72
  const outW = 250
  const outH = 76
  const outGap = 22
  const totalW = outX + outW + 2
  // AI bar on top, spanning every stage - AI is used at every step now
  const aiY = 4
  const aiH = 52
  const y = aiY + aiH + 44 // main row
  const servingCenter = y + nodeH / 2
  const outStackH = outputs.length * outH + (outputs.length - 1) * outGap
  // centered on serving, but never overlapping the AI bar above
  const outY0 = Math.max(servingCenter - outStackH / 2, aiY + aiH + 18)
  const storageY = y + nodeH + 44
  const storageH = 52
  const ucY = Math.max(storageY + storageH, outY0 + outStackH) + 30
  const ucH = 54
  const totalH = ucY + ucH + 6

  return (
    <TerminalPanel title="DATA ENGINEERING LIFECYCLE - LIVE SIMULATION">
      <div className="overflow-x-auto p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${totalW} ${totalH}`}
          className="mx-auto block min-w-[760px]"
          role="img"
          aria-label="Data engineering lifecycle: generation, ingestion, transformation, serving into analytics, machine learning and reverse ETL, with AI across every stage, storage underneath, and undercurrents at the base"
        >
          {/* AI layer on top - spans the entire lifecycle */}
          <rect
            x={2}
            y={aiY}
            width={outX + outW - 2}
            height={aiH}
            rx={10}
            fill={C.panel}
            stroke={C.brown}
            strokeOpacity={0.6}
            strokeWidth={2}
            className="pulse-node"
          />
          <circle cx={totalW / 2 - 235} cy={aiY + aiH / 2} r={4} fill={C.brown} className="pulse-node" />
          <text
            x={totalW / 2}
            y={aiY + aiH / 2 + 6}
            fill={C.ink}
            fontSize={17}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            textAnchor="middle"
          >
            AI · Generative AI · Agentic AI · RAG · LLM
          </text>
          {/* AI connector down to the outputs column */}
          <line
            x1={outX + outW / 2}
            y1={aiY + aiH}
            x2={outX + outW / 2}
            y2={outY0}
            stroke={C.brown}
            strokeWidth={1.5}
            strokeDasharray="3 5"
            opacity={0.55}
          />

          {mainStages.map((stage, i) => {
            const x = i * step
            return (
              <g key={stage.label}>
                {/* dashed connector up to the AI layer - AI touches every stage */}
                <line
                  x1={x + nodeW / 2}
                  y1={aiY + aiH}
                  x2={x + nodeW / 2}
                  y2={y}
                  stroke={C.brown}
                  strokeWidth={1.5}
                  strokeDasharray="3 5"
                  opacity={0.55}
                />

                {/* connector to next main node */}
                {i < mainStages.length - 1 && (
                  <>
                    <line
                      x1={x + nodeW}
                      y1={y + nodeH / 2}
                      x2={x + step}
                      y2={y + nodeH / 2}
                      stroke={stage.color}
                      strokeWidth={2}
                      className="flow-line"
                      opacity={0.7}
                    />
                    <circle r={4.5} fill={stage.color}>
                      <animate
                        attributeName="cx"
                        values={`${x + nodeW};${x + step}`}
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
                  rx={10}
                  fill={C.panel}
                  stroke={stage.color}
                  strokeOpacity={0.75}
                  strokeWidth={2}
                  className="pulse-node"
                />
                <circle cx={x + 18} cy={y + 26} r={4} fill={stage.color} className="pulse-node" />
                <text x={x + 32} y={y + 32} fill={C.ink} fontSize={17} fontFamily="var(--font-mono)" fontWeight={700}>
                  {stage.label}
                </text>
                {stage.sub.map((line, li) => (
                  <text
                    key={li}
                    x={x + 18}
                    y={y + 58 + li * 18}
                    fill={C.dim}
                    fontSize={12.5}
                    fontFamily="var(--font-mono)"
                  >
                    {line}
                  </text>
                ))}
                <text x={x + 18} y={y + nodeH - 16} fill={stage.color} fontSize={13} fontFamily="var(--font-mono)">
                  ▸ {throughput(i)}k ev/s
                </text>
              </g>
            )
          })}

          {/* outputs: ANALYTICS + MACHINE LEARNING + REVERSE ETL */}
          {outputs.map((out, i) => {
            const oy = outY0 + i * (outH + outGap)
            const endY = oy + outH / 2
            const path = `M ${mainEndX} ${servingCenter} C ${mainEndX + 36} ${servingCenter}, ${outX - 36} ${endY}, ${outX} ${endY}`
            return (
              <g key={out.label}>
                <path d={path} fill="none" stroke={out.color} strokeWidth={2} className="flow-line" opacity={0.7} />
                <circle r={4.5} fill={out.color}>
                  <animateMotion dur={`${1.1 + i * 0.2}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${1.1 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
                <rect
                  x={outX}
                  y={oy}
                  width={outW}
                  height={outH}
                  rx={10}
                  fill={C.panel}
                  stroke={out.color}
                  strokeOpacity={0.75}
                  strokeWidth={2}
                  className="pulse-node"
                />
                <circle cx={outX + 18} cy={oy + 26} r={4} fill={out.color} className="pulse-node" />
                <text x={outX + 32} y={oy + 32} fill={C.ink} fontSize={16} fontFamily="var(--font-mono)" fontWeight={700}>
                  {out.label}
                </text>
                <text x={outX + 18} y={oy + 56} fill={C.dim} fontSize={12} fontFamily="var(--font-mono)">
                  {out.sub}
                </text>
              </g>
            )
          })}

          {/* STORAGE bar underpinning ingestion → serving */}
          <rect
            x={step}
            y={storageY}
            width={mainEndX - step}
            height={storageH}
            rx={10}
            fill={C.panel}
            stroke={C.beige}
            strokeOpacity={0.7}
            strokeWidth={2}
            className="pulse-node"
          />
          <text
            x={step + (mainEndX - step) / 2}
            y={storageY + storageH / 2 + 6}
            fill={C.ink}
            fontSize={16}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            textAnchor="middle"
          >
            STORAGE · Snowflake · Delta Lake · S3
          </text>
          {/* vertical connectors from ingestion/transformation/serving down to storage */}
          {[1, 2, 3].map((i) => (
            <line
              key={i}
              x1={i * step + nodeW / 2}
              y1={y + nodeH}
              x2={i * step + nodeW / 2}
              y2={storageY}
              stroke={C.dim}
              strokeWidth={1.5}
              strokeDasharray="3 5"
              opacity={0.6}
            />
          ))}

          {/* UNDERCURRENTS strip at the base */}
          <rect
            x={2}
            y={ucY}
            width={outX + outW - 2}
            height={ucH}
            rx={10}
            fill={C.panel}
            stroke={C.tan}
            strokeOpacity={0.6}
            strokeWidth={2}
            className="pulse-node"
          />
          <text
            x={totalW / 2}
            y={ucY + ucH / 2 + 6}
            fill={C.ink}
            fontSize={17}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            textAnchor="middle"
          >
            {undercurrents}
          </text>
        </svg>

      </div>
    </TerminalPanel>
  )
}

export function Hero() {
  return (
    <div id="top">
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24">
      {/* Headline + photo */}
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ink-dim">
            Hi, I'm
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Rakshith
          </h1>
          <p className="mt-3 text-2xl font-semibold text-accent-2 sm:text-3xl">
            {identity.title}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-dim">
            {identity.headline} -{' '}
            {identity.subheadline.charAt(0).toLowerCase() + identity.subheadline.slice(1)}
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
              className="rounded border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
            >
              View pipelines →
            </a>
            <a
              href="#contact"
              className="rounded border border-border-bright px-5 py-2.5 text-sm text-ink-dim transition-colors hover:border-accent/40 hover:text-ink"
            >
              Contact
            </a>
            <span className="flex items-center gap-1.5 text-xs text-ink-faint">
              <MapPin className="size-3.5" /> {identity.location}
            </span>
          </div>
        </div>

        {/* Profile photo - background-removed cutout over a circular backdrop */}
        <div className="mx-auto lg:mx-0">
          <div className="relative size-64 sm:size-80 lg:size-96">
            <div className="absolute inset-0 overflow-hidden rounded-full bg-accent ring-2 ring-accent-3/60 shadow-xl shadow-black/40">
              <img
                src={`${import.meta.env.BASE_URL}profile.png`}
                alt={identity.name}
                className="absolute bottom-0 left-1/2 w-[97%] max-w-none -translate-x-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      </div>

      {/* Coral band: charcoal cards with white text on a coral surface */}
      <div className="mt-16 bg-accent">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6">
          {/* About */}
          <Reveal>
          <div className="rounded-lg bg-panel p-6 shadow-xl shadow-black/20 sm:p-8">
            <h2 className="mb-4 text-lg font-bold text-ink">About</h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-ink-dim">
              {identity.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          </Reveal>

          {/* Data engineering lifecycle */}
          <Reveal delay={120}>
            <div className="mt-10">
              <PipelineVisualizer />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 flex justify-center py-10">
        <a href="#experience" aria-label="Scroll to experience">
          <ArrowDown className="size-5 animate-bounce text-ink-faint" />
        </a>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useRef, useState } from 'react'
import { dashboardMetrics, type DashboardMetric } from '../data'
import { Section, StatusDot, TerminalPanel } from './ui'

const HISTORY_LEN = 24
const TICK_MS = 1400

function nextValue(metric: DashboardMetric, prev: number): number {
  // Random walk that mean-reverts toward baseValue so numbers look alive
  // but never drift into nonsense.
  const jitterAbs = metric.baseValue * metric.jitter
  const pull = (metric.baseValue - prev) * 0.3
  const noise = (Math.random() - 0.5) * 2 * jitterAbs
  let v = prev + pull + noise
  if (metric.format === 'percent') v = Math.min(100, Math.max(0, v))
  return Math.max(0, v)
}

function formatValue(metric: DashboardMetric, v: number): string {
  switch (metric.format) {
    case 'integer':
      return Math.round(v).toLocaleString()
    case 'percent':
      return v.toFixed(metric.baseValue >= 99 ? 2 : 1)
    case 'decimal':
      return v.toFixed(1)
  }
}

function Sparkline({ history, color }: { history: number[]; color: string }) {
  const w = 120
  const h = 28
  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = max - min || 1
  const points = history
    .map((v, i) => {
      const x = (i / (HISTORY_LEN - 1)) * w
      const y = h - ((v - min) / range) * (h - 4) - 2
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} opacity={0.9} />
    </svg>
  )
}

function useSimulation() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(dashboardMetrics.map((m) => [m.id, m.baseValue])),
  )
  const historyRef = useRef<Record<string, number[]>>(
    Object.fromEntries(
      dashboardMetrics.map((m) => [m.id, Array(HISTORY_LEN).fill(m.baseValue)]),
    ),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) => {
        const next: Record<string, number> = {}
        for (const m of dashboardMetrics) {
          next[m.id] = nextValue(m, prev[m.id])
          const h = historyRef.current[m.id]
          h.push(next[m.id])
          if (h.length > HISTORY_LEN) h.shift()
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  return { values, history: historyRef.current }
}

export function Dashboard() {
  const { values, history } = useSimulation()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const colors = useMemo(
    () => ['#22d3ee', '#34d399', '#a78bfa', '#fbbf24', '#22d3ee', '#34d399'],
    [],
  )

  return (
    <Section
      id="dashboard"
      command="watch -n1 'pipectl status --all'"
      title="Live Data Metrics Dashboard"
    >
      <TerminalPanel title={`system-health · ${now.toLocaleTimeString()} · simulated feed`}>
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {dashboardMetrics.map((metric, i) => (
            <div key={metric.id} className="bg-panel p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  {metric.label}
                </p>
                <StatusDot tone={i % 3 === 0 ? 'cyan' : 'green'} />
              </div>
              <p className="mt-2 font-mono text-2xl font-bold text-ink tabular-nums">
                {formatValue(metric, values[metric.id])}
                <span className="ml-1.5 text-xs font-normal text-ink-faint">{metric.unit}</span>
              </p>
              {metric.sparkline && (
                <div className="mt-3">
                  <Sparkline history={history[metric.id]} color={colors[i % colors.length]} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-panel-2 px-5 py-3 font-mono text-[11px] text-ink-faint">
          <span className="flex items-center gap-2">
            <StatusDot tone="green" /> all systems nominal — 0 failed DAGs in last 24h
          </span>
          <span>
            refresh: {TICK_MS / 1000}s · source: simulation (swap in a real metrics API in
            data.ts)
          </span>
        </div>
      </TerminalPanel>
    </Section>
  )
}

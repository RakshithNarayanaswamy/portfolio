// ============================================================================
// CENTRAL DATA CONFIGURATION
// Every piece of content on the site lives here. Edit this file to update
// the portfolio — no component changes needed.
// ============================================================================

import type { LucideIcon } from 'lucide-react'
import { Code2, Database, Workflow, Cloud } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Identity {
  name: string
  title: string
  headline: string
  subheadline: string
  /** Short "about" paragraphs rendered in the hero/about area. */
  bio: string[]
  /** Roles being targeted — rendered as a rotating/tag list. */
  targetRoles: string[]
  location: string
}

export interface ContactInfo {
  email: string
  github: string
  githubHandle: string
  linkedin: string
  linkedinHandle: string
}

export interface TechCategory {
  id: string
  label: string
  /** The infrastructure layer this category represents. */
  layer: string
  icon: LucideIcon
  skills: TechSkill[]
}

export interface TechSkill {
  name: string
  /** Optional one-line note shown on hover / detail. */
  note?: string
  /** Highlight the skills you want to lead with. */
  featured?: boolean
}

export type ProjectDomain =
  | 'Logistics'
  | 'E-commerce'
  | 'FinTech'
  | 'Governance'

export interface ProjectMetric {
  label: string
  value: string
  detail?: string
}

export interface Project {
  id: string
  name: string
  domain: ProjectDomain
  processingModel: string
  tagline: string
  stack: string[]
  /** "The Challenge" tab content — paragraphs. */
  challenge: string[]
  /** "The Pipeline Architecture" tab — ASCII/monospace architecture diagram. */
  architectureDiagram: string
  /** Architecture explanation bullets rendered under the diagram. */
  architectureNotes: string[]
  /** "Key Data Metrics" tab content. */
  metrics: ProjectMetric[]
  links: {
    github: string
    /** Mock dashboard route/URL — replace with a live demo when available. */
    dashboard?: string
  }
  status: 'production' | 'active-dev' | 'planned'
}

export interface DashboardMetric {
  id: string
  label: string
  /** Base value the simulation jitters around. */
  baseValue: number
  unit: string
  /** How the number is displayed. */
  format: 'integer' | 'decimal' | 'percent'
  /** Simulation jitter as a fraction of baseValue (0.05 = ±5%). */
  jitter: number
  /** Render a sparkline of recent values. */
  sparkline?: boolean
  icon?: string
}

export interface CodeSnippet {
  id: string
  title: string
  description: string
  language: 'sql' | 'python' | 'yaml' | 'hcl' | 'bash'
  tags: string[]
  code: string
}

// ---------------------------------------------------------------------------
// Identity & contact
// ---------------------------------------------------------------------------

export const identity: Identity = {
  name: 'Rakshith Narayanaswamy',
  title: 'Data & AI Engineer',
  headline: 'Building scalable data infrastructure & real-time pipelines',
  subheadline:
    'Batch, micro-batch, and streaming systems on Snowflake, AWS, and GCP — with AI agents that explain, diagnose, and heal them, and governance layers that keep them safe.',
  bio: [
    'I build data platforms where AI does the repetitive, reactive work — diagnosing failures, explaining anomalies, narrating data quality — so engineers can focus on judgment: approving fixes, designing schemas, and setting guardrails.',
    'My core thesis: AI explains, deterministic logic decides. LLMs never gate a pipeline or compute a metric in my systems — they read the outputs of deterministic checks and turn them into plain-English reports, root-cause diagnoses, and tiered remediation drafts. That boundary is the difference between a self-healing pipeline and a 2am data-corruption incident.',
    'Currently at Northeastern University, building a four-project agentic data engineering portfolio spanning batch (Snowflake/dbt), micro-batch (AWS/Spark Structured Streaming), real-time streaming (Kafka/GCP), and a reusable AI governance layer for PII/PHI masking, RBAC, and audit logging.',
  ],
  targetRoles: [
    'Data Engineer',
    'Data Platform Engineer',
    'BI Engineer',
    'AI Engineer',
    'Agentic AI Engineer',
    'Gen AI Engineer',
    'Analytics Engineer',
    'Software Engineer',
  ],
  location: 'Boston, MA',
}

export const contact: ContactInfo = {
  email: 'narayanaswamy.rak@northeastern.edu',
  github: 'https://github.com/RakshithNarayanaswamy',
  githubHandle: 'RakshithNarayanaswamy',
  // TODO: replace with your actual LinkedIn URL
  linkedin: 'https://www.linkedin.com/in/rakshith-narayanaswamy',
  linkedinHandle: 'rakshith-narayanaswamy',
}

// ---------------------------------------------------------------------------
// Tech stack — grouped by infrastructure layer
// ---------------------------------------------------------------------------

export const techStack: TechCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    layer: 'LAYER 01 — CODE',
    icon: Code2,
    skills: [
      { name: 'Python', note: 'PySpark, pandas, API services, agents', featured: true },
      { name: 'SQL', note: 'Query optimization, window functions, dbt models', featured: true },
      { name: 'Go', note: 'CLI tooling & services' },
      { name: 'Scala', note: 'Spark internals' },
    ],
  },
  {
    id: 'storage',
    label: 'Storage / Warehouses',
    layer: 'LAYER 02 — STORAGE',
    icon: Database,
    skills: [
      { name: 'Snowflake', note: 'Stage + COPY INTO, incremental loads, credit optimization', featured: true },
      { name: 'BigQuery', note: 'Streaming inserts, partitioned tables', featured: true },
      { name: 'PostgreSQL', note: 'OLTP modeling, indexing' },
      { name: 'Delta Lake', note: 'ACID on the lake, time travel' },
      { name: 'S3 + Athena', note: 'Serverless lake, Parquet, pay-per-query' },
    ],
  },
  {
    id: 'orchestration',
    label: 'Orchestration & Processing',
    layer: 'LAYER 03 — COMPUTE',
    icon: Workflow,
    skills: [
      { name: 'Apache Airflow', note: 'DAG design, sensors, SLAs', featured: true },
      { name: 'dbt', note: 'Staging → intermediate → marts, schema tests, Kimball star schemas', featured: true },
      { name: 'Apache Spark', note: 'Structured Streaming, micro-batch triggers, 1M+ rows/day', featured: true },
      { name: 'Apache Kafka', note: 'Producers, consumer groups, partitions, backpressure' },
      { name: 'Apache Flink', note: 'Event-time streaming (evaluating)' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps / Cloud',
    layer: 'LAYER 04 — PLATFORM',
    icon: Cloud,
    skills: [
      { name: 'AWS', note: 'S3, Glue, Athena, Lambda, Redshift', featured: true },
      { name: 'GCP', note: 'Pub/Sub, BigQuery, Dataflow', featured: true },
      { name: 'Docker', note: 'Compose for Kafka + consumers, reproducible envs' },
      { name: 'Terraform', note: 'IaC for cloud resources' },
      { name: 'Kubernetes', note: 'Container orchestration' },
      { name: 'CI/CD', note: 'GitHub Actions — dbt tests + linting on push' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Featured projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'logistics-guardian',
    name: 'logistics-ai-quality-guardian-pipeline',
    domain: 'Logistics',
    processingModel: 'BATCH — 1M+ records/day',
    tagline:
      'Daily batch pipeline processing 1M+ shipment records through Airflow, PySpark, Snowflake, and dbt — with an AI quality guardian that narrates pipeline health and a metric assistant that interprets 7 core supply-chain KPIs.',
    stack: ['PySpark', 'Snowflake', 'dbt', 'Airflow', 'Docker', 'Claude API'],
    challenge: [
      'Supply-chain teams need OTIF, lead time, carrier performance, and stockout metrics computed daily over millions of shipment records — but silent data drift (null-rate spikes, schema changes, new categorical values) corrupts those metrics before anyone notices.',
      'The scale forces real engineering choices: Parquet over CSV, bulk PySpark generation over row-by-row inserts, Snowflake stage + COPY INTO over INSERT loops, and incremental dbt models partitioned by shipment date.',
      'The hard design question: where does AI belong? An LLM that gates the pipeline can hallucinate a green light. The answer — deterministic checks decide, AI explains.',
    ],
    architectureDiagram: `┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│  GENERATOR │──▶│  INGESTION │──▶│  SNOWFLAKE │──▶│    dbt     │
│  (PySpark) │   │  Parquet   │   │ stage+COPY │   │ stg→int→mrt│
└────────────┘   └────────────┘   └────────────┘   └─────┬──────┘
                                                          │
      ┌───────────────────────────────────────────────────┤
      ▼                                                   ▼
┌─────────────────┐  deterministic   ┌──────────────────────────┐
│ QUALITY CHECKS  │  checks decide   │  METRIC MARTS (7 KPIs)   │
│ row Δ · nulls · │─────────┐        │  OTIF · lead time ·      │
│ schema drift    │         │        │  carrier perf · stockout │
└─────────────────┘         ▼        └────────────┬─────────────┘
                    ┌──────────────┐              ▼
                    │  AI GUARDIAN │      ┌──────────────────┐
                    │ health report│      │ AI METRIC ASSIST │
                    │ (LLM writes, │      │ "OTIF fell 12%,  │
                    │  never gates)│      │  driver: WH-3"   │
                    └──────────────┘      └──────────────────┘`,
    architectureNotes: [
      'Airflow DAG orchestrates: extract → PySpark transform → Snowflake load → dbt build → quality checks → AI reports.',
      'Deterministic checks (row-count deltas, null-rate shifts, schema stability, new categories) gate the pipeline; the LLM only narrates pre-computed results — it never sees raw rows and never decides.',
      'A schema-drift injector deliberately breaks batches to prove the guardian catches drift before it corrupts metrics.',
    ],
    metrics: [
      { label: 'Records per batch', value: '1M+', detail: '~30M/month, partitioned by shipment_date' },
      { label: 'Load strategy', value: 'stage + COPY INTO', detail: 'vs row-by-row INSERT — orders of magnitude faster' },
      { label: 'Quality checks per run', value: '5 classes', detail: 'row Δ, null shift, schema, categories, type drift' },
      { label: 'KPIs surfaced', value: '7', detail: 'OTIF, lead time, carrier perf, stockouts, exceptions…' },
      { label: 'LLM gating decisions', value: '0', detail: 'by design — AI explains, deterministic logic decides' },
    ],
    links: {
      github: 'https://github.com/RakshithNarayanaswamy/logistics-ai-quality-guardian-pipeline',
      dashboard: '#dashboard',
    },
    status: 'active-dev',
  },
  {
    id: 'rootcause-agent',
    name: 'ecommerce-ai-rootcause-pipeline',
    domain: 'E-commerce',
    processingModel: 'MICRO-BATCH — Spark Structured Streaming',
    tagline:
      'Self-healing micro-batch pipeline on AWS: a root-cause agent reads failure logs, retrieves schema context via RAG, diagnoses drift, and applies tiered remediation — auto-fixing safe changes, drafting PRs for destructive ones.',
    stack: ['AWS S3/Glue/Athena', 'Spark Structured Streaming', 'Lambda', 'dbt', 'Claude API', 'RAG'],
    challenge: [
      'Micro-batch pipelines fail at 2am: a source system adds, renames, or retypes a column and downstream models break. Humans wake up, read logs, diff schemas, and patch — repetitive, reactive work an agent can do.',
      'But unbounded auto-fix is worse than no auto-fix: an agent that silently "repairs" a destructive schema change corrupts data quietly. The senior-level problem is drawing the safe/unsafe boundary.',
      'The agent must also reason with limited context — it cannot hold the whole warehouse in a prompt, so it retrieves only the schema, dbt model, and git history relevant to this specific failure.',
    ],
    architectureDiagram: `┌───────────┐  every few min  ┌──────────────┐   ┌──────────────┐
│  ORDERS   │────────────────▶│ MICRO-BATCH  │──▶│  S3 (Parquet)│
│ generator │  drift injector │ Spark Struct │   │  + Athena    │
└───────────┘   breaks batch  │  Streaming   │   └──────┬───────┘
                              └──────┬───────┘          │
                                     │ failure/drift    ▼
                              ┌──────▼───────┐   ┌──────────────┐
                              │   MONITOR    │   │  dbt models  │
                              │(Lambda trig.)│   └──────────────┘
                              └──────┬───────┘
              ┌──────────────────────┼──────────────────────┐
              ▼                      ▼                      ▼
      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
      │ 1. READ LOGS │─────▶│ 2. RAG:      │─────▶│ 3. DIAGNOSE  │
      │ Airflow/Glue │      │ schema + dbt │      │  root cause  │
      └──────────────┘      │ + git history│      └──────┬───────┘
                            └──────────────┘             │
                       ┌─────────────────────────────────┤
                       ▼ additive (safe)                 ▼ destructive
               ┌──────────────┐                  ┌──────────────┐
               │  AUTO-FIX    │                  │  DRAFT PR →  │
               │ log + notify │                  │ HUMAN GATE   │
               └──────────────┘                  └──────────────┘`,
    architectureNotes: [
      'Continuous monitor watches every micro-batch; on failure it triggers the agent via Lambda.',
      'RAG retrieval scopes context to the failing model only: current schema, dbt definition, recent git history.',
      'Tiered response: additive changes (new column) auto-fix with logging + notification; destructive/ambiguous changes (drop, rename, type change) produce a draft PR + plain-English explanation for human approval. Never auto-deploys a destructive change.',
      'Serverless cost control: S3 + Athena pay-per-query, no always-on clusters.',
    ],
    metrics: [
      { label: 'Detection cadence', value: 'every batch', detail: 'continuous monitor vs once-a-day inspection' },
      { label: 'Drift classes handled', value: '5', detail: 'add, drop, rename, type change, null spike' },
      { label: 'Auto-fix scope', value: 'additive only', detail: 'destructive changes always human-gated' },
      { label: 'RAG context window', value: 'failure-scoped', detail: 'schema + dbt model + git history for the broken model only' },
      { label: 'Always-on cluster cost', value: '$0', detail: 'serverless: S3 + Athena + Lambda' },
    ],
    links: {
      github: 'https://github.com/RakshithNarayanaswamy/Micro-batch-AI-root-cause-agent-pipeline',
      dashboard: '#dashboard',
    },
    status: 'active-dev',
  },
  {
    id: 'realtime-streaming',
    name: 'realtime-transaction-streaming-pipeline',
    domain: 'FinTech',
    processingModel: 'REAL-TIME STREAMING — event-by-event',
    tagline:
      'Kafka pipeline consuming live Coinbase WebSocket feeds at hundreds of events/sec into BigQuery — classical anomaly detection in the hot path, LLM explanation only on flagged events. You do not put an LLM in a per-event hot path.',
    stack: ['Kafka', 'Coinbase WebSocket', 'GCP Pub/Sub', 'BigQuery', 'Spark Structured Streaming', 'Claude API'],
    challenge: [
      'A live financial feed produces hundreds of events per second. The consumer must keep up — backpressure is real — and per-event processing must stay cheap, fast, and deterministic.',
      'Anomalies come in two flavors that demand different responses: genuine market moves (price spikes, volume surges) vs data-quality problems (malformed events, feed gaps, consumer lag). Telling them apart quickly matters.',
      'The architecture question: where does AI belong in a latency-sensitive system? Answer: on alerts, not on every event. Classical rolling z-scores and thresholds run in the hot path; the LLM is called only on the rare flagged event.',
    ],
    architectureDiagram: `┌────────────────┐   ┌─────────┐   ┌──────────────────────────┐
│ COINBASE WS    │──▶│  KAFKA  │──▶│  CONSUMER (hot path)     │
│ BTC-USD ticks  │   │ topic + │   │  rolling z-score ·      │
│ ~100s events/s │   │ parts   │   │  volume spikes ·        │
└────────────────┘   └─────────┘   │  feed-gap detection      │
                                   └────────┬────────┬────────┘
                                   every    │        │ rare:
                                   event    ▼        ▼ flagged only
                              ┌──────────────┐  ┌──────────────────┐
                              │   BIGQUERY   │  │ COOL PATH (LLM)  │
                              │  streaming   │  │ "BTC moved 4.2%  │
                              │   inserts    │  │  in 90s on 6×    │
                              └──────────────┘  │  volume — market │
                                                │  event, not a    │
                                                │  data error."    │
                                                └──────────────────┘`,
    architectureNotes: [
      'Hot path (every event, no AI): rolling z-score, volume-spike thresholds, feed-gap detection — fast, cheap, deterministic.',
      'Cool path (flagged events only): LLM explains the anomaly in plain language and triages market-event vs data-quality problem. Runs rarely, so token cost stays negligible.',
      'Scale-up path: plain Python consumer → Spark Structured Streaming reading from Kafka for windowed aggregations at volume.',
      'Serverless sink: Pub/Sub + BigQuery streaming inserts — no always-on cluster; resources torn down after demo runs.',
    ],
    metrics: [
      { label: 'Event throughput', value: '100s/sec', detail: 'live Coinbase WebSocket feed' },
      { label: 'Hot-path LLM calls', value: '0', detail: 'by design — classical detection on every event' },
      { label: 'Cool-path trigger rate', value: '<0.1%', detail: 'LLM invoked only on flagged anomalies' },
      { label: 'Detection methods', value: 'z-score + thresholds', detail: 'rolling windows, volume spikes, feed gaps' },
      { label: 'Anomaly triage', value: '2-class', detail: 'market event vs data-quality problem' },
    ],
    links: {
      github: 'https://github.com/RakshithNarayanaswamy/realtime-transaction-streaming-pipeline',
      dashboard: '#dashboard',
    },
    status: 'active-dev',
  },
  {
    id: 'governance-layer',
    name: 'ai-governance-layer',
    domain: 'Governance',
    processingModel: 'REUSABLE MODULE — wraps every LLM call',
    tagline:
      'A reusable governance module the other pipelines import before any LLM interaction: PII/PHI masking, per-agent RBAC scoping, and immutable audit logging. Guardrails built before agents are turned on — not patched in after.',
    stack: ['Python', 'Tokenization/Pseudonymization', 'RBAC', 'Audit Logging', 'Synthetic PHI'],
    challenge: [
      'Agentic pipelines send data to LLM providers. Without controls, PII and PHI land in provider request logs — a HIPAA violation regardless of intent. The scariest failures are silent ones.',
      'Governance retrofitted after agents ship is always leakier than governance built first. Yet almost no portfolio (or team) builds the guardrail layer before the agents.',
      'The module must be reusable — mask → scope → audit as an importable component that any pipeline calls before an LLM interaction — not copy-pasted logic per project.',
    ],
    architectureDiagram: `           PIPELINE (P2 root-cause agent · P3 anomaly explainer)
                              │
                              ▼  before ANY LLM call
        ┌─────────────────────────────────────────────────┐
        │              AI GOVERNANCE LAYER                │
        │                                                 │
        │  ┌───────────┐   ┌───────────┐   ┌───────────┐  │
        │  │ 1. MASK   │──▶│ 2. RBAC   │──▶│ 3. AUDIT  │  │
        │  │ tokenize  │   │ scope to  │   │ immutable │  │
        │  │ PII / PHI │   │ task-only │   │ who/what/ │  │
        │  │ pre-prompt│   │ tables    │   │ when/why  │  │
        │  └───────────┘   └───────────┘   └───────────┘  │
        └────────────────────────┬────────────────────────┘
                                 ▼
                          ┌────────────┐
                          │  LLM API   │  ← sees tokens,
                          │  (Claude)  │    never raw PII/PHI
                          └────────────┘

   datasets: financial PII (P3 stream) · fully-synthetic PHI (HIPAA)`,
    architectureNotes: [
      'Masking is the centerpiece: tokenize/pseudonymize PII/PHI before any data reaches an LLM prompt — the #1 preventive control.',
      'RBAC scopes each agent to only the tables its task needs (least privilege). The root-cause agent reads its failure context and nothing more.',
      'Immutable audit log records every AI data access — required by HIPAA and financial regulators.',
      'PHI dataset is fully synthetic by design — never real or scraped patient data. Future work: a prompt-injection test harness that hides malicious instructions in data and verifies agent refusal.',
    ],
    metrics: [
      { label: 'Raw PII reaching LLMs', value: '0 fields', detail: 'tokenized before every prompt' },
      { label: 'Compliance regimes', value: 'HIPAA + PCI/GLBA', detail: 'synthetic PHI + financial PII' },
      { label: 'Access model', value: 'least privilege', detail: 'per-agent, task-scoped RBAC' },
      { label: 'Audit coverage', value: '100%', detail: 'every AI data access logged immutably' },
      { label: 'Integration cost', value: '1 import', detail: 'mask → scope → audit as a module' },
    ],
    links: {
      github: 'https://github.com/RakshithNarayanaswamy/ai-governance-layer',
    },
    status: 'active-dev',
  },
]

// ---------------------------------------------------------------------------
// Live dashboard simulation config
// ---------------------------------------------------------------------------

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 'rows-per-sec',
    label: 'Rows Processed / sec',
    baseValue: 14200,
    unit: 'rows/s',
    format: 'integer',
    jitter: 0.18,
    sparkline: true,
  },
  {
    id: 'dag-success',
    label: 'DAG Execution Success Rate',
    baseValue: 99.8,
    unit: '%',
    format: 'percent',
    jitter: 0.001,
    sparkline: true,
  },
  {
    id: 'active-clusters',
    label: 'Active Warehouse Clusters',
    baseValue: 3,
    unit: 'clusters',
    format: 'integer',
    jitter: 0.34,
  },
  {
    id: 'kafka-lag',
    label: 'Kafka Consumer Lag',
    baseValue: 42,
    unit: 'msgs',
    format: 'integer',
    jitter: 0.9,
    sparkline: true,
  },
  {
    id: 'p95-latency',
    label: 'p95 Event Latency',
    baseValue: 184,
    unit: 'ms',
    format: 'integer',
    jitter: 0.25,
    sparkline: true,
  },
  {
    id: 'freshness',
    label: 'Data Freshness SLA',
    baseValue: 99.2,
    unit: '%',
    format: 'percent',
    jitter: 0.002,
  },
]

// ---------------------------------------------------------------------------
// Blog / snippets
// ---------------------------------------------------------------------------

export const snippets: CodeSnippet[] = [
  {
    id: 'dbt-incremental',
    title: 'Incremental dbt model with late-arriving data window',
    description:
      'Full-refresh on a 365M-row table burns credits. Incremental with a 3-day lookback handles late-arriving shipments without reprocessing the year.',
    language: 'sql',
    tags: ['dbt', 'Snowflake', 'optimization'],
    code: `{{
  config(
    materialized='incremental',
    unique_key='shipment_id',
    incremental_strategy='merge',
    cluster_by=['shipment_date']
  )
}}

select
    shipment_id,
    carrier_name,
    warehouse_id,
    order_date,
    promised_delivery_date,
    actual_delivery_date,
    -- OTIF: on time AND in full
    (actual_delivery_date <= promised_delivery_date
      and quantity_delivered >= quantity_ordered) as is_otif,
    datediff('day', order_date, actual_delivery_date) as lead_time_days
from {{ ref('stg_shipments') }}

{% if is_incremental() %}
  -- 3-day lookback window catches late-arriving records
  -- without full-refreshing 365M rows
  where shipment_date >= (
    select dateadd('day', -3, max(shipment_date)) from {{ this }}
  )
{% endif %}`,
  },
  {
    id: 'snowflake-copy',
    title: 'Snowflake bulk load: stage + COPY INTO, never row-by-row',
    description:
      'Loading 1M+ Parquet rows per day. Row-by-row INSERT takes hours and burns credits; staged COPY INTO takes seconds.',
    language: 'sql',
    tags: ['Snowflake', 'ingestion', 'performance'],
    code: `-- 1. Stage the daily Parquet batch (partitioned by load date)
PUT file://data/raw/shipments_2026-08-04.parquet
    @shipments_stage/2026-08-04/
    AUTO_COMPRESS = FALSE;

-- 2. Bulk load with schema-on-read — seconds, not hours
COPY INTO raw.shipments
FROM @shipments_stage/2026-08-04/
FILE_FORMAT = (TYPE = PARQUET)
MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE
ON_ERROR = ABORT_STATEMENT;  -- fail loud: partial loads
                             -- corrupt downstream metrics

-- 3. Verify before dbt runs (deterministic gate, not an LLM)
SELECT count(*) AS loaded_rows,
       count_if(shipment_id IS NULL) AS null_keys
FROM raw.shipments
WHERE load_date = '2026-08-04';`,
  },
  {
    id: 'spark-microbatch',
    title: 'Spark Structured Streaming micro-batch trigger',
    description:
      'Micro-batch is Structured Streaming’s native model. Trigger intervals give near-real-time cadence without per-event streaming cost.',
    language: 'python',
    tags: ['PySpark', 'streaming', 'AWS'],
    code: `orders_stream = (
    spark.readStream
    .schema(order_schema)          # explicit schema: schema-on-read
    .format("parquet")             # drift is a *detected* event,
    .load("s3://lake/landing/")    # never a silent one
)

query = (
    orders_stream
    .withWatermark("order_ts", "10 minutes")
    .groupBy(window("order_ts", "5 minutes"), "fulfilment_center_id")
    .agg(
        count("order_id").alias("orders"),
        sum("quantity" * "unit_price").alias("gmv"),
    )
    .writeStream
    .trigger(processingTime="5 minutes")   # micro-batch cadence
    .option("checkpointLocation", "s3://lake/checkpoints/orders/")
    .foreachBatch(write_and_run_quality_checks)  # deterministic
    .start()                                     # checks gate here
)`,
  },
  {
    id: 'terraform-pubsub',
    title: 'Terraform: serverless streaming sink (Pub/Sub → BigQuery)',
    description:
      'No always-on cluster: Pub/Sub per-message pricing plus a BigQuery subscription. Tear down with one command after demos.',
    language: 'hcl',
    tags: ['Terraform', 'GCP', 'IaC'],
    code: `resource "google_pubsub_topic" "transactions" {
  name = "crypto-transactions"

  message_retention_duration = "86400s" # 24h replay window
}

resource "google_bigquery_table" "transactions_raw" {
  dataset_id = google_bigquery_dataset.streaming.dataset_id
  table_id   = "transactions_raw"

  time_partitioning {
    type  = "DAY"
    field = "event_ts" # partition pruning keeps scans cheap
  }
}

# BigQuery subscription: Pub/Sub writes straight to the table.
# No Dataflow job, no cluster, nothing to babysit at 2am.
resource "google_pubsub_subscription" "to_bq" {
  name  = "transactions-to-bq"
  topic = google_pubsub_topic.transactions.id

  bigquery_config {
    table            = "\${google_bigquery_table.transactions_raw.project}.\${google_bigquery_table.transactions_raw.dataset_id}.\${google_bigquery_table.transactions_raw.table_id}"
    use_table_schema = true
  }
}`,
  },
]

// ---------------------------------------------------------------------------
// Hero pipeline visualizer config
// ---------------------------------------------------------------------------

export interface PipelineStage {
  id: string
  label: string
  sublabel: string
}

export const pipelineStages: PipelineStage[] = [
  { id: 'ingestion', label: 'INGESTION', sublabel: 'Kafka · WebSocket · S3' },
  { id: 'processing', label: 'PROCESSING', sublabel: 'Spark · dbt · Airflow' },
  { id: 'storage', label: 'STORAGE', sublabel: 'Snowflake · BigQuery' },
  { id: 'analytics', label: 'ANALYTICS', sublabel: 'Metrics · AI Reports' },
]

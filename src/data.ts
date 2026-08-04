// ============================================================================
// CENTRAL DATA CONFIGURATION
// Every piece of content on the site lives here. Edit this file to update
// the portfolio - no component changes needed.
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
  /** Roles being targeted - rendered as a rotating/tag list. */
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
  /** Logo image URL (simple-icons / devicon CDN). Text-only when omitted. */
  logo?: string
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
  /** "The Challenge" tab content - paragraphs. */
  challenge: string[]
  /** "The Pipeline Architecture" tab - ASCII/monospace architecture diagram. */
  architectureDiagram: string
  /** Architecture explanation bullets rendered under the diagram. */
  architectureNotes: string[]
  /** "Key Data Metrics" tab content. */
  metrics: ProjectMetric[]
  links: {
    github: string
  }
  status: 'production' | 'active-dev' | 'planned'
}

// ---------------------------------------------------------------------------
// Identity & contact
// ---------------------------------------------------------------------------

export const identity: Identity = {
  name: 'Rakshith Narayanaswamy',
  title: 'Data & AI Engineer',
  headline: 'Building scalable data infrastructure & real-time pipelines',
  subheadline:
    'Batch, micro-batch, and streaming systems on Snowflake, AWS, and GCP - with AI agents that explain, diagnose, and heal them, and governance layers that keep them safe.',
  bio: [
    'I build data platforms where AI does the repetitive, reactive work - diagnosing failures, explaining anomalies, narrating data quality - so engineers can focus on judgment: approving fixes, designing schemas, and setting guardrails.',
    'My core thesis: AI explains, deterministic logic decides. LLMs never gate a pipeline or compute a metric in my systems - they read the outputs of deterministic checks and turn them into plain-English reports, root-cause diagnoses, and tiered remediation drafts. That boundary is the difference between a self-healing pipeline and a 2am data-corruption incident.',
    'I hold an M.S. in Computer Science from Northeastern University (May 2026), where I built a four-project agentic data engineering portfolio spanning batch (Snowflake/dbt), micro-batch (AWS/Spark Structured Streaming), real-time streaming (Kafka/GCP), and a reusable AI governance layer for PII/PHI masking, RBAC, and audit logging.',
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
  location: 'United States',
}

export const contact: ContactInfo = {
  email: 'narayanaswamy.rak@northeastern.edu',
  github: 'https://github.com/RakshithNarayanaswamy',
  githubHandle: 'RakshithNarayanaswamy',
  linkedin: 'https://www.linkedin.com/in/rakshith-n-214a4425a/',
  linkedinHandle: 'rakshith-n-214a4425a',
}

// ---------------------------------------------------------------------------
// Tech stack - grouped by infrastructure layer
// ---------------------------------------------------------------------------

export const techStack: TechCategory[] = [
  {
    id: 'languages',
    label: 'Programming',
    layer: 'LAYER 01 - CODE',
    icon: Code2,
    skills: [
      { name: 'Python', logo: 'logos/python.svg', note: 'PySpark, pandas, NumPy, scikit-learn', featured: true },
      { name: 'SQL', note: 'CTEs, window functions, query optimization', featured: true },
      { name: 'Apache Spark', logo: 'logos/apachespark.svg', note: 'Structured Streaming, 2M+ daily records', featured: true },
      { name: 'Scala', logo: 'logos/scala.svg', note: 'Akka Typed, Spark' },
      { name: 'Java', logo: 'logos/java.svg' },
    ],
  },
  {
    id: 'storage',
    label: 'Data Platforms & Warehouses',
    layer: 'LAYER 02 - STORAGE',
    icon: Database,
    skills: [
      { name: 'Snowflake', logo: 'logos/snowflake.svg', note: 'Gold-layer optimization, materialized views, COPY INTO', featured: true },
      { name: 'Databricks', logo: 'logos/databricks.svg', note: 'Medallion Delta Lake (Bronze → Silver → Gold)', featured: true },
      { name: 'AWS', logo: 'logos/aws.svg', note: 'S3, Redshift, Glue, Athena, DMS', featured: true },
      { name: 'Azure', logo: 'logos/azure.svg', note: 'Data Factory, ADLS, Azure SQL' },
      { name: 'PostgreSQL', logo: 'logos/postgresql.svg', note: 'OLTP modeling, indexing' },
    ],
  },
  {
    id: 'orchestration',
    label: 'Orchestration & Processing',
    layer: 'LAYER 03 - COMPUTE',
    icon: Workflow,
    skills: [
      { name: 'Apache Airflow', logo: 'logos/airflow.svg', note: 'DAG design, MWAA, event-driven workflows', featured: true },
      { name: 'dbt', logo: 'logos/dbt.svg', note: '200+ star-schema tables, automated quality checks', featured: true },
      { name: 'Apache Kafka', logo: 'logos/kafka.svg', note: 'Streaming ingestion, nested JSON parsing', featured: true },
      { name: 'SSIS', note: 'SQL Server integration workflows' },
      { name: 'Data Modelling', note: 'Kimball star schemas, SCD Type 2/4, conformed dimensions' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps, BI & AI',
    layer: 'LAYER 04 - PLATFORM',
    icon: Cloud,
    skills: [
      { name: 'Docker & Kubernetes', logo: 'logos/docker.svg', note: 'Reproducible environments, container orchestration' },
      { name: 'CI/CD', logo: 'logos/githubactions.svg', note: 'GitHub Actions across dev, staging, production', featured: true },
      { name: 'Power BI & Tableau', note: 'DAX, KPI dashboards, executive reporting' },
      { name: 'ER/Studio & Alteryx', note: 'Data modeling, profiling, workflow automation' },
      { name: 'LLM / AI-ML', note: 'RAG, anomaly detection, predictive modeling, governance' },
    ],
  },
]

export interface Certification {
  name: string
  issuer: string
}

export const certifications: Certification[] = [
  { name: 'AWS Data Engineer', issuer: 'AWS' },
  { name: 'AWS Cloud Practitioner Essentials', issuer: 'AWS' },
  { name: 'AWS Certified Data Engineer Associate - Hands On!', issuer: 'Udemy' },
  { name: 'Advanced Data Engineering with Snowflake', issuer: 'Snowflake' },
  { name: 'Academy Accreditation - Databricks Fundamentals', issuer: 'Databricks' },
  { name: 'ETL and Data Pipelines with Shell, Airflow and Kafka', issuer: 'IBM' },
  { name: 'Microsoft Power BI', issuer: 'Microsoft' },
  { name: 'Google Data Analytics', issuer: 'Google' },
  { name: 'Workato Foundations Level 1', issuer: 'Workato' },
  { name: 'Deloitte Australia - Data Analytics Job Simulation', issuer: 'Forage' },
]

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export interface Education {
  school: string
  degree: string
  period: string
  grade: string
  coursework: string[]
}

export const education: Education = {
  school: 'Northeastern University',
  degree: 'Master of Science, Computer Science',
  period: 'Sep 2024 - May 2026',
  grade: '3.7/4',
  coursework: [
    'Designing Advance Data Architectures for Business Intelligence',
    'Data Management and Database Design',
    'Big Data Systems Engineering',
    'Agentic AI',
    'Theory and Practical Applications of Generative AI',
    'Program Structure and Algorithms',
    'Object Oriented Programming using Java',
    'Web Design and User Experience',
  ],
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  location: string
  period: string
  bullets: string[]
  stack: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'neu-ta',
    role: 'Graduate Teaching Assistant',
    company: 'Northeastern University',
    location: 'Boston, MA',
    period: '01/2026 - 05/2026',
    bullets: [
      'Supported 30+ graduate students in building and debugging scalable pipelines, guiding PySpark, SQL, schema design, and data validation across Azure, Databricks, and Snowflake, enabling students to deliver functional pipelines.',
    ],
    stack: ['PySpark', 'SQL', 'Azure', 'Databricks', 'Snowflake'],
  },
  {
    id: 'betsol',
    role: 'Data Engineer',
    company: 'Betsol',
    location: 'Bengaluru, India',
    period: '02/2024 - 08/2024',
    bullets: [
      'Developed ETL data pipelines using Azure Data Factory and Databricks to replace full-load batch jobs with CDC-based loads of medical claims and billing data, cutting daily ingestion time by 60%.',
      'Engineered Spark Structured Streaming pipelines ingesting 2M+ daily records using Kafka, parsing nested JSON into a Medallion Delta Lake, enabling faster detection of systemic issues.',
      'Optimized Snowflake Gold-layer performance by building pre-aggregated tables with CTEs, window functions, and materialized views, supporting ad-hoc reporting and cutting analyst dashboard load times.',
      'Applied data governance and security standards using RBAC and data masking for PHI and PII fields across Electronic Health Records and billing datasets, ensuring standard analytical roles received masked outputs.',
      'Profiled large-scale healthcare and billing datasets in Snowflake using advanced SQL, CTEs, and window functions to identify corrupted records and schema anomalies, improving data accuracy by 20%.',
      'Automated extraction of telephony call data with Python and ran EDA to identify patterns in call outcomes and hold times, helping contact center managers optimize workflows and reduce average handle time.',
      'Designed and maintained weekly refreshed Power BI dashboards tracking billing cycle and network performance KPIs, delivering actionable insights to cross-functional stakeholder teams.',
      'Applied NLP and text mining on 5M+ customer transcripts and operational records, identifying recurring issue patterns across enterprise clients and reducing manual ticket categorization effort by 15%.',
    ],
    stack: ['Azure Data Factory', 'Databricks', 'Spark Streaming', 'Kafka', 'Snowflake', 'RBAC'],
  },
  {
    id: 'justmac',
    role: 'Data Engineer',
    company: 'JUSTMAC',
    location: 'Bengaluru, India',
    period: '05/2023 - 01/2024',
    bullets: [
      'Built a daily batch ELT orchestrated by MWAA, running PySpark jobs in AWS Glue to transform raw data through Bronze, Silver, and Gold layers, automating daily delivery and ensuring data consistency across teams.',
      'Designed 200+ tables across star schema models with dbt on Redshift, implementing automated data quality checks to enforce referential integrity and enabling self-service BI.',
      'Developed CI/CD workflows with GitHub Actions to promote version-controlled pipeline code across development, staging, and production environments, enabling automated deployments.',
      'Migrated 100M+ records from SQL Server databases to an S3 data lake using DMS, supporting the transition to cloud infrastructure.',
      'Conducted root cause analysis on 100K+ support tickets using SQL and Python, correlating incident spikes with product release cycles to separate isolated defects from systemic outages and enabling faster engineering escalation.',
      'Built Power BI dashboards consolidating ticket status, SLA breach exposure, and resolution velocity across client accounts, replacing manual weekly reports and enabling leadership to act on service health issues.',
      'Analyzed helpdesk KPIs (MTTR, CSAT, FCR, AHT) and forecasted weekly ticket inflow using Python, presenting findings to operations leadership that supported staffing decisions and reduced SLA breach incidents by 20%.',
    ],
    stack: ['MWAA / Airflow', 'AWS Glue', 'PySpark', 'dbt', 'Redshift', 'GitHub Actions', 'DMS'],
  },
  {
    id: 'bosch',
    role: 'Data Analyst',
    company: 'BOSCH',
    location: 'Bengaluru, India',
    period: '05/2022 - 05/2023',
    bullets: [
      'Built ETL/ELT pipelines moving 30M+ records from SAP and MES into ADLS, cleaning raw data and using SQL to trace defective components to their source batch, enabling faster root-cause analysis.',
      'Wrote Python scripts that automated extraction and cleaning of supply-chain data and flagged components nearing run-out, cutting manual reporting effort by 30% and giving planners a 12-24 hour head start before line stoppages.',
      'Built Power BI dashboards tracking material movement and supplier delivery delays, giving logistics teams visibility into material availability and flagging underperforming vendors and inventory risks.',
      'Performed statistical analysis of material transit times to flag drifting logistics processes before line stops, contributing to a 14% reduction in late deliveries.',
      'Profiled IoT sensor data streamed into data lakes, using Python anomaly-detection scripts, translating raw machine signals into actionable maintenance insights that reduced unplanned downtime.',
      'Developed Tableau dashboards integrating production output, downtime, and maintenance records, cutting 6+ hours of weekly manual reporting and accelerating loss elimination decisions.',
    ],
    stack: ['SQL', 'Python', 'ADLS', 'SAP/MES', 'Power BI'],
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
    processingModel: 'BATCH - 1M+ records/day',
    tagline:
      'Daily batch pipeline processing 1M+ shipment records through Airflow, PySpark, Snowflake, and dbt - with an AI quality guardian that narrates pipeline health and a metric assistant that interprets 7 core supply-chain KPIs.',
    stack: ['PySpark', 'Snowflake', 'dbt', 'Airflow', 'Docker', 'Claude API'],
    challenge: [
      'Supply-chain teams need OTIF, lead time, carrier performance, and stockout metrics computed daily over millions of shipment records - but silent data drift (null-rate spikes, schema changes, new categorical values) corrupts those metrics before anyone notices.',
      'The scale forces real engineering choices: Parquet over CSV, bulk PySpark generation over row-by-row inserts, Snowflake stage + COPY INTO over INSERT loops, and incremental dbt models partitioned by shipment date.',
      'The hard design question: where does AI belong? An LLM that gates the pipeline can hallucinate a green light. The answer - deterministic checks decide, AI explains.',
    ],
    architectureDiagram: `┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│  GENERATOR │──▶│  INGESTION │──▶│  SNOWFLAKE │──▶│    dbt     │
│  (PySpark) │   │  Parquet   │   │ stage+COPY │   │ stg→int→mrt│
└────────────┘   └────────────┘   └────────────┘   └─────┬──────┘
                                                         │ 
      ┌──────────────────────────────────────────────────┤
      ▼                                                  ▼
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
      'Deterministic checks (row-count deltas, null-rate shifts, schema stability, new categories) gate the pipeline; the LLM only narrates pre-computed results - it never sees raw rows and never decides.',
      'A schema-drift injector deliberately breaks batches to prove the guardian catches drift before it corrupts metrics.',
    ],
    metrics: [
      { label: 'Records per batch', value: '1M+', detail: '~30M/month, partitioned by shipment_date' },
      { label: 'Load strategy', value: 'stage + COPY INTO', detail: 'vs row-by-row INSERT - orders of magnitude faster' },
      { label: 'Quality checks per run', value: '5 classes', detail: 'row Δ, null shift, schema, categories, type drift' },
      { label: 'KPIs surfaced', value: '7', detail: 'OTIF, lead time, carrier perf, stockouts, exceptions…' },
      { label: 'LLM gating decisions', value: '0', detail: 'by design - AI explains, deterministic logic decides' },
    ],
    links: {
      github: 'https://github.com/RakshithNarayanaswamy/logistics-ai-quality-guardian-pipeline',
    },
    status: 'active-dev',
  },
  {
    id: 'rootcause-agent',
    name: 'ecommerce-ai-rootcause-pipeline',
    domain: 'E-commerce',
    processingModel: 'MICRO-BATCH - Spark Structured Streaming',
    tagline:
      'Self-healing micro-batch pipeline on AWS: a root-cause agent reads failure logs, retrieves schema context via RAG, diagnoses drift, and applies tiered remediation - auto-fixing safe changes, drafting PRs for destructive ones.',
    stack: ['AWS S3/Glue/Athena', 'Spark Structured Streaming', 'Lambda', 'dbt', 'Claude API', 'RAG'],
    challenge: [
      'Micro-batch pipelines fail at 2am: a source system adds, renames, or retypes a column and downstream models break. Humans wake up, read logs, diff schemas, and patch - repetitive, reactive work an agent can do.',
      'But unbounded auto-fix is worse than no auto-fix: an agent that silently "repairs" a destructive schema change corrupts data quietly. The senior-level problem is drawing the safe/unsafe boundary.',
      'The agent must also reason with limited context - it cannot hold the whole warehouse in a prompt, so it retrieves only the schema, dbt model, and git history relevant to this specific failure.',
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
    },
    status: 'active-dev',
  },
  {
    id: 'realtime-streaming',
    name: 'realtime-transaction-streaming-pipeline',
    domain: 'FinTech',
    processingModel: 'REAL-TIME STREAMING - event-by-event',
    tagline:
      'Kafka pipeline consuming live Coinbase WebSocket feeds at hundreds of events/sec into BigQuery - classical anomaly detection in the hot path, LLM explanation only on flagged events. You do not put an LLM in a per-event hot path.',
    stack: ['Kafka', 'Coinbase WebSocket', 'GCP Pub/Sub', 'BigQuery', 'Spark Structured Streaming', 'Claude API'],
    challenge: [
      'A live financial feed produces hundreds of events per second. The consumer must keep up - backpressure is real - and per-event processing must stay cheap, fast, and deterministic.',
      'Anomalies come in two flavors that demand different responses: genuine market moves (price spikes, volume surges) vs data-quality problems (malformed events, feed gaps, consumer lag). Telling them apart quickly matters.',
      'The architecture question: where does AI belong in a latency-sensitive system? Answer: on alerts, not on every event. Classical rolling z-scores and thresholds run in the hot path; the LLM is called only on the rare flagged event.',
    ],
    architectureDiagram: `┌────────────────┐   ┌─────────┐   ┌──────────────────────────┐
│ COINBASE WS    │──▶│  KAFKA  │──▶│  CONSUMER (hot path)     │
│ BTC-USD ticks  │   │ topic + │   │  rolling z-score ·       │
│ ~100s events/s │   │ parts   │   │  volume spikes ·         │
└────────────────┘   └─────────┘   │  feed-gap detection      │
                                   └────────┬────────┬────────┘
                                   every    │        │ rare:
                                   event    ▼        ▼ flagged only
                              ┌──────────────┐  ┌──────────────────┐
                              │   BIGQUERY   │  │ COOL PATH (LLM)  │
                              │  streaming   │  │ "BTC moved 4.2%  │
                              │   inserts    │  │  in 90s on 6×    │
                              └──────────────┘  │  volume - market │
                                                │  event, not a    │
                                                │  data error."    │
                                                └──────────────────┘`,
    architectureNotes: [
      'Hot path (every event, no AI): rolling z-score, volume-spike thresholds, feed-gap detection - fast, cheap, deterministic.',
      'Cool path (flagged events only): LLM explains the anomaly in plain language and triages market-event vs data-quality problem. Runs rarely, so token cost stays negligible.',
      'Scale-up path: plain Python consumer → Spark Structured Streaming reading from Kafka for windowed aggregations at volume.',
      'Serverless sink: Pub/Sub + BigQuery streaming inserts - no always-on cluster; resources torn down after demo runs.',
    ],
    metrics: [
      { label: 'Event throughput', value: '100s/sec', detail: 'live Coinbase WebSocket feed' },
      { label: 'Hot-path LLM calls', value: '0', detail: 'by design - classical detection on every event' },
      { label: 'Cool-path trigger rate', value: '<0.1%', detail: 'LLM invoked only on flagged anomalies' },
      { label: 'Detection methods', value: 'z-score + thresholds', detail: 'rolling windows, volume spikes, feed gaps' },
      { label: 'Anomaly triage', value: '2-class', detail: 'market event vs data-quality problem' },
    ],
    links: {
      github: 'https://github.com/RakshithNarayanaswamy/realtime-transaction-streaming-pipeline',
    },
    status: 'active-dev',
  },
  {
    id: 'governance-layer',
    name: 'ai-governance-layer',
    domain: 'Governance',
    processingModel: 'REUSABLE MODULE - wraps every LLM call',
    tagline:
      'A reusable governance module the other pipelines import before any LLM interaction: PII/PHI masking, per-agent RBAC scoping, and immutable audit logging. Guardrails built before agents are turned on - not patched in after.',
    stack: ['Python', 'Tokenization/Pseudonymization', 'RBAC', 'Audit Logging', 'Synthetic PHI'],
    challenge: [
      'Agentic pipelines send data to LLM providers. Without controls, PII and PHI land in provider request logs - a HIPAA violation regardless of intent. The scariest failures are silent ones.',
      'Governance retrofitted after agents ship is always leakier than governance built first. Yet almost no portfolio (or team) builds the guardrail layer before the agents.',
      'The module must be reusable - mask → scope → audit as an importable component that any pipeline calls before an LLM interaction - not copy-pasted logic per project.',
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
      'Masking is the centerpiece: tokenize/pseudonymize PII/PHI before any data reaches an LLM prompt - the #1 preventive control.',
      'RBAC scopes each agent to only the tables its task needs (least privilege). The root-cause agent reads its failure context and nothing more.',
      'Immutable audit log records every AI data access - required by HIPAA and financial regulators.',
      'PHI dataset is fully synthetic by design - never real or scraped patient data. Future work: a prompt-injection test harness that hides malicious instructions in data and verifies agent refusal.',
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
// More projects - compact grid of additional GitHub work
// ---------------------------------------------------------------------------

export interface MoreProject {
  id: string
  name: string
  description: string
  highlight?: string
  stack: string[]
  github: string
}

export const moreProjects: MoreProject[] = [
  {
    id: 'supply-chain-analytics',
    name: 'Supply-chain-analytics',
    description:
      'End-to-end analytics platform on 180K+ orders (DataCo dataset) - from raw profiling in Excel/Alteryx through Snowflake SQL and Python predictive modeling to AI-generated prescriptive recommendations.',
    highlight:
      'Uncovered $3.8M in loss orders, a 100%-late First Class shipping failure, and 70% customer churn risk ($35.3M revenue at stake).',
    stack: ['Python', 'Snowflake', 'Alteryx', 'LLM (Groq)', 'Power BI'],
    github: 'https://github.com/RakshithNarayanaswamy/Supply-chain-analytics',
  },
  {
    id: 'air-traffic-landing',
    name: 'AirTrafficLandingAnalytics',
    description:
      'Scala analytics system over 44.5K SFO landing records (1999-2025, 175 airlines): Akka Typed actor architecture computes 6-month moving-average baselines, forecasts landing volumes, and flags >30% anomalies.',
    stack: ['Scala', 'Akka Typed', 'Apache Spark', 'ScalaTest'],
    github: 'https://github.com/RakshithNarayanaswamy/AirTrafficLandingAnalytics',
  },
  {
    id: 'consumer-credit',
    name: 'Consumer-credit-analytics',
    description:
      'Layered analytics pipeline over Federal Reserve G.19 consumer credit data: descriptive, diagnostic, predictive, and prescriptive stages with time-series forecasting of revolving vs non-revolving credit.',
    stack: ['Python', 'pandas', 'Time-series', 'Statistical modeling'],
    github: 'https://github.com/RakshithNarayanaswamy/Consumer-credit-analytics',
  },
  {
    id: 'healthcare-airflow',
    name: 'healthcare-airflow-pipeline',
    description:
      'Streaming healthcare pipeline: patient vitals (heart rate, SpO₂, BP, alerts) flow through a Bronze → Silver → Gold Medallion lakehouse on Databricks, orchestrated by Airflow with event-driven Kafka notifications.',
    stack: ['Databricks', 'Airflow', 'Kafka', 'Medallion Architecture'],
    github: 'https://github.com/RakshithNarayanaswamy/healthcare-airflow-pipeline',
  },
  {
    id: 'seattle-pet-license',
    name: 'Seattle-Pet-License-Pipeline-and-Analysis',
    description:
      'Cloud warehouse pipeline for Seattle open pet-license data: Azure Data Factory ingestion into a Kimball star schema on SQL Server/Snowflake, powering trend, geography, and seasonality dashboards.',
    stack: ['Azure Data Factory', 'Snowflake', 'Star schema', 'Tableau'],
    github: 'https://github.com/RakshithNarayanaswamy/Seattle-Pet-License-Pipeline-and-Analysis',
  },
  {
    id: 'kc-311',
    name: 'KansasCity-work-Pipeline-and-analysis',
    description:
      'City-operations analytics for Kansas City 311 requests: Alteryx profiling into Azure SQL staging with lineage fields, SCD Type 4 dimensions (current + history), and BI answering ten business questions on response times and workload.',
    stack: ['Azure SQL', 'Alteryx', 'SCD Type 4', 'Power BI'],
    github: 'https://github.com/RakshithNarayanaswamy/KansasCity-work-Pipeline-and-analysis',
  },
  {
    id: 'la-crime',
    name: 'LA-Crime-Pipeline-and-Analytics',
    description:
      'Bronze-Silver-Gold pipeline over LA reported-crime data with dimensional warehouse modeling - analyzing how time, location, demographics, weapons, and arrest outcomes shape public-safety patterns.',
    stack: ['Medallion Architecture', 'Dimensional modeling', 'SQL', 'BI dashboards'],
    github: 'https://github.com/RakshithNarayanaswamy/LA-Crime-Pipeline-and-Analytics',
  },
  {
    id: 'food-inspection',
    name: 'Food-Quality-Inspection-analysis',
    description:
      'Multi-city food-inspection analytics (Chicago + Dallas open data): heterogeneous schemas standardized through a Medallion pipeline with SCD Type 2 history tracking and public-health BI dashboards.',
    stack: ['Medallion Architecture', 'SCD Type 2', 'Power BI', 'Tableau'],
    github: 'https://github.com/RakshithNarayanaswamy/Food-Quality-Inspection-analysis',
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

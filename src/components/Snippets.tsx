import { useState } from 'react'
import clsx from 'clsx'
import { Check, Copy, FileCode2 } from 'lucide-react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import hcl from 'react-syntax-highlighter/dist/esm/languages/prism/hcl'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('sql', sql)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('hcl', hcl)
SyntaxHighlighter.registerLanguage('bash', bash)
import { snippets } from '../data'
import { Badge, Section, TerminalPanel } from './ui'

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 rounded border border-border-bright px-2.5 py-1 font-mono text-[11px] text-ink-dim transition-colors hover:border-accent/40 hover:text-accent"
      aria-label="Copy snippet"
    >
      {copied ? <Check className="size-3 text-accent-2" /> : <Copy className="size-3" />}
      {copied ? 'copied' : 'copy'}
    </button>
  )
}

export function Snippets() {
  const [active, setActive] = useState(snippets[0].id)
  const snippet = snippets.find((s) => s.id === active) ?? snippets[0]

  return (
    <Section
      id="snippets"
      command="grep -r 'optimization' ./notes"
      title="Architecture Notes & Snippets"
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Snippet index */}
        <div className="space-y-2">
          {snippets.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={clsx(
                'w-full rounded border p-3.5 text-left transition-colors',
                s.id === active
                  ? 'border-accent/40 bg-accent/5'
                  : 'border-border bg-panel hover:border-border-bright',
              )}
            >
              <div className="flex items-start gap-2.5">
                <FileCode2
                  className={clsx(
                    'mt-0.5 size-4 shrink-0',
                    s.id === active ? 'text-accent' : 'text-ink-faint',
                  )}
                />
                <div className="min-w-0">
                  <p
                    className={clsx(
                      'font-mono text-xs font-semibold leading-snug',
                      s.id === active ? 'text-ink' : 'text-ink-dim',
                    )}
                  >
                    {s.title}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active snippet */}
        <TerminalPanel title={`${snippet.id}.${snippet.language}`}>
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
            <p className="text-sm leading-relaxed text-ink-dim">{snippet.description}</p>
            <CopyButton code={snippet.code} />
          </div>
          <SyntaxHighlighter
            language={snippet.language}
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: 'var(--color-bg)',
              fontSize: '12.5px',
              padding: '1.25rem',
            }}
            showLineNumbers
            lineNumberStyle={{ color: 'var(--color-ink-faint)', minWidth: '2.2em' }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </TerminalPanel>
      </div>
    </Section>
  )
}

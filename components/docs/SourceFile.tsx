import { readFile } from 'node:fs/promises'
import nodePath from 'node:path'

type SourceFileProps = {
  path?: string
  markdownFilePath?: string
  language?: string
  title?: string
}

const languageByExtension = {
  '.css': 'css',
  '.js': 'javascript',
  '.jsx': 'jsx',
  '.json': 'json',
  '.md': 'markdown',
  '.mdx': 'mdx',
  '.ts': 'typescript',
  '.tsx': 'tsx'
}

const rootAliases = {
  '$': 'components',
  '@': 'src'
}

const allowedRoots = ['app', 'components', 'content', 'src']

export const SourceFile = async ({
  path,
  markdownFilePath,
  language,
  title
}: SourceFileProps) => {
  const relativePath = path ?? markdownFilePath

  if (!relativePath) {
    throw new Error('`SourceFile` requires either a `path` or `markdownFilePath` prop.')
  }

  const normalizedPath = relativePath.replace(/\\/g, '/')
  const aliasedPath = normalizedPath.replace(
    /^([$@])(?=\/|$)/,
    (_, alias) => rootAliases[alias]
  )
  const matchedRoot = allowedRoots.find(
    root => aliasedPath === root || aliasedPath.startsWith(`${root}/`)
  )

  if (!matchedRoot) {
    throw new Error(
      `\`SourceFile\` only supports files inside: ${allowedRoots.join(', ')}.`
    )
  }

  const relativeWithinRoot = aliasedPath.slice(matchedRoot.length).replace(/^\/+/, '')
  const normalizedWithinRoot = nodePath.normalize(relativeWithinRoot)

  if (normalizedWithinRoot.startsWith('..')) {
    throw new Error('`SourceFile` path cannot escape the allowed directory.')
  }

  const absolutePath = nodePath.join(
    /* turbopackIgnore: true */ process.cwd(),
    matchedRoot,
    normalizedWithinRoot
  )
  const source = await readFile(absolutePath, 'utf8')
  const detectedLanguage =
    language || languageByExtension[nodePath.extname(absolutePath).toLowerCase()] || 'text'

  return (
    <section
      style={{
        margin: '1.5rem 0',
        border: '1px solid #27272a',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#09090b',
        color: '#f4f4f5'
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.875rem 1rem',
          borderBottom: '1px solid #3f3f46',
          fontSize: '0.9rem'
        }}
      >
        <strong>{title || relativePath}</strong>
        <span style={{ color: '#a1a1aa' }}>{detectedLanguage}</span>
      </header>
      <pre
        style={{
          margin: 0,
          padding: '1rem',
          overflowX: 'auto',
          fontSize: '0.9rem',
          lineHeight: 1.6
        }}
      >
        <code>{source}</code>
      </pre>
    </section>
  )
}

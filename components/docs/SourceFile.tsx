import { readFile } from 'node:fs/promises'
import nodePath from 'node:path'
import { codeToHtml } from 'shiki'
import { SourceFileFrame } from '$/docs/SourceFileFrame'

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

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const renderFallbackHtml = (source: string, themeMode: 'light' | 'dark') =>
  [
    `<pre class="shiki" style="background-color:${themeMode === 'dark' ? '#0d1117' : '#ffffff'};color:${themeMode === 'dark' ? '#e6edf3' : '#24292f'}" tabindex="0">`,
    source
      .split('\n')
      .map(line => `<span class="line"><span>${escapeHtml(line) || ' '}</span></span>`)
      .join(''),
    '</pre>'
  ].join('')

const renderHighlightedHtml = async (
  source: string,
  language: string,
  theme: 'github-light' | 'github-dark'
) =>
  codeToHtml(source, {
    lang: language,
    theme
  }).catch(() => renderFallbackHtml(source, theme === 'github-dark' ? 'dark' : 'light'))

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
  const [lightHtml, darkHtml] = await Promise.all([
    renderHighlightedHtml(source, detectedLanguage, 'github-light'),
    renderHighlightedHtml(source, detectedLanguage, 'github-dark')
  ])

  return (
    <SourceFileFrame
      title={title || relativePath}
      language={detectedLanguage}
      lightHtml={lightHtml}
      darkHtml={darkHtml}
    />
  )
}

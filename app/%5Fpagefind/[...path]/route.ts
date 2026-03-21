import { readFile } from 'node:fs/promises'
import path from 'node:path'

const PAGEFIND_ROOT = path.join(process.cwd(), '.pagefind')

const CONTENT_TYPES: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pagefind': 'application/octet-stream',
  '.pf_fragment': 'application/octet-stream',
  '.pf_index': 'application/octet-stream',
  '.pf_meta': 'application/octet-stream',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm'
}

const toSafeRelativePath = (segments: string[]) => {
  const normalized = path.posix.normalize(`/${segments.join('/')}`)

  if (normalized.includes('\0') || normalized.includes('..')) {
    return null
  }

  return normalized.slice(1)
}

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params
  const relativePath = toSafeRelativePath(segments)

  if (!relativePath) {
    return new Response('Not Found', { status: 404 })
  }

  const filePath = path.join(PAGEFIND_ROOT, relativePath)

  try {
    const file = await readFile(filePath)
    const ext = path.extname(filePath)

    return new Response(file, {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
        'content-type': CONTENT_TYPES[ext] ?? 'application/octet-stream'
      }
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}

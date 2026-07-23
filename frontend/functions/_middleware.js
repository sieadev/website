/**
 * Markdown for Agents — serve text/markdown when requested via Accept header.
 * https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
export async function onRequest(context) {
  const { request, next, env } = context
  const accept = request.headers.get('Accept') || ''

  if (!accept.includes('text/markdown')) {
    return next()
  }

  const url = new URL(request.url)
  let pathname = url.pathname

  if (pathname === '/' || pathname === '') {
    pathname = '/index.md'
  } else if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1) + '.md'
  } else if (!pathname.endsWith('.md')) {
    pathname = pathname + '.md'
  }

  try {
    const assetUrl = new URL(pathname, url.origin)
    const asset = await env.ASSETS.fetch(assetUrl)

    if (!asset.ok) {
      return next()
    }

    const body = await asset.text()
    const tokens = Math.max(1, Math.ceil(body.length / 4))

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(tokens),
        'Vary': 'Accept',
        'Cache-Control': 'public, max-age=300',
      },
    })
  } catch {
    return next()
  }
}

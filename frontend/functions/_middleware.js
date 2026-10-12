/**
 * Markdown for Agents — serve text/markdown when requested via Accept header.
 * https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 *
 * App routes — public/404.html turns off Pages' own single-page fallback, so a direct
 * load of /projects would be a 404. Serve the app for its routes instead.
 */
const APP_ROUTES = ['/projects', '/journey', '/contact', '/tos']

export async function onRequest(context) {
  const { request, next, env } = context
  const accept = request.headers.get('Accept') || ''
  const url = new URL(request.url)

  if (accept.includes('text/markdown')) {
    const markdown = await serveMarkdown(url, env)
    if (markdown) return markdown
  }

  const response = await next()
  if (response.status !== 404 || !['GET', 'HEAD'].includes(request.method)) {
    return response
  }

  const pathname = url.pathname.replace(/\/+$/, '')
  if (!(await isAppRoute(pathname, url, env))) {
    return response
  }

  const app = await env.ASSETS.fetch(new URL('/', url.origin))
  if (!app.ok) {
    return response
  }
  return new Response(request.method === 'HEAD' ? null : app.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}

/** A project page exists when its content file does, so new projects need no change here. */
async function isAppRoute(pathname, url, env) {
  if (APP_ROUTES.includes(pathname)) return true
  const project = pathname.match(/^\/projects\/([a-z0-9-]+)$/)
  if (!project) return false
  const content = await env.ASSETS.fetch(new URL(`/content/projects/${project[1]}.md`, url.origin))
  return content.ok
}

async function serveMarkdown(url, env) {
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
      return null
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
    return null
  }
}

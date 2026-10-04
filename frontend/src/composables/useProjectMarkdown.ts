import { nextTick, ref, watch, type Ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import kotlin from 'highlight.js/lib/languages/kotlin'

hljs.registerLanguage('java', java)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('kotlin', kotlin)

export type MarkdownState = 'loading' | 'ready' | 'error'

/**
 * Fetches /content/projects/<slug>.md, renders it to sanitized HTML and, once the
 * caller has mounted it into `container`, highlights code and adds copy buttons.
 */
export function useProjectMarkdown(slug: Ref<string | undefined>, container: Ref<HTMLElement | null>) {
  const html = ref('')
  const state = ref<MarkdownState>('loading')
  let request = 0

  async function load() {
    if (!slug.value) return
    // Ignore responses that arrive after the user has already moved to another project
    const current = ++request
    state.value = 'loading'
    html.value = ''
    try {
      const res = await fetch(`/content/projects/${slug.value}.md`)
      if (current !== request) return
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      // Vite's SPA fallback answers unknown paths with index.html
      if ((res.headers.get('content-type') ?? '').includes('text/html')) throw new Error('Not markdown')
      const raw = await marked.parse(await res.text())
      if (current !== request) return
      html.value = DOMPurify.sanitize(raw, { ADD_ATTR: ['class'] })
      state.value = 'ready'
      await nextTick()
      enhance()
    } catch {
      if (current === request) state.value = 'error'
    }
  }

  function enhance() {
    const root = container.value
    if (!root) return
    root.querySelectorAll<HTMLElement>('pre code').forEach((el) => {
      if (!el.dataset.highlighted) hljs.highlightElement(el)
    })
    root.querySelectorAll('pre').forEach((pre) => {
      if (pre.parentElement?.classList.contains('code-block')) return
      const wrapper = document.createElement('div')
      wrapper.className = 'code-block'
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'code-copy'
      btn.textContent = 'Copy'
      btn.setAttribute('aria-label', 'Copy code to clipboard')
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? '')
          btn.textContent = 'Copied'
        } catch {
          btn.textContent = 'Copy failed'
        }
        setTimeout(() => (btn.textContent = 'Copy'), 2000)
      })
      wrapper.appendChild(btn)
    })
  }

  watch(slug, load, { immediate: true })

  return { html, state, reload: load }
}

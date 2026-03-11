<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.min.css'
import '@/assets/hljs-dark.css'
import { mdiGithub, mdiBookOpenPageVariant, mdiArrowLeft, mdiContentCopy } from '@mdi/js'
import { projects } from '@/data/projects'

const route = useRoute()
const router = useRouter()

const slug = computed(() => route.params.slug as string)
const project = computed(() => projects.find(p => p.slug === slug.value))

const content = ref('')
const loading = ref(true)
const error = ref(false)
const markdownBody = ref<HTMLElement | null>(null)

async function loadMarkdown() {
  if (!slug.value) return
  loading.value = true
  error.value = false
  try {
    const res = await fetch(`/content/projects/${slug.value}.md`)
    if (!res.ok) throw new Error('Not found')
    const text = await res.text()
    const rawHtml = await marked.parse(text)
    content.value = DOMPurify.sanitize(rawHtml, { ADD_ATTR: ['class'] })
    loading.value = false
    await nextTick()
    await nextTick()
    highlightCode()
  } catch {
    error.value = true
    content.value = ''
  } finally {
    loading.value = false
  }
}

function highlightCode() {
  if (!markdownBody.value) return
  markdownBody.value.querySelectorAll<HTMLElement>('pre code').forEach((el) => {
    hljs.highlightElement(el)
  })
  injectCopyButtons()
}

function injectCopyButtons() {
  if (!markdownBody.value) return
  const pres = markdownBody.value.querySelectorAll('pre')
  pres.forEach((pre) => {
    if (pre.closest('.code-block-wrapper')) return
    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'code-copy-btn'
    btn.setAttribute('aria-label', 'Copy code')
    btn.innerHTML = `<svg viewBox="0 0 24 24" class="code-copy-icon"><path fill="currentColor" d="${mdiContentCopy}"/></svg><span class="code-copy-text">Copy</span>`
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')
      const text = code?.textContent ?? ''
      try {
        await navigator.clipboard.writeText(text)
        const span = btn.querySelector('.code-copy-text')
        if (span) {
          span.textContent = 'Copied!'
          setTimeout(() => { span.textContent = 'Copy' }, 2000)
        }
      } catch {
        const span = btn.querySelector('.code-copy-text')
        if (span) span.textContent = 'Copy'
      }
    })
    wrapper.appendChild(btn)
  })
}

watch(slug, loadMarkdown, { immediate: true })

watch(content, () => {
  if (content.value) {
    nextTick().then(() => nextTick()).then(() => highlightCode())
  }
}, { flush: 'post' })

function goBack() {
  router.push({ name: 'Projects' })
}
</script>

<template>
  <div class="project-detail">
    <template v-if="project">
      <div class="detail-nav">
        <button
          type="button"
          class="back-btn"
          @click="goBack"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path :d="mdiArrowLeft" fill="currentColor" />
          </svg>
          Back to projects
        </button>
      </div>

      <div class="project-banner-image">
        <img
          :src="project.image"
          :alt="project.name"
        />
      </div>

      <header class="project-header">
        <h1 class="project-title">{{ project.name }}</h1>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-tags">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        <div class="project-actions">
          <a
            v-if="project.docs"
            :href="project.docs"
            target="_blank"
            rel="noopener"
            class="action-link"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path :d="mdiBookOpenPageVariant" fill="currentColor" />
            </svg>
            Docs
          </a>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener"
            class="action-link"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path :d="mdiGithub" fill="currentColor" />
            </svg>
            GitHub
          </a>
        </div>
      </header>

      <div class="detail-content">
        <div v-if="loading" class="loading">Loading…</div>
        <div v-else-if="error" class="error">Could not load project content.</div>
        <article
          v-else
          ref="markdownBody"
          class="prose prose-neutral dark:prose-invert max-w-none project-markdown"
          v-html="content"
        />
      </div>
    </template>

    <template v-else>
      <div class="detail-back">
        <button type="button" class="back-btn" @click="goBack">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path :d="mdiArrowLeft" fill="currentColor" />
          </svg>
          Back to projects
        </button>
      </div>
      <div class="detail-content">
        <p class="text-muted-foreground">Project not found.</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.project-detail {
  min-height: 100vh;
}

/* Back button: separate nav row, left, no box */
.detail-nav {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem clamp(1.5rem, 4vw, 2rem) 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: hsl(var(--muted-foreground));
  background: none;
  border: none;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.back-btn:hover {
  color: hsl(var(--foreground));
}

/* Banner: image fills the box */
.project-banner-image {
  width: 100%;
  max-width: 800px;
  margin: 1.5rem auto 0;
  aspect-ratio: 21 / 9;
  border-radius: 0.75rem;
  overflow: hidden;
  background: hsl(var(--muted) / 0.5);
}

.project-banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Header: title, description, tags, links - no box */
.project-header {
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(1.25rem, 3vw, 1.75rem) clamp(1.5rem, 4vw, 2rem) 0;
}

.project-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 0.5rem;
  color: hsl(var(--foreground));
}

.project-description {
  font-size: 1rem;
  line-height: 1.6;
  color: hsl(var(--muted-foreground));
  margin: 0 0 0.75rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tag {
  padding: 0.35rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 9999px;
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  color: hsl(var(--muted-foreground));
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.action-link:hover {
  color: hsl(var(--foreground));
}

.detail-back {
  border-bottom: 1px solid hsl(var(--border));
  background: hsl(var(--background));
}

.detail-content {
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 2rem);
}

.loading,
.error {
  font-size: 1rem;
}

.loading {
  color: hsl(var(--muted-foreground));
}

.error {
  color: hsl(var(--destructive));
}

/* Markdown content */
.project-markdown :deep(h2) {
  @apply text-2xl font-bold mt-10 mb-4;
}
.project-markdown :deep(h3) {
  @apply text-xl font-bold mt-6 mb-3;
}
.project-markdown :deep(p) {
  @apply mb-4 text-muted-foreground leading-relaxed;
}
.project-markdown :deep(ul) {
  @apply list-disc pl-6 mb-4 space-y-1;
}
.project-markdown :deep(ol) {
  @apply list-decimal pl-6 mb-4 space-y-1;
}
.project-markdown :deep(:not(pre) > code) {
  @apply px-1.5 py-0.5 rounded bg-muted text-sm font-mono;
}
.project-markdown :deep(pre) {
  @apply rounded-lg overflow-hidden mb-4;
  padding: 0;
  background: transparent;
  border: none;
}
.project-markdown :deep(pre code) {
  @apply block text-sm overflow-x-auto p-4 rounded-lg;
  font-family: ui-monospace, monospace;
}
.project-markdown :deep(pre code.hljs) {
  /* Theme sets background; no extra layer */
}

/* Single box: wrapper only for copy button positioning */
.project-markdown :deep(.code-block-wrapper) {
  position: relative;
  margin-bottom: 1rem;
}
.project-markdown :deep(.code-block-wrapper > pre) {
  margin-bottom: 0;
}
.project-markdown :deep(.code-copy-btn) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  background: hsl(var(--background) / 0.8);
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.project-markdown :deep(.code-copy-btn:hover) {
  color: hsl(var(--foreground));
  background: hsl(var(--muted));
}
.project-markdown :deep(.code-copy-icon) {
  width: 0.875rem;
  height: 0.875rem;
}
.project-markdown :deep(a) {
  @apply text-primary underline underline-offset-2 hover:opacity-80;
}
.project-markdown :deep(blockquote) {
  @apply border-l-4 border-primary pl-4 italic text-muted-foreground my-4;
}
.project-markdown :deep(table) {
  @apply w-full border-collapse my-4 text-sm;
}
.project-markdown :deep(th) {
  @apply text-left font-semibold p-3 border border-border bg-muted/50;
}
.project-markdown :deep(td) {
  @apply p-3 border border-border;
}
.project-markdown :deep(tr:nth-child(even)) {
  @apply bg-muted/30;
}
</style>

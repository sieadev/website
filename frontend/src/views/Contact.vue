<script setup lang="ts">
import { reactive, ref } from 'vue'
import SignArrow from '@/components/transit/SignArrow.vue'
import { openMail } from '@/lib/email'
import { profile } from '@/data/profile'

const form = reactive({ subject: '', message: '' })
const errors = reactive({ subject: '', message: '' })
const opened = ref(false)

function submit() {
  errors.subject = form.subject.trim() ? '' : 'Add a subject so I know what this is about.'
  errors.message = form.message.trim() ? '' : 'Write a message before sending.'
  if (errors.subject || errors.message) {
    document.getElementById(errors.subject ? 'subject' : 'message')?.focus()
    return
  }
  openMail(form.subject.trim(), form.message.trim())
  opened.value = true
}
</script>

<template>
  <div class="wrap page">
    <header class="head">
      <h1 class="h-page">Contact</h1>
      <p class="lede">Project inquiries, questions about my open-source work, or just saying hi. I usually reply within a couple of days.</p>
    </header>

    <div class="grid">
      <form class="form" novalidate @submit.prevent="submit">
        <div class="field">
          <label for="subject" class="cond">Subject</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            autocomplete="off"
            placeholder="A plugin for my network"
            :aria-invalid="!!errors.subject"
            :aria-describedby="errors.subject ? 'subject-error' : undefined"
          />
          <p v-if="errors.subject" id="subject-error" class="error">{{ errors.subject }}</p>
        </div>
        <div class="field">
          <label for="message" class="cond">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="7"
            placeholder="What you need, and roughly when you need it"
            :aria-invalid="!!errors.message"
            :aria-describedby="errors.message ? 'message-error' : 'message-hint'"
          />
          <p v-if="errors.message" id="message-error" class="error">{{ errors.message }}</p>
          <p v-else id="message-hint" class="hint">This opens your email app with the message filled in. Nothing is sent from this page.</p>
        </div>
        <div class="submit">
          <button type="submit" class="btn btn-sign">Open in email app <SignArrow /></button>
          <p v-if="opened" class="hint" role="status">Your email app should be open now. If nothing happened, use one of the other routes.</p>
        </div>
      </form>

      <aside class="routes" aria-labelledby="routes-title">
        <h2 id="routes-title" class="routes-title cond">Other routes</h2>
        <ul>
          <li v-for="l in [profile.links.linkedin, profile.links.github, profile.links.discord]" :key="l.href">
            <a :href="l.href" target="_blank" rel="noopener" class="route">
              <span class="route-name cond">{{ l.label }}</span>
              <span class="muted">{{ l.handle }}</span>
              <SignArrow :dir="-45" />
            </a>
          </li>
        </ul>
        <p class="muted small">
          Need hosting or a team? That's
          <a :href="profile.company.href" target="_blank" rel="noopener" class="link">Pixel Services</a>.
        </p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: clamp(2rem, 5vw, 3.5rem);
}
.head {
  display: grid;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.grid {
  display: grid;
  gap: 3rem;
}
@media (min-width: 960px) {
  .grid {
    grid-template-columns: minmax(0, 38rem) minmax(0, 1fr);
  }
}
.form {
  display: grid;
  gap: 1.4rem;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: var(--surface);
  border-radius: var(--r);
  box-shadow: 0 0 0 1px var(--rule);
}
.field {
  display: grid;
  gap: 0.35rem;
}
label {
  font-weight: 700;
  font-size: 1.25rem;
}
input,
textarea {
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 2px solid var(--ink);
  border-radius: 4px;
  background: var(--bg);
  color: var(--ink);
  font: inherit;
  resize: vertical;
}
input::placeholder,
textarea::placeholder {
  color: color-mix(in srgb, var(--ink-2) 80%, transparent);
}
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 1px;
}
[aria-invalid='true'] {
  border-color: var(--danger);
}
.error {
  color: var(--danger);
  font-weight: 600;
  font-size: 0.92rem;
}
.hint {
  color: var(--ink-2);
  font-size: 0.92rem;
}
.submit {
  display: grid;
  gap: 0.75rem;
  justify-items: start;
}
.routes-title {
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}
.route {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 2px solid var(--rule);
  text-decoration: none;
}
.route:hover .route-name {
  text-decoration: underline;
  text-decoration-color: var(--yellow);
  text-decoration-thickness: 3px;
}
.route-name {
  font-weight: 700;
  font-size: 1.3rem;
}
.small {
  margin-top: 1.25rem;
  font-size: 0.95rem;
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
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
  <div class="page">
    <header class="head">
      <h1 class="section-title">Contact</h1>
      <p class="lede">Project inquiries, questions about my open-source work, or just saying hi. I usually reply within a couple of days.</p>
    </header>

    <div class="grid">
      <form class="sheet form" data-depth="2" novalidate @submit.prevent="submit">
        <div class="field">
          <label for="subject">Subject</label>
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
          <label for="message">Message</label>
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
          <button type="submit" class="btn btn-primary">Open in email app</button>
          <p v-if="opened" class="hint" role="status">Your email app should be open now. If nothing happened, use one of the links on the right.</p>
        </div>
      </form>

      <aside class="elsewhere" aria-label="Other ways to reach me">
        <p class="aside-title wide">Other ways to reach me</p>
        <ul>
          <li v-for="l in [profile.links.linkedin, profile.links.github, profile.links.discord]" :key="l.href">
            <a :href="l.href" target="_blank" rel="noopener" class="row">
              <span class="row-label">{{ l.label }}</span>
              <span class="muted">{{ l.handle }}</span>
            </a>
          </li>
        </ul>
        <p class="muted small">
          Need hosting or a team? That's <a :href="profile.company.href" target="_blank" rel="noopener" class="link">Pixel Services</a>.
        </p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: grid;
  gap: 1rem;
  padding: clamp(1rem, 4vw, 3rem) 0 clamp(2rem, 5vw, 3rem);
}
.head .section-title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
}
.grid {
  display: grid;
  gap: 3rem;
}
@media (min-width: 1000px) {
  .grid {
    grid-template-columns: minmax(0, 36rem) 1fr;
  }
}
.form {
  display: grid;
  gap: 1.4rem;
  padding: clamp(1.25rem, 3vw, 2rem);
}
.field {
  display: grid;
  gap: 0.4rem;
}
label {
  font-weight: 650;
}
input,
textarea {
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 1.5px solid var(--line);
  border-radius: 4px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  resize: vertical;
}
input::placeholder,
textarea::placeholder {
  color: color-mix(in srgb, var(--ink-2) 75%, transparent);
}
input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--ink);
  box-shadow: 0 0 0 3px var(--marigold);
}
[aria-invalid='true'] {
  border-color: #b42318;
}
.dark [aria-invalid='true'] {
  border-color: #ff8a80;
}
.error {
  font-size: 0.88rem;
  font-weight: 550;
  color: #b42318;
}
.dark .error {
  color: #ff8a80;
}
.hint {
  font-size: 0.88rem;
  color: var(--ink-2);
}
.submit {
  display: grid;
  gap: 0.75rem;
  justify-items: start;
}
.elsewhere {
  display: grid;
  gap: 1rem;
  align-content: start;
}
.aside-title {
  font-weight: 750;
  font-size: 1.15rem;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1.5px solid var(--slate);
  text-decoration: none;
}
.row:hover .row-label {
  text-decoration: underline;
  text-decoration-color: var(--marigold);
  text-decoration-thickness: 2px;
}
.row-label {
  font-weight: 650;
}
.small {
  font-size: 0.92rem;
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import UnitLabel from '@/components/rack/UnitLabel.vue'
import Device from '@/components/rack/Device.vue'
import Led from '@/components/rack/Led.vue'
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
  <UnitLabel id="page-title" :level="1" title="Contact" note="Project inquiries, questions about my open-source work, or just saying hi. I usually reply within a couple of days." />

  <Device as="div" flush class="kvm">
    <div class="kvm-row">
      <div class="monitor">
        <form class="screen" novalidate @submit.prevent="submit">
          <p class="screen-title">New message to {{ profile.domain }}</p>
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
            <button type="submit" class="hw-btn hw-btn-primary">Open in email app</button>
            <p v-if="opened" class="hint" role="status">Your email app should be open now. If nothing happened, use one of the links beside this screen.</p>
          </div>
        </form>
      </div>

      <aside class="panel" aria-label="Other ways to reach me">
        <p class="silk">Other lines</p>
        <ul>
          <li v-for="l in [profile.links.linkedin, profile.links.github, profile.links.discord]" :key="l.href">
            <a :href="l.href" target="_blank" rel="noopener" class="line">
              <Led color="green" :size="6" />
              <span class="line-label">{{ l.label }}</span>
              <span class="dim line-handle">{{ l.handle }}</span>
            </a>
          </li>
        </ul>
        <p class="dim small">
          Need hosting or a team? That's
          <a :href="profile.company.href" target="_blank" rel="noopener" class="text-link">Pixel Services</a>.
        </p>
      </aside>
    </div>
  </Device>
</template>

<style scoped>
.kvm-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18rem;
}
.monitor {
  padding: clamp(0.75rem, 2vw, 1.25rem);
  background: #16181b;
  border-right: 1px solid rgb(0 0 0 / 0.3);
}
.screen {
  display: grid;
  gap: 1.1rem;
  padding: clamp(1rem, 3vw, 1.75rem);
  border-radius: 4px;
  background: #0f1a14;
  color: #c9f5d2;
  font-family: var(--mono);
  box-shadow: inset 0 0 40px rgb(0 0 0 / 0.6);
}
.screen-title {
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed #2c4a36;
  color: #7fd39a;
  font-size: 0.85rem;
}
.field {
  display: grid;
  gap: 0.35rem;
}
label {
  font-size: 0.85rem;
  color: #7fd39a;
}
input,
textarea {
  width: 100%;
  padding: 0.6rem 0.7rem;
  border: 1px solid #2c4a36;
  border-radius: 2px;
  background: #0a120d;
  color: #e3fbe8;
  font: 0.95rem/1.5 var(--mono);
  caret-color: #3ddc84;
  resize: vertical;
}
input::placeholder,
textarea::placeholder {
  color: #5c8c6a;
}
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #3ddc84;
  outline-offset: 1px;
}
[aria-invalid='true'] {
  border-color: #ff7b6b;
}
.error {
  color: #ff9d90;
  font-size: 0.82rem;
}
.hint {
  color: #8fbf9c;
  font-size: 0.8rem;
}
.submit {
  display: grid;
  gap: 0.6rem;
  justify-items: start;
}
.panel {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.25rem;
}
.line {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--plate-edge);
  text-decoration: none;
  color: var(--silk);
}
.line:hover .line-label {
  text-decoration: underline;
  text-decoration-color: var(--led-amber);
}
.line-label {
  font-weight: 600;
}
.line-handle {
  justify-self: end;
  font-size: 0.85rem;
  text-align: right;
}
.small {
  font-size: 0.88rem;
  margin-top: auto;
}
@media (max-width: 860px) {
  .kvm-row {
    grid-template-columns: 1fr;
  }
  .monitor {
    border-right: none;
  }
}
</style>

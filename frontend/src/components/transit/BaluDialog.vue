<script setup lang="ts">
import { ref, watch } from 'vue'
import { BALU_SRC } from '@/composables/useKonami'

const open = defineModel<boolean>({ required: true })
const dialog = ref<HTMLDialogElement | null>(null)

watch(open, (v) => {
  if (v) dialog.value?.showModal()
  else dialog.value?.close()
})
</script>

<template>
  <dialog ref="dialog" class="balu" aria-labelledby="balu-title" @close="open = false" @click.self="open = false">
    <div class="sign head">
      <p id="balu-title" class="cond title">Unscheduled stop: Balu</p>
    </div>
    <div class="body">
      <img v-if="open" :src="BALU_SRC" alt="Balu, a tan and white dog, standing on a desk chair and looking down" decoding="async" />
      <p class="muted">Not on any timetable. Doors open on request.</p>
      <form method="dialog">
        <button class="btn">Continue journey</button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.balu {
  width: min(26rem, calc(100vw - 2rem));
  padding: 0;
  border-radius: var(--r);
  background: var(--surface);
  color: var(--ink);
}
.balu::backdrop {
  background: rgb(0 30 52 / 0.6);
}
.head {
  padding: 0.9rem 1.2rem;
  border-radius: var(--r) var(--r) 0 0;
}
.title {
  font-weight: 700;
  font-size: 1.5rem;
}
.body {
  display: grid;
  gap: 0.8rem;
  padding: 1.2rem;
}
img {
  width: 100%;
  min-height: 12rem;
  object-fit: cover;
  border-radius: 4px;
  background: var(--surface-2);
}
form {
  justify-self: end;
}
</style>

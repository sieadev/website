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
  <dialog ref="dialog" class="balu sheet" data-depth="2" aria-labelledby="balu-title" @close="open = false" @click.self="open = false">
    <div class="inner">
      <p id="balu-title" class="wide title">You found a hidden layer.</p>
      <p class="muted">Balu was guarding it.</p>
      <img v-if="open" :src="BALU_SRC" alt="Balu, a tan and white dog, standing on a desk chair and looking down" decoding="async" />
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.balu {
  max-width: min(26rem, calc(100vw - 3rem));
  padding: 0;
  color: var(--ink);
}
.balu::backdrop {
  background: color-mix(in srgb, var(--ink) 45%, transparent);
}
.inner {
  padding: 1.5rem;
  display: grid;
  gap: 0.75rem;
}
.title {
  font-size: 1.35rem;
  font-weight: 750;
}
img {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 4px;
  background: var(--slate-soft);
  min-height: 12rem;
  object-fit: cover;
}
form {
  justify-self: end;
}
</style>

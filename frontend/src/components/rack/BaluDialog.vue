<script setup lang="ts">
import { ref, watch } from 'vue'
import Led from './Led.vue'
import DymoLabel from './DymoLabel.vue'
import { BALU_SRC } from '@/composables/useKonami'

const open = defineModel<boolean>({ required: true })
const dialog = ref<HTMLDialogElement | null>(null)

watch(open, (v) => {
  if (v) dialog.value?.showModal()
  else dialog.value?.close()
})
</script>

<template>
  <dialog ref="dialog" class="balu plate" aria-labelledby="balu-title" @close="open = false" @click.self="open = false">
    <div class="inner">
      <div class="top">
        <Led color="amber" blink />
        <DymoLabel size="sm" :tilt="-1">Unlisted device</DymoLabel>
      </div>
      <p id="balu-title" class="title">You found Balu.</p>
      <p class="dim">He's not in the inventory, but he's always on.</p>
      <div class="bezel">
        <img v-if="open" :src="BALU_SRC" alt="Balu, a tan and white dog, standing on a desk chair and looking down" decoding="async" />
      </div>
      <form method="dialog">
        <button class="hw-btn">Close</button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.balu {
  max-width: min(25rem, calc(100vw - 2rem));
  padding: 0;
  color: var(--silk);
}
.balu::backdrop {
  background: rgb(10 11 13 / 0.6);
}
.inner {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
}
.top {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.title {
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.5rem;
}
.bezel {
  padding: 8px;
  background: #16181b;
  border-radius: 4px;
  box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.8);
}
.bezel img {
  width: 100%;
  min-height: 12rem;
  object-fit: cover;
  border-radius: 2px;
}
form {
  justify-self: end;
}
</style>

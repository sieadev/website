<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Text printed as three layers (slate, marigold, ink) that sit almost in register.
 * With `interactive`, the layers drift apart following the pointer.
 */
const props = withDefaults(defineProps<{ text: string; as?: string; interactive?: boolean; spread?: number }>(), {
  as: 'span',
  interactive: false,
  spread: 10
})

const root = ref<HTMLElement | null>(null)
let frame = 0
let target = { x: 0, y: 0 }

function onPointer(e: PointerEvent) {
  target = {
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: (e.clientY / window.innerHeight) * 2 - 1
  }
  if (!frame) frame = requestAnimationFrame(apply)
}

function apply() {
  frame = 0
  root.value?.style.setProperty('--dx', target.x.toFixed(3))
  root.value?.style.setProperty('--dy', target.y.toFixed(3))
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches
  if (props.interactive && !reduce && finePointer) window.addEventListener('pointermove', onPointer, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointer)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <component :is="as" ref="root" class="layered" :class="{ interactive }" :style="{ '--spread': `${spread}px` }">
    <span class="layer layer-slate" aria-hidden="true">{{ text }}</span>
    <span class="layer layer-gold" aria-hidden="true">{{ text }}</span>
    <span class="layer layer-ink">{{ text }}</span>
  </component>
</template>

<style scoped>
.layered {
  --dx: 0;
  --dy: 0;
  position: relative;
  display: inline-grid;
  isolation: isolate;
}
.layer {
  grid-area: 1 / 1;
  transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.layer-slate {
  color: var(--slate);
  transform: translate(calc(var(--dx) * var(--spread) + 0.06em), calc(var(--dy) * var(--spread) + 0.06em));
  z-index: -2;
}
.layer-gold {
  color: var(--marigold);
  transform: translate(calc(var(--dx) * var(--spread) * 0.5 + 0.03em), calc(var(--dy) * var(--spread) * 0.5 + 0.03em));
  z-index: -1;
}
.layer-ink {
  color: var(--ink);
}

.interactive .layer-slate {
  animation: register-slate 1100ms cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
}
.interactive .layer-gold {
  animation: register-gold 1100ms cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
}
.interactive .layer-ink {
  animation: register-ink 1100ms cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
}

@keyframes register-slate {
  from { transform: translate(0.5em, 0.35em); opacity: 0; }
}
@keyframes register-gold {
  from { transform: translate(0.25em, 0.18em); opacity: 0; }
}
@keyframes register-ink {
  from { transform: translate(-0.12em, -0.08em); opacity: 0; }
}
</style>

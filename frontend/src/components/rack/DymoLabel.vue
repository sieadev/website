<script setup lang="ts">
withDefaults(defineProps<{ as?: string; tilt?: number; size?: 'sm' | 'md' | 'lg' }>(), { as: 'span', tilt: 0, size: 'md' })
</script>

<template>
  <component :is="as" class="dymo" :class="size" :style="{ '--tilt': `${tilt}deg` }"><slot /></component>
</template>

<style scoped>
/* Embossed label-maker tape */
.dymo {
  display: inline-block;
  padding: 0.18em 0.7em 0.2em;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.14), transparent 40%, rgb(0 0 0 / 0.16)),
    var(--tape);
  color: var(--tape-text);
  font-family: var(--mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  line-height: 1.25;
  border-radius: 2px;
  transform: rotate(var(--tilt));
  text-shadow: 0 1px 0 rgb(255 255 255 / 0.35), 0 -1px 0 rgb(0 0 0 / 0.45);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.35);
  clip-path: polygon(0 4%, 1.2% 0, 98.8% 2%, 100% 8%, 99.5% 96%, 98.5% 100%, 1% 98%, 0 92%);
}
.sm { font-size: 0.7rem; }
.md { font-size: 0.9rem; }
.lg { font-size: clamp(1rem, 2.2vw, 1.35rem); }
</style>

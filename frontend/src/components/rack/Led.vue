<script setup lang="ts">
withDefaults(defineProps<{ color?: 'amber' | 'green' | 'blue'; on?: boolean; blink?: boolean; size?: number }>(), {
  color: 'green',
  on: true,
  blink: false,
  size: 7
})
</script>

<template>
  <span class="led" :class="[color, { on, blink: on && blink }]" :style="{ '--s': `${size}px` }" aria-hidden="true" />
</template>

<style scoped>
.led {
  display: inline-block;
  flex-shrink: 0;
  width: var(--s);
  height: var(--s);
  border-radius: 50%;
  background: var(--led-off);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 0.35);
  transition: background 120ms, box-shadow 120ms;
}
.led.on.green { --c: var(--led-green); }
.led.on.amber { --c: var(--led-amber); }
.led.on.blue { --c: var(--led-blue); }
.led.on {
  background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--c) 40%, white), var(--c) 60%);
  box-shadow: 0 0 calc(var(--s) * 0.9) color-mix(in srgb, var(--c) 70%, transparent);
}
.led.blink {
  animation: blink 1.4s steps(1) infinite;
}
@keyframes blink {
  0%, 62% { opacity: 1; }
  63%, 70% { opacity: 0.25; }
  71%, 80% { opacity: 1; }
  81%, 86% { opacity: 0.25; }
  87%, 100% { opacity: 1; }
}
</style>

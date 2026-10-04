<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Two vertical rails with mounting holes; the left one counts rack units bottom-up like a real rack. */
const root = ref<HTMLElement | null>(null)
const units = ref(0)
let ro: ResizeObserver | null = null

onMounted(() => {
  const u = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--u')) || 44
  ro = new ResizeObserver(([entry]) => {
    units.value = Math.floor(entry.contentRect.height / u)
  })
  if (root.value) ro.observe(root.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div ref="root" class="rails" aria-hidden="true">
    <div class="rail left">
      <span v-for="n in units" :key="n" class="unit">{{ units - n + 1 }}</span>
    </div>
    <div class="rail right" />
  </div>
</template>

<style scoped>
.rails {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.rail {
  position: absolute;
  top: 0;
  bottom: 0;
  width: var(--rail-w);
  background:
    repeating-linear-gradient(
      180deg,
      transparent 0 4px,
      var(--hole) 4px 11px,
      transparent 11px calc(var(--u) / 3)
    )
    center / 8px 100% no-repeat,
    linear-gradient(90deg, var(--rail-edge), var(--rail) 18%, var(--rail) 82%, var(--rail-edge));
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.unit {
  display: flex;
  align-items: flex-start;
  height: var(--u);
  padding: 2px 0 0 3px;
  font: 500 9px/1 var(--mono);
  color: var(--silk-dim);
  opacity: 0.8;
}
@media (max-width: 719px) {
  .unit {
    display: none;
  }
  .rail {
    background-size: 5px 100%, auto;
  }
}
</style>

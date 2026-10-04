<script setup lang="ts">
/** A rack-mounted device: faceplate with screw ears that sit over the rails. */
withDefaults(defineProps<{ as?: string; flush?: boolean }>(), { as: 'section', flush: false })
</script>

<template>
  <component :is="as" class="device">
    <span class="rack-ear" aria-hidden="true"><i class="screw" /><i class="screw" /></span>
    <div class="plate face" :class="{ flush }"><slot /></div>
    <span class="rack-ear" aria-hidden="true"><i class="screw" /><i class="screw" /></span>
  </component>
</template>

<style scoped>
.device {
  position: relative;
  display: grid;
  grid-template-columns: var(--rail-w) minmax(0, 1fr) var(--rail-w);
  margin-bottom: 6px;
  scroll-margin-top: 6rem;
}
.face {
  border-radius: 0;
  border-left-color: rgb(0 0 0 / 0.12);
  border-right-color: rgb(0 0 0 / 0.12);
  padding: clamp(1rem, 2.5vw, 1.6rem);
  min-height: calc(var(--u) - 2px);
}
.face.flush {
  padding: 0;
}
</style>

<script setup lang="ts">
/** Wayfinding arrow. `dir` in degrees: 0 points right, -45 up-right, 90 down. */
withDefaults(defineProps<{ dir?: number }>(), { dir: 0 })
</script>

<template>
  <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true" :style="{ transform: `rotate(${dir}deg)` }">
    <path d="M3 10.2h11.4L9.6 5.4 12.1 3 21 12l-8.9 9-2.5-2.4 4.8-4.8H3z" fill="currentColor" />
  </svg>
</template>

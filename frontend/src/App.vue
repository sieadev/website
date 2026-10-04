<script setup lang="ts">
import RackRails from '@/components/rack/RackRails.vue'
import PatchPanel from '@/components/rack/PatchPanel.vue'
import PowerStrip from '@/components/rack/PowerStrip.vue'
import BaluDialog from '@/components/rack/BaluDialog.vue'
import { useKonami } from '@/composables/useKonami'

const { unlocked } = useKonami()
</script>

<template>
  <a href="#main" class="skip">Skip to content</a>
  <div class="rack">
    <RackRails />
    <PatchPanel />
    <main id="main" tabindex="-1">
      <RouterView />
    </main>
    <PowerStrip />
  </div>
  <BaluDialog v-model="unlocked" />
</template>

<style scoped>
.skip {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--led-amber);
  color: #1d1500;
  font-weight: 600;
}
.skip:focus {
  top: 1rem;
}
.rack {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1180px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 0 6px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 0.12), 0 0 60px rgb(0 0 0 / 0.25);
}
main {
  flex: 1;
  position: relative;
}
main:focus {
  outline: none;
}
@media (max-width: 719px) {
  .rack {
    --rail-w: 0.9rem;
  }
}
</style>

<script setup lang="ts">
import LayersPanel from '@/components/layers/LayersPanel.vue'
import SiteFooter from '@/components/layers/SiteFooter.vue'
import BaluDialog from '@/components/layers/BaluDialog.vue'
import { useKonami } from '@/composables/useKonami'

const { unlocked } = useKonami()
</script>

<template>
  <a href="#main" class="skip">Skip to content</a>
  <LayersPanel />
  <div class="shell">
    <main id="main" tabindex="-1">
      <RouterView />
    </main>
    <SiteFooter />
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
  background: var(--marigold);
  color: var(--on-marigold);
  font-weight: 600;
  border-radius: var(--radius);
}
.skip:focus {
  top: 1rem;
}
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
main:focus {
  outline: none;
}
@media (min-width: 960px) {
  .shell {
    margin-left: calc(var(--panel-w) + 1.25rem);
  }
}
</style>

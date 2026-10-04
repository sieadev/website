<script setup lang="ts">
import SiteHeader from '@/components/transit/SiteHeader.vue'
import SiteFooter from '@/components/transit/SiteFooter.vue'
import BaluDialog from '@/components/transit/BaluDialog.vue'
import { useKonami } from '@/composables/useKonami'

const { unlocked } = useKonami()
</script>

<template>
  <a href="#main" class="skip">Skip to content</a>
  <div class="shell">
    <SiteHeader />
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
  background: var(--yellow);
  color: var(--on-yellow);
  font-weight: 700;
  border-radius: var(--r);
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
</style>

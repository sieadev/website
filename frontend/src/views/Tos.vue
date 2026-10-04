<script setup lang="ts">
import UnitLabel from '@/components/rack/UnitLabel.vue'
import Device from '@/components/rack/Device.vue'
import { tosSections } from '@/data/tos'
</script>

<template>
  <UnitLabel id="page-title" :level="1" title="Terms of service" note="The rules for using siea.dev and what happens to anything you send me." />
  <Device as="div">
    <div class="terms">
      <section v-for="(s, i) in tosSections" :key="s.title" :aria-labelledby="`tos-${i}`" class="clause">
        <h2 :id="`tos-${i}`" class="clause-title"><span class="silk num">§{{ i + 1 }}</span> {{ s.title }}</h2>
        <p v-for="p in s.paragraphs" :key="p">{{ p }}</p>
        <ul v-if="s.list">
          <li v-for="item in s.list" :key="item">{{ item }}</li>
        </ul>
      </section>
    </div>
  </Device>
</template>

<style scoped>
.terms {
  display: grid;
  gap: 1.75rem;
  max-width: 44rem;
  padding: 0.5rem 0;
}
.clause {
  display: grid;
  gap: 0.6rem;
  color: var(--silk-dim);
}
.clause-title {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-family: var(--cond);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--silk);
}
.num {
  min-width: 1.8rem;
}
ul {
  display: grid;
  gap: 0.3rem;
  padding-left: 1.2rem;
  list-style: square;
}
</style>

<script setup lang="ts">
import UnitLabel from '@/components/rack/UnitLabel.vue'
import ProjectServer from '@/components/rack/ProjectServer.vue'
import BlankPanel from '@/components/rack/BlankPanel.vue'
import Device from '@/components/rack/Device.vue'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'

const installed = projects.filter((p) => p.slug)
const reserved = projects.filter((p) => !p.slug)
</script>

<template>
  <UnitLabel
    id="page-title"
    :level="1"
    title="Projects"
    note="I publish most of what I build. Each of these has a write-up covering why it exists, how it works, and code to copy."
  />
  <ProjectServer v-for="(p, i) in installed" :key="p.name" :project="p" :bay="i + 1" start-open :heading-level="2" />
  <BlankPanel v-for="p in reserved" :key="p.name" :project="p" />
  <Device as="aside" aria-label="More on GitHub">
    <p class="more">
      Smaller tools, Minecraft plugins and experiments are on
      <a :href="profile.links.github.href" target="_blank" rel="noopener" class="text-link">github.com/sieadev</a>.
    </p>
  </Device>
</template>

<style scoped>
.more {
  color: var(--silk-dim);
}
</style>

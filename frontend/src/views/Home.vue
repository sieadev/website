<script setup lang="ts">
import HeroServer from '@/components/rack/HeroServer.vue'
import UnitLabel from '@/components/rack/UnitLabel.vue'
import ProjectServer from '@/components/rack/ProjectServer.vue'
import BlankPanel from '@/components/rack/BlankPanel.vue'
import SkillSwitch from '@/components/rack/SkillSwitch.vue'
import JourneyUnit from '@/components/rack/JourneyUnit.vue'
import Device from '@/components/rack/Device.vue'
import { projects } from '@/data/projects'
import { journeyChronological } from '@/data/journey'

const installed = projects.filter((p) => p.slug)
const reserved = projects.filter((p) => !p.slug)
const journey = journeyChronological(true)
</script>

<template>
  <HeroServer />

  <section aria-labelledby="projects-title" class="bank">
    <UnitLabel id="projects-title" title="Projects" :note="`${installed.length} open-source frameworks installed. Pull one out for details.`" />
    <ProjectServer v-for="(p, i) in installed" :key="p.name" :project="p" :bay="i + 1" :start-open="i === 0" />
    <BlankPanel v-for="p in reserved" :key="p.name" :project="p" />
  </section>

  <section aria-labelledby="skills-title" class="bank">
    <UnitLabel id="skills-title" title="Skills" note="Every tool I work with, patched in by category." />
    <SkillSwitch />
  </section>

  <section aria-labelledby="journey-title" class="bank">
    <UnitLabel id="journey-title" title="Journey" note="Newest at the top. Lit units are still running.">
      <RouterLink to="/journey" class="text-link more">Full journey</RouterLink>
    </UnitLabel>
    <JourneyUnit v-for="e in journey" :key="e.id" :entry="e" />
  </section>

  <Device as="section" aria-labelledby="cta-title" class="cta bank">
    <div class="cta-row">
      <div>
        <h2 id="cta-title" class="cta-title">Need something built or hosted?</h2>
        <p class="dim">Backend services, Minecraft plugins, Discord bots or a server to run them on. Tell me what you need.</p>
      </div>
      <RouterLink to="/contact" class="hw-btn hw-btn-primary">Write to me</RouterLink>
    </div>
  </Device>
</template>

<style scoped>
/* leave one empty rack unit between banks so the rails show */
.bank {
  margin-top: calc(var(--u) - 6px);
}
.more {
  font-size: 0.9rem;
}
.cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.cta-title {
  font-family: var(--cond);
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  line-height: 1.1;
}
</style>

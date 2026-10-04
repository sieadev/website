<script setup lang="ts">
import RouteMap from '@/components/transit/RouteMap.vue'
import DestinationSign from '@/components/transit/DestinationSign.vue'
import Timetable from '@/components/transit/Timetable.vue'
import SignArrow from '@/components/transit/SignArrow.vue'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

const listed = projects
</script>

<template>
  <section class="hero wrap" aria-labelledby="hero-name">
    <div class="sign station">
      <div class="station-text">
        <h1 id="hero-name" class="station-name cond">{{ profile.name }}</h1>
        <p class="station-sub cond">Fullstack developer in Essen</p>
      </div>
      <img src="/logo.svg" alt="" class="operator" width="88" height="88" />
    </div>

    <div class="intro">
      <p class="lead">
        Most people online know me as {{ profile.handle }}. I'm {{ profile.age }}, I started coding at {{ profile.startedCodingAt }},
        and I run <a :href="profile.company.href" target="_blank" rel="noopener" class="link">Pixel Services</a>,
        a server hosting and development company here in Essen.
      </p>
      <div class="actions">
        <RouterLink to="/projects" class="btn btn-sign">Projects <SignArrow /></RouterLink>
        <RouterLink to="/contact" class="btn">Get in touch</RouterLink>
      </div>
    </div>

    <div class="route-block">
      <div class="route-head">
        <h2 class="h-small cond">The route so far</h2>
        <RouterLink to="/journey" class="link">Every stop in detail</RouterLink>
      </div>
      <RouteMap />
    </div>
  </section>

  <section class="wrap block" aria-labelledby="projects-title">
    <div class="block-head">
      <h2 id="projects-title" class="h-section">Projects</h2>
      <p class="lede">Open-source frameworks and libraries, mostly Java. Follow a sign to read how it's built.</p>
    </div>
    <div class="dest-grid">
      <DestinationSign v-for="p in listed" :key="p.name" :project="p" />
    </div>
  </section>

  <section class="wrap block" aria-labelledby="skills-title">
    <div class="block-head">
      <h2 id="skills-title" class="h-section">Skills</h2>
      <p class="lede">Languages, frameworks, software and databases I work with.</p>
    </div>
    <Timetable />
  </section>

  <section class="wrap block" aria-labelledby="cta-title">
    <RouterLink to="/contact" class="sign cta">
      <span>
        <span id="cta-title" class="cta-title cond">Next stop: your project</span>
        <span class="cta-sub">Backend services, Minecraft plugins, Discord bots or hosting. Tell me where you want to go.</span>
      </span>
      <SignArrow class="cta-arrow" />
    </RouterLink>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(1.5rem, 4vw, 3rem);
}
.station {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3.5vw, 2.5rem);
}
.station-name {
  font-weight: 700;
  font-size: clamp(2.6rem, 8vw, 6.5rem);
  line-height: 0.92;
  letter-spacing: -0.005em;
}
.station-sub {
  margin-top: 0.6rem;
  font-weight: 500;
  font-size: clamp(1.15rem, 2.2vw, 1.6rem);
  opacity: 0.92;
}
.operator {
  width: clamp(3.5rem, 8vw, 5.5rem);
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 0 3px var(--sign-ink);
}
.intro {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem 3rem;
  padding: 1.75rem 0 0;
}
.lead {
  max-width: 40rem;
  font-size: 1.15rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.route-block {
  margin-top: clamp(2.5rem, 6vw, 4rem);
  padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem);
  background: var(--surface);
  border-radius: var(--r);
  box-shadow: 0 0 0 1px var(--rule);
}
.route-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem 1.5rem;
  margin-bottom: 1rem;
}
.h-small {
  font-weight: 700;
  font-size: 1.75rem;
}
.block {
  padding-top: clamp(4rem, 9vw, 6.5rem);
}
.block-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 2rem;
  margin-bottom: 1.75rem;
}
.dest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 28rem), 1fr));
  gap: 1.25rem;
}
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  text-decoration: none;
}
.cta-title {
  display: block;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1;
}
.cta-sub {
  display: block;
  margin-top: 0.6rem;
  max-width: 36rem;
  opacity: 0.92;
}
.cta-arrow {
  width: clamp(2.5rem, 6vw, 4.5rem);
  height: clamp(2.5rem, 6vw, 4.5rem);
  flex-shrink: 0;
  transition: transform 160ms ease;
}
.cta:hover .cta-arrow {
  transform: translateX(6px);
}
</style>

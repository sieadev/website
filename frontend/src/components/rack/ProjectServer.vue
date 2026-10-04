<script setup lang="ts">
import { ref, useId } from 'vue'
import Device from './Device.vue'
import Led from './Led.vue'
import DymoLabel from './DymoLabel.vue'
import type { ProjectItem } from '@/data/projects'

const props = defineProps<{ project: ProjectItem; bay: number; startOpen?: boolean }>()
const open = ref(props.startOpen ?? false)
const id = useId()
</script>

<template>
  <Device as="article" class="server" :class="{ open }" flush :aria-labelledby="`${id}-name`">
    <div class="front">
      <div class="bays" aria-hidden="true">
        <span v-for="n in 3" :key="n" class="drive inset">
          <Led :color="n === 1 ? 'green' : 'amber'" :blink="n === 2" :size="5" />
        </span>
      </div>

      <div class="ident">
        <span class="silk bay">Bay {{ String(bay).padStart(2, '0') }}</span>
        <h3 :id="`${id}-name`" class="name"><DymoLabel :tilt="bay % 2 ? -0.8 : 0.6">{{ project.name }}</DymoLabel></h3>
      </div>

      <ul class="tags" aria-label="Tags">
        <li v-for="t in project.tags" :key="t" class="silk">{{ t }}</li>
      </ul>

      <button
        type="button"
        class="handle"
        :aria-expanded="open"
        :aria-controls="`${id}-drawer`"
        @click="open = !open"
      >
        <span class="grip" aria-hidden="true" />
        <span class="silk">{{ open ? 'Slide in' : 'Pull out' }}</span>
        <span class="sr-only"> {{ project.name }} details</span>
      </button>
    </div>

    <div :id="`${id}-drawer`" class="drawer" :inert="!open">
      <div class="drawer-inner">
        <div class="internals">
          <p class="desc">{{ project.description }}</p>
          <div class="links">
            <RouterLink v-if="project.slug" :to="{ name: 'ProjectDetail', params: { slug: project.slug } }" class="hw-btn hw-btn-primary">
              Read the write-up
            </RouterLink>
            <a v-if="project.docs" :href="project.docs" target="_blank" rel="noopener" class="hw-btn">Docs</a>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="hw-btn">Source</a>
          </div>
        </div>
      </div>
    </div>
  </Device>
</template>

<style scoped>
.front {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 1.25rem;
  min-height: calc(var(--u) * 2 - 2px);
  padding: 0.6rem 0.9rem;
}
.bays {
  display: flex;
  gap: 4px;
}
.drive {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 1.3rem;
  height: 3.6rem;
  padding: 4px;
  background-image: repeating-linear-gradient(180deg, transparent 0 5px, rgb(0 0 0 / 0.12) 5px 6px);
}
.ident {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
}
.bay {
  font-size: 0.6rem;
}
.name {
  font-size: 1.25rem;
  line-height: 1;
}
.name :deep(.dymo) {
  font-size: 1.05rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.25rem 0.9rem;
  max-width: 18rem;
}
.tags .silk {
  font-size: 0.64rem;
}
.handle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.6rem;
  border-radius: 4px;
  background: none;
  border: 1px solid transparent;
  cursor: pointer;
  color: var(--silk);
}
.handle:hover {
  border-color: var(--plate-edge);
  background: color-mix(in srgb, var(--silk) 6%, transparent);
}
.grip {
  width: 2.6rem;
  height: 1.25rem;
  border: 3px solid var(--screw);
  border-left: none;
  border-radius: 0 8px 8px 0;
  background: linear-gradient(90deg, transparent 60%, rgb(0 0 0 / 0.12));
  transition: transform 200ms ease;
}
.open .grip {
  transform: scaleX(-1);
}
.handle .silk {
  font-size: 0.6rem;
}

.drawer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 320ms cubic-bezier(0.3, 0.7, 0.2, 1);
}
.open .drawer {
  grid-template-rows: 1fr;
}
.drawer-inner {
  overflow: hidden;
}
.internals {
  display: grid;
  gap: 1rem;
  margin: 0 0.9rem 0.9rem;
  padding: 1.2rem 1.3rem;
  border-radius: 3px;
  background:
    linear-gradient(90deg, rgb(0 0 0 / 0.05) 1px, transparent 1px) 0 0 / 22px 22px,
    linear-gradient(180deg, rgb(0 0 0 / 0.05) 1px, transparent 1px) 0 0 / 22px 22px,
    var(--inset);
  box-shadow: inset 0 3px 8px rgb(0 0 0 / 0.25);
}
.desc {
  max-width: 44rem;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@media (max-width: 760px) {
  .front {
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 0.8rem;
  }
  .tags {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-content: flex-start;
    max-width: none;
  }
  .drive {
    height: 2.8rem;
    width: 1rem;
  }
}
</style>

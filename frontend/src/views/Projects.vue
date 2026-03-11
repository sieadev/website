<script setup lang="ts">
import Project from '@/components/Project.vue'
import { projects } from '@/data/projects'
import { mdiGithub } from '@mdi/js'
import { computed } from 'vue'

/** All projects that have a detail page (clickable) — everything except the last */
const clickableProjects = computed(() => projects.slice(0, -1))
/** Last project is always the blurred teaser (e.g. Flash) */
const blurredProject = computed(() => projects[projects.length - 1])
</script>

<template>
  <div class="container mx-auto py-16 px-4">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Open Source</h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        As an open-source enthusiast, I have a passion for sharing my work with the community.
        Here are some of the projects I have worked on in the past.
      </p>
    </div>

    <div class="space-y-6 max-w-4xl mx-auto relative">
      <RouterLink
        v-for="(project, index) in clickableProjects"
        :key="project.name"
        :to="{ name: 'ProjectDetail', params: { slug: project.slug } }"
        class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        <Project
          v-bind="project"
          :index="index"
          class="cursor-pointer"
        />
      </RouterLink>

      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-[1] pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2]">
          <a
            href="https://github.com/sieadev"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path :d="mdiGithub" fill="currentColor" />
            </svg>
            More Projects on GitHub
          </a>
        </div>
        <div class="opacity-50 blur-[2px] pointer-events-none">
          <Project
            v-bind="blurredProject"
            :index="clickableProjects.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

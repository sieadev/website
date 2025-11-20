<script setup lang="ts">
import Project from '@/components/Project.vue'
import { mdiGithub } from '@mdi/js'

const projects = [
    {
    name: 'Jonion',
    description: 'Jonion is a lightweight, flexible plugin framework for Java applications. It provides a clean, modular architecture that makes it easy to build extensible systems by "layering" functionality through plugins.',
    image: '/projects/ptkp.png',
    tags: ['Java', 'Framework', 'Modular', 'API'],
    github: 'https://github.com/sieadev/Jonion',
    docs: 'https://docs.siea.dev/jonion/'
  },
  {
    name: 'Mobot',
    description: 'A modular bot framework for Discord. Inspired by the Spigot Plugin System, Mobot allows developers to create custom modules that can be loaded and unloaded on the fly. With a feature-rich API, Mobot makes it easy for developers to create custom commands, events, and more.',
    image: '/projects/mobot.png',
    tags: ['Java', 'Discord API', 'Modular'],
    github: 'https://github.com/sieadev/mobot',
    docs: 'https://docs.siea.dev/mobot/'
  },
  {
    name: 'Kora',
    description: 'Kora is a high-performance, deeply object-oriented programming language where everything is treated as an object. No statics, no globals, and no exceptions to the object model. ',
    image: '/projects/kora.png',
    tags: ['Language', 'Compiler', 'Interpreter', 'VM'],
    github: 'https://github.com/sieadev/Kora'
  },
  {
    name: 'Flash',
    description: 'A web framework for Java that is designed to make it easy to create web applications. Flash is built on top of the Jetty web server and provides a simple and intuitive API for creating routes, controllers, and views.',
    image: '/projects/flash.png', 
    tags: ['Java', 'Web', 'Framework'],
    github: "https://github.com/pixel-services/flash",
    index: 0
  },
  {
    name: 'Flash API',
    description: 'The plugin API for the highly expressive Java web framework Flash. Built with ease of use and performance in mind. It allows developers to create custom plugins for Flash that can be used by other developers to add new features to the framework.',
    image: '/projects/flashapi.png',
    tags: ['Java', 'Web', 'Framework', 'API'],
    github: 'https://github.com/pixel-services/flashapi'
  }
]
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
      <Project 
        v-for="(project, index) in projects.slice(0, 4)" 
        :key="project.name"
        v-bind="project"
        :index="index"
      />

      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-[1]"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2]">
          <a 
            href="https://github.com/sieadev" 
            target="_blank"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path :d="mdiGithub" fill="currentColor" />
            </svg>
            More Projects on GitHub
          </a>
        </div>
        <div class="opacity-50 blur-[2px]">
          <Project 
            v-bind="projects[4]"
            :index="4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
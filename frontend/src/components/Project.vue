<script setup lang="ts">
import { mdiGithub, mdiBookOpenPageVariant  } from '@mdi/js'

interface Props {
  name: string
  description: string
  image: string
  tags: string[]
  github?: string
  docs?: string
  index: number
}

defineProps<Props>()
</script>

<template>
  <div class="project-card border rounded-lg p-6">
    <div class="flex flex-col md:flex-row gap-8">
      <div :class="['w-full md:w-1/3', { 'md:order-2': index % 2 === 1 }]">
        <img :src="image" :alt="name" class="w-full h-48 object-cover rounded-lg" />
      </div>
      
      <div class="flex flex-col flex-1 justify-between">
        <div>
          <h3 class="text-2xl font-bold mb-4">{{ name }}</h3>
          <p class="text-muted-foreground">{{ description }}</p>
        </div>
        
        <div class="flex justify-between items-end mt-6">
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in tags" 
              :key="tag"
              class="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
            >
              {{ tag }}
            </span>
          </div>
          
          <div class="flex gap-3">
            <a v-if="docs" :href="docs" target="_blank" class="text-muted-foreground hover:text-foreground">
              <svg class="w-6 h-6" viewBox="0 0 24 24">
                <path :d="mdiBookOpenPageVariant " fill="currentColor" />
              </svg>
            </a>
            <a v-if="github" :href="github" target="_blank" class="text-muted-foreground hover:text-foreground">
              <svg class="w-6 h-6" viewBox="0 0 24 24">
                <path :d="mdiGithub" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  transition: transform 0.2s ease-in-out;
}

.project-card:hover {
  transform: translateY(-4px);
}
</style>
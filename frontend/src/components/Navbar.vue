<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>

<template>
  <nav class="w-full border-b border-border bg-background">
    <div class="container flex h-16 items-center justify-between px-4">
      <a href="/" class="text-xl font-bold">Siea.dev</a>
      
      <!-- Navigation Links -->
      <div class="flex space-x-6">
        <router-link 
          to="/" 
          class="text-foreground/60 transition-colors hover:text-foreground"
          :class="{ 'text-foreground': $route.path === '/' }"
        >
          Home
        </router-link>
        <router-link 
          to="/projects" 
          class="text-foreground/60 transition-colors hover:text-foreground"
          :class="{ 'text-foreground': $route.path === '/projects' }"
        >
          Projects
        </router-link>
        <router-link 
          to="/balu" 
          class="text-foreground/60 transition-colors hover:text-foreground"
          :class="{ 'text-foreground': $route.path === '/balu' }"
        >
          Balu
        </router-link>
        <router-link 
          to="/contact" 
          class="text-foreground/60 transition-colors hover:text-foreground"
          :class="{ 'text-foreground': $route.path === '/contact' }"
        >
          Contact
        </router-link>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon">
              <Icon icon="radix-icons:moon" 
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icon icon="radix-icons:sun" 
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="mode = 'light'">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'auto'">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
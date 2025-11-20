<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import logo from "/logo.svg" 
import { ref } from 'vue'

const mode = useColorMode()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <div class="flex-shrink-0 flex-1 flex justify-start">
          <a href="/" class="flex items-center gap-2 text-xl font-bold">
            <img :src="logo" alt="Pixel Services Logo" class="h-8 w-auto" />
            <span>SIEA.DEV</span>
          </a>
        </div>

        <div class="hidden md:flex flex-1 justify-center">
          <div class="flex space-x-8">
            <router-link 
              to="/" 
              class="text-foreground/60 transition-colors hover:text-foreground font-medium"
              :class="{ 'text-foreground': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link 
              to="/projects" 
              class="text-foreground/60 transition-colors hover:text-foreground font-medium"
              :class="{ 'text-foreground': $route.path === '/projects' }"
            >
              Projects
            </router-link>
            <router-link 
              to="/contact" 
              class="text-foreground/60 transition-colors hover:text-foreground font-medium"
              :class="{ 'text-foreground': $route.path === '/contact' }"
            >
              Contact
            </router-link>
            <a 
              href="https://docs.siea.dev" 
              target="_blank"
              class="text-foreground/60 transition-colors hover:text-foreground font-medium"
            >
              Docs
            </a>
          </div>
        </div>

        <div class="flex items-center gap-4 flex-1 justify-end">
          <div class="hidden md:block">
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

          <button 
            class="md:hidden"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <Icon 
              :icon="isMenuOpen ? 'radix-icons:cross-1' : 'radix-icons:hamburger-menu'" 
              class="h-6 w-6"
            />
          </button>
        </div>
      </div>

      <div 
        class="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden z-50"
        :class="{ 'hidden': !isMenuOpen }"
      >
        <div class="container px-4 py-4 flex flex-col space-y-4">
          <router-link 
            v-for="route in [
              { path: '/', name: 'Home' },
              { path: '/projects', name: 'Projects' },
              { path: '/contact', name: 'Contact' },
              { path: '/tos', name: 'TOS' },
            ]"
            :key="route.path"
            :to="route.path"
            class="text-foreground/60 transition-colors hover:text-foreground py-2"
            :class="{ 'text-foreground': $route.path === route.path }"
            @click="isMenuOpen = false"
          >
            {{ route.name }}
          </router-link>
          <a 
            href="https://docs.siea.dev" 
            target="_blank"
            class="text-foreground/60 transition-colors hover:text-foreground py-2"
            @click="isMenuOpen = false"
          >
            Docs
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="w-full justify-start">
                <Icon icon="radix-icons:moon" class="mr-2 h-4 w-4" />
                Theme
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="z-50">
              <DropdownMenuItem @click="mode = 'light'">Light</DropdownMenuItem>
              <DropdownMenuItem @click="mode = 'dark'">Dark</DropdownMenuItem>
              <DropdownMenuItem @click="mode = 'auto'">System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </nav>
</template>
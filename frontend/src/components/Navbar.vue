<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import logo from "/logo.svg" 
import { ref } from 'vue'

const mode = useColorMode({
  attribute: 'class',
  modes: {
    light: 'light',
    dark: 'dark',
  },
})
const { store } = mode
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleTheme() {
  if (store.value === 'light') store.value = 'dark'
  else if (store.value === 'dark') store.value = 'auto'
  else store.value = 'light'
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
              to="/journey" 
              class="text-foreground/60 transition-colors hover:text-foreground font-medium"
              :class="{ 'text-foreground': $route.path === '/journey' }"
            >
              Journey
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
              rel="noopener"
              class="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Docs
              <Icon icon="radix-icons:arrow-top-right" class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div class="flex items-center gap-4 flex-1 justify-end">
          <Button
            variant="outline"
            size="icon"
            class="hidden md:inline-flex relative"
            aria-label="Toggle theme"
            @click="toggleTheme"
          >
            <Icon
              v-if="store === 'light'"
              icon="radix-icons:sun"
              class="h-[1.2rem] w-[1.2rem]"
            />
            <Icon
              v-else-if="store === 'dark'"
              icon="radix-icons:moon"
              class="h-[1.2rem] w-[1.2rem]"
            />
            <Icon
              v-else
              icon="radix-icons:desktop"
              class="h-[1.2rem] w-[1.2rem]"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>

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
              { path: '/journey', name: 'Journey' },
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
            rel="noopener"
            class="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground py-2"
            @click="isMenuOpen = false"
          >
            Docs
            <Icon icon="radix-icons:arrow-top-right" class="h-3.5 w-3.5" />
          </a>

          <Button variant="outline" class="w-full justify-start" @click="toggleTheme">
            <Icon
              v-if="store === 'light'"
              icon="radix-icons:sun"
              class="mr-2 h-4 w-4"
            />
            <Icon
              v-else-if="store === 'dark'"
              icon="radix-icons:moon"
              class="mr-2 h-4 w-4"
            />
            <Icon
              v-else
              icon="radix-icons:desktop"
              class="mr-2 h-4 w-4"
            />
            {{ store === 'auto' ? 'System' : store === 'dark' ? 'Dark' : 'Light' }}
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

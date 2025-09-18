<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from '@/components/Footer.vue'
import { Toaster } from '@/components/ui/toast'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const konami = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'
]
const progress = ref(0)
const showSecret = ref(false)

function handleKeydown(e: KeyboardEvent) {
  const expected = konami[progress.value]
  if (e.key === expected) {
    progress.value += 1
    if (progress.value === konami.length) {
      progress.value = 0
      showSecret.value = true
    }
  } else {
    progress.value = e.key === konami[0] ? 1 : 0
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="min-h-screen">
      <Toaster/>
      <Navbar />
      <router-view></router-view>
      <Footer />
  </div>
  <Dialog :open="showSecret" @update:open="showSecret = $event">
      <DialogContent class="sm:max-w-[425px]">
        <p class="about-text">
          Congrats! You found a secret Balu!
        </p>
        <img 
          src="/balu/balu-secret.jpg" 
          alt="Secret Balu" 
          class="w-full h-auto rounded-lg"
        />
      </DialogContent>
    </Dialog>
</template>
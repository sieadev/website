<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const email = ref('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const clickCount = ref(0)
const showSecret = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // TODO: Implement newsletter signup logic
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
  showSuccess.value = true
  isSubmitting.value = false
}

const handleCozyClick = () => {
  clickCount.value++
  if (clickCount.value === 5) {
    showSecret.value = true
    clickCount.value = 0
  }
}
</script>

<template>
  <div class="flex flex-col items-center p-4 py-16 min-h-screen">
    <!-- Existing sections remain the same, just fixing some spacing -->
    <div class="max-w-4xl w-full space-y-24">
      <!-- Balu Introduction Section -->
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <img 
          src="/balu/balu.jpg" 
          alt="Balu Logo" 
          class="w-64 h-64 object-cover rounded-lg"
        />
        <div class="space-y-4">
          <h1 class="text-4xl font-bold">Meet Balu</h1>
          <p class="about-text text-left">
            This is Balu, my Dog. He is a 4-year-old Windhound-Mix and he is a huge fan of Java. Balu is one of the most recognizable members of the Spigot community, and he does not even know it.
          </p>
        </div>
      </div>
    </div>

    <!-- Balu Winter Section -->
    <div class="max-w-4xl w-full mb-16">
      <div class="flex flex-col md:flex-row-reverse gap-8 items-center">
        <img 
            src="/balu/balu-cozy.jpg" 
            alt="Balu in his winter sweater" 
            class="w-64 h-64 object-cover rounded-lg cursor-pointer"
            @click="handleCozyClick"
          />
        <div class="space-y-4">
          <h2 class="text-3xl font-bold">Cozy Coding Companion</h2>
          <p class="about-text text-left">
            During the chilly winter months, Balu loves to stay warm in his favorite sweater while helping me debug code. He's particularly fond of curling up next to me on the bed, providing moral support during those long coding sessions.
          </p>
      </div>
    </div>

    <!-- Balu Style Section -->
    <div class="max-w-4xl w-full mb-16">
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <img 
          src="/balu/balu-style.png" 
          alt="Balu looking stylish" 
          class="w-64 h-64 object-cover rounded-lg"
        />
        <div class="space-y-4">
          <h2 class="text-3xl font-bold">Style & Grace</h2>
          <p class="about-text text-left">
            Not just a coding enthusiast, Balu knows how to rock any occasion. With his natural elegance and graceful posture, he turns heads wherever he goes. Whether he's reviewing pull requests or going for walks, Balu proves that developers can be fashionable too.
          </p>
        </div>
      </div>
    </div>

    <!-- Newsletter Signup Section -->
    <div class="max-w-2xl w-full mx-auto space-y-8 text-center">
      <h2 class="text-3xl font-bold">Join Our Newsletter</h2>
      <p class="about-text">
          Still can not get enough of Balu? Subscribe to our newsletter to receive daily pictures and cool insights about Balu!
      </p>
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-4" v-if="!showSuccess">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            v-model="email"
            type="email"
            required
            class="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
          <Button :loading="isSubmitting" type="submit">
            Subscribe
          </Button>
        </div>
      </form>
    </div>

    <div v-if="showSuccess" class="bg-green-50 p-6 rounded-lg">
      <h3 class="text-xl font-semibold text-green-800">Thank you for subscribing!</h3>
      <p class="text-green-700 mt-2">You will receive Balu's next newsletter in your inbox tomorrow!</p>
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
    </div>
  </div>
</template>

<style>
.about-text {
  margin-top: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: hsl(var(--muted-foreground));
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}

* {
  -ms-overflow-style: none;
}
</style>
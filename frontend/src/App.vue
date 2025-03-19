<script setup lang="ts">
import Hero from "./components/Hero.vue";
import Navbar from "./components/Navbar.vue";
import TechStack from "./components/TechStack.vue";
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <div class="flex flex-col items-center justify-center">
      <div class="flex items-center justify-center">
        <Hero />
      </div>
      <TechStack />
    </div>
  </div>
</template>
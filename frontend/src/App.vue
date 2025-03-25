<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from '@/components/Footer.vue'
import { Toaster } from '@/components/ui/toast'
</script>

<template>
  <div class="min-h-screen">
      <Toaster/>
      <Navbar />
      <router-view></router-view>
      <Footer />
  </div>
</template>
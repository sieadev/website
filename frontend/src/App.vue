<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { Toaster } from '@/components/ui/toast'
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <router-view></router-view>
  </div>
</template>
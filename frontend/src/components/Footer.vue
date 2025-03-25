<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t mt-auto">
    <div class="container mx-auto py-4 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- About Section -->
        <div class="space-y-2">
          <h3 class="font-semibold">About</h3>
          <p class="text-muted-foreground text-sm">
            Software developer crafting elegant Java and web solutions.
          </p>
        </div>

        <!-- Terms of Service -->
        <div class="space-y-2">
          <h3 class="font-semibold">Legal</h3>
          <ul>
            <li>
              <router-link to="/tos" class="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms of Service
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="space-y-2">
          <h3 class="font-semibold">Connect</h3>
          <div class="flex space-x-4">
            <a
              href="https://github.com/sieadev"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/sieadev"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              href="https://instagram.com/sieadev"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://discord.gg/KTF3Wsk85G"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <i class="fab fa-discord"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t mt-4 pt-4 text-center text-xs text-muted-foreground">
        <p>&copy; {{ currentYear }} Sieadev. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
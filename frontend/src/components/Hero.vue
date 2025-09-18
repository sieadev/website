<script setup lang="ts">
import { mdiOfficeBuilding, mdiGithub, mdiLinkedin} from '@mdi/js'
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <Card class="hero-container">
    <CardContent class="hero-content">
      <div class="name-section">
        <h1 class="name-container">
          <span class="name-default">Sieadev</span>
          <span class="name-hover">↑ ↑ ↓ ↓ ← → ← →</span>
        </h1>
        <div class="title-container">
          <span class="title">Fullstack Developer</span>
          <div class="company">
            <a href="https://pixel-services.com" target="_blank" class="company-link">
              <svg class="company-icon" viewBox="0 0 24 24">
                <path :d="mdiOfficeBuilding" />
              </svg>
              <span>Pixel Services</span>
            </a>
          </div>
        </div>
        <p class="about-text">
          Hey im Finley Voßwinkel, often known as Sieadev. Im an 18 year old fullstack developer from Germany. In 2024 I started my own Hosting and Software Company where I now work in Backend Development. 
        </p>
        <div class="social-links">
          <a href="https://github.com/sieadev" target="_blank" class="social-link">
            <svg viewBox="0 0 24 24">
              <path :d="mdiGithub" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/finley-voßwinkel-99097128b" target="_blank" class="social-link">
            <svg viewBox="0 0 24 24">
              <path :d="mdiLinkedin" />
            </svg>
          </a>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.hero-container {
  min-height: 50vh;  
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%);
  border: none;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name-section {
  text-align: left;
}

h1 {
  font-size: 4.5rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.title {
  font-size: 1.8rem;
  color: hsl(var(--muted-foreground));
  font-weight: 500;
}

.company {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 2rem;
  border-left: 2px solid hsl(var(--border));
}

.company-icon {
  width: 2rem;
  height: 2rem;
  fill: currentColor;
  color: hsl(var(--foreground));
}

.company span {
  color: hsl(var(--foreground));
  font-size: 1.2rem;
  font-weight: 500;
}

.about-text {
  margin-top: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: hsl(var(--muted-foreground));
  max-width: 600px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }

  .title-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .company {
    padding-left: 0;
    border-left: none;
  }

  .title {
    font-size: 1.5rem;
  }

  .about-text {
    font-size: 1rem;
    margin-top: 1.5rem;
  }
}

.name-container {
  position: relative;
  display: inline-block;
  width: max-content;
}

.name-default,
.name-hover {
  display: inline-block;
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
}

.name-hover {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.name-container:hover .name-default {
  opacity: 0;
}

.name-container:hover .name-hover {
  opacity: 1;
}

.company-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;
}

.company-link:hover {
  opacity: 0.8;
}

.social-links {
  margin-top: 2rem;
  display: flex;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: hsl(var(--foreground));
  transition: all 0.2s ease-in-out;
}

.social-link svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.social-link:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .social-links {
    margin-top: 1.5rem;
    gap: 1.25rem;
  }
}
</style>
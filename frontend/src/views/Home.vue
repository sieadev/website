<script setup lang="ts">
import Hero from "@/components/Hero.vue";
import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  mdiLanguageTypescript,
  mdiLanguageJavascript,
  mdiLanguagePython,
  mdiLanguageJava,
  mdiLanguageHtml5,
  mdiLanguageC,
  mdiLanguageCss3,
  mdiLanguageCsharp,
  mdiLanguageRust,
  mdiAlphaKBox,
  mdiPackage,
  mdiVuejs,
  mdiLightningBolt,
  mdiDocker,
  mdiGit,
  mdiLinux,
  mdiServer,
  mdiDatabase,
  mdiLeaf,
  mdiAws,
  mdiWateringCan,
  mdiSend,
  mdiMessageFast
} from "@mdi/js";

type Skill = {
  name: string
  icon: string
  startYear: number
};

type Category = {
  key: string
  label: string
  skills: Skill[]
};

const categories = ref<Category[]>([
  {
    key: "langs",
    label: "Languages",
    skills: [
      { name: "Java", icon: mdiLanguageJava, startYear: 2019 },
      { name: "Python", icon: mdiLanguagePython, startYear: 2020 },
      { name: "HTML5", icon: mdiLanguageHtml5, startYear: 2021 },
      { name: "CSS3", icon: mdiLanguageCss3, startYear: 2021 },
      { name: "JavaScript", icon: mdiLanguageJavascript, startYear: 2021 },
      { name: "TypeScript", icon: mdiLanguageTypescript, startYear: 2023 },
      { name: "C", icon: mdiLanguageC, startYear: 2024 },
      { name: "C#", icon: mdiLanguageCsharp, startYear: 2024 },
      { name: "Rust", icon: mdiLanguageRust, startYear: 2024 },
      { name: "Kora", icon: mdiAlphaKBox, startYear: 2025 }
    ],
  },
  {
    key: "frameworks",
    label: "Frameworks",
    skills: [
      { name: "Spigot", icon: mdiWateringCan, startYear: 2020 },
      { name: "Paper", icon: mdiSend, startYear: 2021 },
      { name: "Spring", icon: mdiLeaf, startYear: 2023 },
      { name: "JDA", icon: mdiMessageFast, startYear: 2023 },
      { name: "Vue", icon: mdiVuejs, startYear: 2024 },
      { name: "Jonion", icon: mdiPackage, startYear: 2024 },
      { name: "Flash", icon: mdiLightningBolt, startYear: 2024 },
      { name: "Quarkus", icon: mdiLeaf, startYear: 2025 }
    ],
  },
  {
    key: "software",
    label: "Software",
    skills: [
      { name: "Linux", icon: mdiLinux, startYear: 2019 },
      { name: "Git", icon: mdiGit, startYear: 2020 },
      { name: "Docker", icon: mdiDocker, startYear: 2023 },
      { name: "NGINX", icon: mdiServer, startYear: 2023 },
      { name: "AWS", icon: mdiAws, startYear: 2023 },
    ],
  },
  {
    key: "databases",
    label: "Databases",
    skills: [
      { name: "SQL", icon: mdiDatabase, startYear: 2022 },
      { name: "MySQL", icon: mdiDatabase, startYear: 2022 },
      { name: "SQLite", icon: mdiDatabase, startYear: 2023 },
      { name: "MongoDB", icon: mdiLeaf, startYear: 2024 },
      { name: "Postgre", icon: mdiDatabase, startYear: 2025 },
    ],
  },
]);

const selectedKey = ref<string>(categories.value[0]?.key ?? "langs");
const currentYear = new Date().getFullYear();

function yearsSince(year: number): number {
  return Math.max(0, currentYear - year);
}

function levelClass(year: number): string {
  const yrs = yearsSince(year);
  if (yrs < 1) return "bg-muted/40 text-muted-foreground border-muted";
  if (yrs < 2) return "bg-secondary text-secondary-foreground border-secondary/40";
  if (yrs < 3) return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  if (yrs < 4) return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
  if (yrs < 5) return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  if (yrs < 10) return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
  return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
}


function formatExperience(year: number): string {
  const yrs = yearsSince(year);
  if (yrs === 0) return '<1 yr';
  if (yrs === 1) return '1+ yr';
  return `${yrs}+ yrs`;
}


const selectedCategory = computed(() =>
  categories.value.find((c) => c.key === selectedKey.value)
);
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center justify-center">
      <Hero />
    </div>
    

    <div class="w-full max-w-2xl px-4 sm:min-h-[45vh] pb-10 sm:pb-0">

      <Card>
          <CardHeader>
            <CardTitle>My Skill Set</CardTitle>
          </CardHeader>
        <CardContent>
          <div class="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div class="inline-flex rounded-md border p-1 bg-card gap-1">
              <template v-for="c in categories" :key="c.key">
                <Button
                  variant="ghost"
                  :class="[
                    'px-3 py-1 h-9 rounded-md',
                    selectedKey === c.key ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                  ]"
                  @click="selectedKey = c.key"
                >
                  {{ c.label }}
                </Button>
              </template>
            </div>
          </div>

          <div
            v-if="selectedCategory"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            <div
              v-for="s in selectedCategory.skills"
              :key="s.name"
              :class="['flex items-center gap-3 border rounded-md p-3', levelClass(s.startYear)]"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path :d="s.icon" />
              </svg>
              <div class="flex flex-col">
                <span class="font-medium leading-none">{{ s.name }}</span>
                <span class="text-xs text-muted-foreground">since {{ s.startYear }} · {{ formatExperience(s.startYear) }}</span>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  </div>
</template>
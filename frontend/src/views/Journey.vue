<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { journeyEntries, type JourneyEntry } from '@/data/journey';
import { Icon } from '@iconify/vue';

// Sort entries by start date (most recent first)
const sortedEntries = computed(() => {
  return [...journeyEntries].sort((a, b) => {
    // Extract year and month for comparison
    const getDateValue = (dateStr: string): number => {
      if (dateStr.includes('-')) {
        const [year, month] = dateStr.split('-').map(Number);
        return year * 12 + (month - 1);
      }
      return parseInt(dateStr) * 12;
    };
    
    const dateA = getDateValue(a.startDate);
    const dateB = getDateValue(b.startDate);
    return dateB - dateA; // Descending order
  });
});

function formatDate(dateString: string): string {
  // If the date string includes a month (has a dash), parse as YYYY-MM
  if (dateString.includes('-')) {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    return `${monthName} ${year}`;
  }
  // Otherwise, just show the year
  return dateString;
}

function formatDateRange(entry: JourneyEntry): string {
  const start = formatDate(entry.startDate);
  const end = entry.endDate ? formatDate(entry.endDate) : 'Present';
  return `${start} - ${end}`;
}

function getTypeIcon(type: JourneyEntryType): string {
  return type === 'education' ? 'mdi:school' : 'mdi:briefcase';
}

function getTypeColor(type: JourneyEntryType): string {
  return type === 'education' 
    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' 
    : 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
}
</script>

<template>
  <div class="container mx-auto py-16 px-4">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">My Journey</h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        A timeline of my educational and professional journey.
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

        <div class="space-y-8">
          <div
            v-for="(entry, index) in sortedEntries"
            :key="entry.id"
            class="relative"
          >
            <!-- Timeline dot -->
            <div class="absolute left-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block z-10"></div>

            <Card class="md:ml-16">
              <CardHeader>
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <div :class="['inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium', getTypeColor(entry.type)]">
                        <Icon :icon="getTypeIcon(entry.type)" class="w-4 h-4" />
                        <span>{{ entry.type === 'education' ? 'Education' : 'Job' }}</span>
                      </div>
                    </div>
                    <CardTitle class="text-2xl mb-1">{{ entry.title }}</CardTitle>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                      <span v-if="entry.organization" class="font-medium">{{ entry.organization }}</span>
                      <span v-if="entry.location" class="text-sm">{{ entry.location }}</span>
                    </div>
                    <p class="text-sm text-muted-foreground mt-2">
                      {{ formatDateRange(entry) }}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p v-if="entry.description" class="text-muted-foreground mb-4">
                  {{ entry.description }}
                </p>
                
                <div v-if="entry.skills && entry.skills.length > 0" class="mt-4">
                  <h3 class="text-sm font-semibold mb-2 text-foreground">Skills Acquired:</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skill in entry.skills"
                      :key="skill"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


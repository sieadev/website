<script setup lang="ts">
import UnitLabel from '@/components/rack/UnitLabel.vue'
import JourneyUnit from '@/components/rack/JourneyUnit.vue'
import { journeyChronological } from '@/data/journey'

const entries = journeyChronological(true)
</script>

<template>
  <UnitLabel id="page-title" :level="1" title="Journey" note="School, work and the company. Newest at the top; the lit unit is the one still running." />
  <JourneyUnit v-for="e in entries" :key="e.id" :entry="e" detailed :heading-level="2" />
</template>

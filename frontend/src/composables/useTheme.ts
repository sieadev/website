import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

export type ThemeChoice = 'light' | 'dark' | 'auto'

const order: ThemeChoice[] = ['light', 'dark', 'auto']
const labels: Record<ThemeChoice, string> = { light: 'Light', dark: 'Dark', auto: 'System' }

export function useTheme() {
  const mode = useColorMode({ attribute: 'class', modes: { light: 'light', dark: 'dark' } })
  const choice = computed(() => mode.store.value as ThemeChoice)
  const label = computed(() => labels[choice.value])
  const isDark = computed(() => mode.state.value === 'dark')

  function cycle() {
    mode.store.value = order[(order.indexOf(choice.value) + 1) % order.length]
  }
  function set(next: ThemeChoice) {
    mode.store.value = next
  }

  return { choice, label, isDark, cycle, set, options: order.map((value) => ({ value, label: labels[value] })) }
}

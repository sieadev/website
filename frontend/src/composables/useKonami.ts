import { onBeforeUnmount, onMounted, ref } from 'vue'

export const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'] as const

export const BALU_SRC = '/balu/balu-secret.jpg'

/** Listens for the Konami arrows and flips `unlocked` when the sequence completes. */
export function useKonami() {
  const progress = ref(0)
  const unlocked = ref(false)

  function onKeydown(e: KeyboardEvent) {
    if (e.key === KONAMI[progress.value]) {
      progress.value += 1
      if (progress.value === KONAMI.length) {
        progress.value = 0
        unlocked.value = true
      }
    } else {
      progress.value = e.key === KONAMI[0] ? 1 : 0
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

  return { progress, unlocked }
}

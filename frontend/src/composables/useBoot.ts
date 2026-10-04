import { onBeforeUnmount, onMounted, ref } from 'vue'

const KEY = 'siea-booted'

/**
 * Power-on sequence for the hero server: returns a step counter that climbs from 0
 * to `steps`, and the LCD lines typed out character by character.
 * Runs once per browser session; reduced motion or a repeat visit skips straight to the end.
 */
export function useBoot(lines: string[], steps = 4) {
  const step = ref(0)
  const typed = ref<string[]>(lines.map(() => ''))
  const done = ref(false)
  const timers: number[] = []

  function finish() {
    step.value = steps
    typed.value = [...lines]
    done.value = true
  }

  onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === '1'
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* storage blocked: just play it */
    }
    if (reduce || seen) return finish()

    for (let i = 1; i <= steps; i++) timers.push(window.setTimeout(() => (step.value = i), 180 + i * 260))

    let t = 180 + steps * 260
    lines.forEach((line, li) => {
      for (let c = 1; c <= line.length; c++) {
        timers.push(window.setTimeout(() => {
          typed.value[li] = line.slice(0, c)
        }, t))
        t += 18
      }
      t += 120
    })
    timers.push(window.setTimeout(() => (done.value = true), t))
  })

  onBeforeUnmount(() => timers.forEach(clearTimeout))

  return { step, typed, done, skip: finish }
}

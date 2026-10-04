import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** Tracks which of the given element ids is currently nearest the top third of the viewport. */
export function useScrollSpy(ids: Ref<string[]>) {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | null = null
  const visible = new Map<string, number>()

  function observe() {
    observer?.disconnect()
    visible.clear()
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top)
          else visible.delete(e.target.id)
        }
        const first = ids.value.find((id) => visible.has(id))
        active.value = first ?? null
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    for (const id of ids.value) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  }

  onMounted(() => requestAnimationFrame(observe))
  onBeforeUnmount(() => observer?.disconnect())

  return { active, refresh: observe }
}

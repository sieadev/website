<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const title = ref('')
const message = ref('')

// XOR-obfuscated bytes for contact@siea.dev — never stored as plaintext in the bundle
const KEY = 0x5a
const ENCODED = [57, 53, 52, 46, 59, 57, 46, 26, 41, 51, 63, 59, 116, 62, 63, 44]

function decodeEmail(): string {
  return String.fromCharCode(...ENCODED.map((b) => b ^ KEY))
}

function handleSubmit(event: Event) {
  event.preventDefault()

  if (!title.value || !message.value) {
    return
  }

  const address = decodeEmail()
  const subject = encodeURIComponent(title.value)
  const body = encodeURIComponent(message.value)

  window.location.href = `mailto:${address}?subject=${subject}&body=${body}`
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[85vh] p-4">
    <div class="max-w-2xl w-full space-y-8">
      <Card class="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle class="text-2xl">Contact Me</CardTitle>
          <CardDescription>
            Send me a message and I'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <label for="title" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Title
              </label>
              <Input id="title" name="title" v-model="title" required placeholder="What's this about?" />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Message
              </label>
              <Textarea
                  id="message"
                  name="message"
                  v-model="message"
                  required
                  placeholder="What would you like to say?"
                  class="min-h-[150px]"
              />
            </div>

            <Button type="submit" class="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { openMail } from '@/lib/email'

const title = ref('')
const message = ref('')


function handleSubmit(event: Event) {
  event.preventDefault()

  if (!title.value || !message.value) {
    return
  }

  openMail(title.value, message.value)
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

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const name = ref('')
const email = ref('')
const message = ref('')

const isSubmitting = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()

  isSubmitting.value = true

  if (!name.value || !email.value || !message.value) {
    return
  }

  try {
    const response = await fetch(`/api/contact?name=${encodeURIComponent(name.value)}&email=${encodeURIComponent(email.value)}&message=${encodeURIComponent(message.value)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(!response.ok) {
      throw new Error('🥀 aw hell nah')
    }

  } catch (error) {
    console.error('😥 Subscription error: ', error);
  } finally {
    isSubmitting.value = false;
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })
  }

  name.value = ''
  email.value = ''
  message.value = ''
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
              <label for="name" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Name
              </label>
              <Input id="name" name="name" v-model="name" required placeholder="Your name" />
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="your@email.com"
              />
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

            <Button :loading="isSubmitting" type="submit" class="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
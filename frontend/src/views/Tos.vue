<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <div class="container mx-auto py-16 px-4">
    <div class="max-w-3xl mx-auto space-y-8">
      <h1 class="text-4xl font-bold text-center">Terms of Service</h1>
      
      <Card>
        <CardContent class="pt-6 space-y-6">
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement.</p>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on SIEA's website for personal, non-commercial transitory viewing only.</p>
            <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on SIEA's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">3. Disclaimer</h2>
            <p>The materials on SIEA's website are provided on an 'as is' basis. SIEA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">4. Limitations</h2>
            <p>In no event shall SIEA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SIEA's website.</p>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">5. Revisions</h2>
            <p>The materials appearing on SIEA's website could include technical, typographical, or photographic errors. SIEA does not warrant that any of the materials on its website are accurate, complete or current. SIEA may make changes to the materials contained on its website at any time without notice.</p>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">6. Links</h2>
            <p>SIEA has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SIEA of the site. Use of any such linked website is at the user's own risk.</p>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">7. Data Privacy</h2>
            <p>When you provide personal information such as your email address, name, or message content through our newsletter subscription or contact forms, we ensure that:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>Your data is stored securely and protected</li>
              <li>Your data is only used for the intended purpose (newsletter delivery or responding to inquiries)</li>
              <li>You can request deletion of your personal data at any time by contacting contact@siea.dev</li>
              <li>We do not share your personal information with third parties</li>
            </ul>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-semibold">8. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
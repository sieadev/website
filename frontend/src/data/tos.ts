export interface TosSection {
  title: string
  paragraphs: string[]
  list?: string[]
  /** Paragraphs rendered after the list */
  after?: string[]
}

export const tosSections: TosSection[] = [
  {
    title: 'Acceptance of terms',
    paragraphs: ['By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement.']
  },
  {
    title: 'Use license',
    paragraphs: [
      "Permission is granted to temporarily download one copy of the materials (information or software) on SIEA's website for personal, non-commercial transitory viewing only.",
      'This is the grant of a license, not a transfer of title, and under this license you may not:'
    ],
    list: [
      'Modify or copy the materials',
      'Use the materials for any commercial purpose',
      "Attempt to decompile or reverse engineer any software contained on SIEA's website",
      'Remove any copyright or other proprietary notations from the materials'
    ]
  },
  {
    title: 'Disclaimer',
    paragraphs: [
      "The materials on SIEA's website are provided on an 'as is' basis. SIEA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    ]
  },
  {
    title: 'Limitations',
    paragraphs: [
      "In no event shall SIEA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SIEA's website."
    ]
  },
  {
    title: 'Revisions',
    paragraphs: [
      "The materials appearing on SIEA's website could include technical, typographical, or photographic errors. SIEA does not warrant that any of the materials on its website are accurate, complete or current. SIEA may make changes to the materials contained on its website at any time without notice."
    ]
  },
  {
    title: 'Links',
    paragraphs: [
      "SIEA has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SIEA of the site. Use of any such linked website is at the user's own risk."
    ]
  },
  {
    title: 'Data privacy',
    paragraphs: [
      'When you provide personal information such as your email address, name, or message content through our newsletter subscription or contact forms, we ensure that:'
    ],
    list: [
      'Your data is stored securely and protected',
      'Your data is only used for the intended purpose (newsletter delivery or responding to inquiries)',
      'You can request deletion of your personal data at any time by contacting contact@siea.dev',
      'We do not share your personal information with third parties'
    ]
  },
  {
    title: 'Governing law',
    paragraphs: [
      'These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.'
    ]
  }
]

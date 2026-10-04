export interface ProfileLink {
  label: string
  href: string
  /** Short handle shown next to the label, e.g. "@sieadev" */
  handle?: string
}

export const profile = {
  name: 'Finley Voßwinkel',
  firstName: 'Finley',
  handle: 'Sieadev',
  domain: 'siea.dev',
  role: 'Fullstack developer',
  age: 19,
  startedCodingAt: 15,
  location: 'Essen, Germany',
  company: {
    name: 'Pixel Services',
    href: 'https://pixel-services.com',
    role: 'Founder',
    summary: 'Server hosting and development services.'
  },
  bio: "Hey, I'm Finley Voßwinkel, often known as Sieadev. I'm a 19-year-old fullstack developer from Germany. I started coding when I was 15 and have found great joy in backend development.",
  short: 'Fullstack developer from Essen, mostly backend. I build modular Java frameworks and run Pixel Services.',
  links: {
    github: { label: 'GitHub', href: 'https://github.com/sieadev', handle: 'sieadev' },
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/finley-voßwinkel-99097128b', handle: 'Finley Voßwinkel' },
    docs: { label: 'Docs', href: 'https://docs.siea.dev', handle: 'docs.siea.dev' },
    discord: { label: 'Discord', href: 'https://discord.gg/KTF3Wsk85G', handle: 'Community server' }
  } satisfies Record<string, ProfileLink>
}

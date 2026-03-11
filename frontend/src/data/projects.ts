export interface ProjectItem {
  name: string
  description: string
  image: string
  tags: string[]
  github?: string
  docs?: string
  /** Slug for detail page; omit for blurred teaser (always last in list) */
  slug?: string
}

export const projects: ProjectItem[] = [
  {
    name: 'Jonion',
    description: 'Jonion is a lightweight, flexible plugin framework for Java applications. It provides a clean, modular architecture that makes it easy to build extensible systems by "layering" functionality through plugins.',
    image: '/projects/jonion.svg',
    tags: ['Java', 'Framework', 'Modular', 'API'],
    github: 'https://github.com/sieadev/Jonion',
    docs: 'https://docs.siea.dev/jonion/',
    slug: 'jonion'
  },
  {
    name: 'Mobot',
    description: 'A modular bot framework for Discord. Inspired by the Spigot Plugin System, Mobot allows developers to create custom modules that can be loaded and unloaded on the fly. With a feature-rich API, Mobot makes it easy for developers to create custom commands, events, and more.',
    image: '/projects/mobot.png',
    tags: ['Java', 'Discord API', 'Modular'],
    github: 'https://github.com/sieadev/mobot',
    docs: 'https://docs.siea.dev/mobot/',
    slug: 'mobot'
  },
  {
    name: 'Unifi4J',
    description: 'Unifi4J is a Java client for the Unifi Network API. It provides a reactive-style API so you can work with your Unifi controller programmatically—fetching sites, devices, and network info—either in a blocking way or asynchronously with callbacks and chained operations.',
    image: '/projects/unifi4j.svg',
    tags: ['Java', 'Unifi API', 'Reactive'],
    github: 'https://github.com/sieadev/unifi4j',
    docs: 'https://docs.siea.dev/unifi4j/',
    slug: 'unifi4j'
  },
  {
    name: 'Flash',
    description: 'A framework for Java designed to easily create small web applications. Flash is built on top of the Jetty web server and provides a simple and intuitive API for creating routes, controllers, and views.',
    image: '/projects/flash.png',
    tags: ['Java', 'Web', 'Framework'],
    github: 'https://github.com/pixel-services/flash'
    // no slug: always last, blurred, not clickable
  }
]

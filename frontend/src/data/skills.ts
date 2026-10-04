export interface Skill {
  name: string
  startYear: number
}

export interface SkillCategory {
  key: string
  label: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    key: 'langs',
    label: 'Languages',
    skills: [
      { name: 'Java', startYear: 2019 },
      { name: 'Python', startYear: 2020 },
      { name: 'HTML', startYear: 2021 },
      { name: 'CSS', startYear: 2021 },
      { name: 'JavaScript', startYear: 2021 },
      { name: 'TypeScript', startYear: 2023 },
      { name: 'C', startYear: 2024 },
      { name: 'C#', startYear: 2024 },
      { name: 'Rust', startYear: 2024 }
    ]
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    skills: [
      { name: 'Spigot', startYear: 2020 },
      { name: 'Paper', startYear: 2021 },
      { name: 'Spring', startYear: 2023 },
      { name: 'JDA', startYear: 2023 },
      { name: 'Vue', startYear: 2024 },
      { name: 'Jonion', startYear: 2024 },
      { name: 'Flash', startYear: 2024 },
      { name: 'Quarkus', startYear: 2025 }
    ]
  },
  {
    key: 'software',
    label: 'Software',
    skills: [
      { name: 'Linux', startYear: 2019 },
      { name: 'Git', startYear: 2020 },
      { name: 'Docker', startYear: 2023 },
      { name: 'NGINX', startYear: 2023 },
      { name: 'AWS', startYear: 2023 }
    ]
  },
  {
    key: 'databases',
    label: 'Databases',
    skills: [
      { name: 'SQL', startYear: 2022 },
      { name: 'MySQL', startYear: 2022 },
      { name: 'SQLite', startYear: 2023 },
      { name: 'MongoDB', startYear: 2024 },
      { name: 'PostgreSQL', startYear: 2025 }
    ]
  }
]

export function yearsSince(year: number, now = new Date()): number {
  return Math.max(0, now.getFullYear() - year)
}

export function formatExperience(year: number): string {
  const yrs = yearsSince(year)
  if (yrs === 0) return 'under a year'
  if (yrs === 1) return '1 year'
  return `${yrs} years`
}

export const allSkills: Skill[] = skillCategories.flatMap((c) => c.skills)

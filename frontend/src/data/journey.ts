export type JourneyEntryType = 'education' | 'job';

export interface JourneyEntry {
  id: string;
  title: string;
  organization?: string;
  location?: string;
  description?: string;
  type: JourneyEntryType;
  startDate: string; 
  endDate?: string;
  skills?: string[];
}

export const journeyEntries: JourneyEntry[] = [
  {
    id: 'highschool-leibniz',
    title: 'High School',
    organization: 'Leibnitz Gymnasium Essen',
    location: 'Essen, Germany',
    description: 'Started high school education with focus on english and chemistry.',
    type: 'education',
    startDate: '2017-08',
    endDate: '2024-12',
    skills: ['English', 'Chemistry']
  },
  {
    id: 'highschool-stoppenberg',
    title: 'High School',
    organization: 'Gymnasium am Stoppenberg',
    location: 'Essen, Germany',
    description: 'Completed high school education with focus on english and computer science.',
    type: 'education',
    startDate: '2024-12',
    endDate: '2025-07',
    skills: ['English', 'Computer Science']
  },
  {
    id: 'internship',
    title: 'System Administrator Intern',
    organization: 'KT-Systems',
    location: 'Essen, Germany',
    description: 'Working with Linux and Windows systems and learning about network administration.',
    type: 'job',
    startDate: '2023-06',
    endDate: '2023-07',
    skills: ['Linux', 'Windows Server']
  },
  {
    id: 'current-job',
    title: 'Founder',
    organization: 'Pixel Services',
    location: 'Essen, Germany',
    description: 'Providing Server Hosting and Development Services.',
    type: 'job',
    startDate: '2025-03',
    skills: ['Docker', 'Java', 'Typescript', 'Linux']
  }
];


function monthIndex(date: string): number {
  const [year, month = '1'] = date.split('-')
  return Number(year) * 12 + (Number(month) - 1)
}

/** Entries ordered by start date. Oldest first unless `newestFirst` is set. */
export function journeyChronological(newestFirst = false): JourneyEntry[] {
  const sorted = [...journeyEntries].sort((a, b) => monthIndex(a.startDate) - monthIndex(b.startDate))
  return newestFirst ? sorted.reverse() : sorted
}

export function formatJourneyDate(date: string, month: 'short' | 'long' = 'short'): string {
  if (!date.includes('-')) return date
  const [year, m] = date.split('-')
  const label = new Date(Number(year), Number(m) - 1).toLocaleString('en-GB', { month })
  return `${label} ${year}`
}

export function formatJourneyRange(entry: JourneyEntry, month: 'short' | 'long' = 'short'): string {
  const end = entry.endDate ? formatJourneyDate(entry.endDate, month) : 'present'
  return `${formatJourneyDate(entry.startDate, month)} – ${end}`
}

export function startYear(entry: JourneyEntry): number {
  return Number(entry.startDate.slice(0, 4))
}

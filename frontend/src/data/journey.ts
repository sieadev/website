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
    id: 'highschool',
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
    id: 'highschool',
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


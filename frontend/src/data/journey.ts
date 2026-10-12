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
    id: 'leibniz-gymnasium',
    title: 'High School',
    organization: 'Leibniz Gymnasium Essen',
    location: 'Essen, Germany',
    description: 'High school with a focus on English, chemistry, history and math. Part of Medien Scouts NRW and Be Strong for Kids.',
    type: 'education',
    startDate: '2022-08',
    endDate: '2024-09',
    skills: ['English', 'Chemistry', 'History', 'Math']
  },
  {
    id: 'gymnasium-am-stoppenberg',
    title: 'High School Diploma',
    organization: 'Gymnasium Am Stoppenberg',
    location: 'Essen, Germany',
    description: 'Completed high school with a focus on computer science and English.',
    type: 'education',
    startDate: '2024-10',
    endDate: '2025-06',
    skills: ['Computer Science', 'English']
  },
  {
    id: 'kt-systems',
    title: 'System Administrator Intern',
    organization: 'KT-Systems',
    location: 'Essen, Germany',
    description: 'Worked with Linux and Windows systems and learned about network administration.',
    type: 'job',
    startDate: '2023-06',
    endDate: '2023-07',
    skills: ['Linux', 'Windows Server']
  },
  {
    id: 'freelance',
    title: 'Software Developer',
    organization: 'Freelance',
    location: 'Germany (remote)',
    description: 'Commissioned software development for clients.',
    type: 'job',
    startDate: '2022-12',
    endDate: '2026-08',
    skills: ['JavaScript', 'English']
  },
  {
    id: 'pixel-services',
    title: 'CEO - Head of Software Development',
    organization: 'Pixel Services',
    location: 'Germany',
    description: 'Providing Server Hosting and Development Services.',
    type: 'job',
    startDate: '2025-05',
    skills: ['Docker', 'Java', 'Typescript', 'Linux']
  },
  {
    id: 'rit',
    title: 'Software Developer Apprentice',
    organization: 'R.iT GmbH',
    location: 'Bochum, Germany',
    description: 'Full-time apprenticeship in software development.',
    type: 'job',
    startDate: '2026-08',
    skills: ['Software Development', 'C#']
  },
  {
    id: 'tbs1',
    title: 'Vocational Degree, Computer Software Engineering',
    organization: 'TBS1 - Technische Berufliche Schule 1',
    location: 'Bochum, Germany',
    description: 'Vocational school alongside the apprenticeship at R.iT.',
    type: 'education',
    startDate: '2026-08',
    endDate: '2029-08',
    skills: ['Software Engineering']
  }
];

export interface SessionItem {
  id: number;
  title: string;
  description: string;
  topics: string[];
}

export interface CurriculumDay {
  day: number;
  title: string;
  focus: 'photo' | 'video';
  items: SessionItem[];
}

export enum GenerationType {
  PHOTO = 'Photo',
  VIDEO = 'Video'
}
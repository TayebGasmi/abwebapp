export interface SessionDto {
  id: number;
  title: string;
  description: string;
  startTime: string;  // ISO 8601 format string for LocalDateTime
  endTime: string;    // ISO 8601 format string for LocalDateTime
  sessionLink: string;
  capacity: number;
  status: string;
  tags: string[];
  lessonId: number;
  teacherId: number;
  students: number[];
}

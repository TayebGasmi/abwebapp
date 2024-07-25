export interface SessionDto {
  id: number;
  title: string;
  description: string;
  startTime: Date;  // ISO 8601 format string for LocalDateTime
  endTime: Date;    // ISO 8601 format string for LocalDateTime
  sessionLink: string;
  capacity: number;
  status: string;
  tags: string[];
  // lessonId: number;
  // teacherId: number;
  // students: number[];
}

export interface SessionDto {
  id: number;
  title: string;
  description: string;
  startTime: Date;  // ISO 8601 format string for LocalDateTime
  meetingLink: string;
  price: number;
  duration: number;
  status: string;
}

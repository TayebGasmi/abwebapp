export interface SessionDto {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  meetingLink: string;
  price: number;
  duration: number;
  status: string;
}

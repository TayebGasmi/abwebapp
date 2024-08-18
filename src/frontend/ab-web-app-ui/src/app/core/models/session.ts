export interface SessionDto {
  id: number;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  meetingLink?: string;
  price: number;
  duration: number;
  status: string;
}

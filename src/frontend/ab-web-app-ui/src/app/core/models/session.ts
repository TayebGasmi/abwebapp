export interface Session {
  sessionId: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  instructorName: string;
  courseName: string;
  sessionType: string;
  location: string;
  sessionLink: string;
  materials: string;
  capacity: number;
  registeredParticipants: number;
  sessionStatus: string;
  recordingLink: string;
  feedback: string;
  tags: string[];
}

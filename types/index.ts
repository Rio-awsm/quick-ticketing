export interface Ticket {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  type: 'student' | 'alumni' | 'relative';
  ticketCode: string;
  isPresent: boolean;
  createdAt: Date;
  presentAt?: Date;
}
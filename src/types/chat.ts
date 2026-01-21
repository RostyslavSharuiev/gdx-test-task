export type UserRole = 'user' | 'bot' | 'system';

export interface Message {
  role: UserRole;
  message: string;
  timestamp?: string;
}

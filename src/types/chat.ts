export type UserRole = 'user' | 'bot' | 'system';

export interface Message {
  role: UserRole;
  message: string;
  timestamp?: string;
}

export interface MessageRoleConfig {
  displayName: string;
  className?: string;
}

export const MESSAGE_ROLE_CONFIG: Record<UserRole, MessageRoleConfig> = {
  user: { displayName: 'You' },
  bot: { displayName: 'Eliza' },
  system: { displayName: 'System' },
};

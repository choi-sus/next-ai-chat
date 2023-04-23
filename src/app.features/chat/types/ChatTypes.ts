import type { ChatDataTypes } from './ChatDataTypes';
import type { MembersTypes } from './MembersTypes';

interface ChatTypes {
  roomId: number;
  members: MembersTypes[];
  message: string;
  chatData: ChatDataTypes[];
}

export type { ChatTypes };

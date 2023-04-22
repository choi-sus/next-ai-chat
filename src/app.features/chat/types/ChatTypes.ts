import { MembersTypes } from './membersTypes';

interface ChatTypes {
  roomId: number;
  members: MembersTypes[];
  message: string;
  chatData: { sender: string; msg: string; time: string }[];
}

export type { ChatTypes };

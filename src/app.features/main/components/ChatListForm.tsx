import React from 'react';

import { ElInput } from '@/components';

interface ChatListForm extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  roomInfo: { roomName: string; peopleNum: string };
  onChangeRoomInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isModal: string;
  useAddRoom: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatListForm = ({
  children,
  roomInfo,
  onChangeRoomInfo,
  useAddRoom,
}: ChatListForm) => {
  return (
    <form onSubmit={useAddRoom}>
      <ElInput
        margin="mb-20"
        title="방 이름"
        name="roomName"
        value={roomInfo.roomName}
        _onChange={onChangeRoomInfo}
      />
      <ElInput
        title="방 인원"
        name="peopleNum"
        value={roomInfo.peopleNum}
        _onChange={onChangeRoomInfo}
      />
      {children}
    </form>
  );
};

export default ChatListForm;

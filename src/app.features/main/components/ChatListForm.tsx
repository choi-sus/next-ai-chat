import React from 'react';

import { ElInput } from '@/components';

interface ChatListForm extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  roomName: string;
  onChangeRoomName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  peopleNum: string;
  onChangePeopleNum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createForm?: boolean;
  useAddRoom: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatListForm = ({
  children,
  roomName,
  onChangeRoomName,
  peopleNum,
  onChangePeopleNum,
  useAddRoom,
}: ChatListForm) => {
  return (
    <form onSubmit={useAddRoom}>
      <ElInput
        margin="mb-20"
        title="방 이름"
        value={roomName}
        _onChange={onChangeRoomName}
      />
      <ElInput
        title="방 인원"
        value={peopleNum}
        _onChange={onChangePeopleNum}
      />
      {children}
    </form>
  );
};

export default ChatListForm;

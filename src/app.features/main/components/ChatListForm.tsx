import React from 'react';

import { ElInput } from '@/components';

interface ChatListForm extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  roomName: string;
  onChangeRoomName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  peopleNum: string;
  onChangePeopleNum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createForm?: boolean;
}

const ChatListForm = ({
  children,
  roomName,
  onChangeRoomName,
  peopleNum,
  onChangePeopleNum,
  createForm,
}: ChatListForm) => {
  return (
    <form className="absolute bottom-0 left-0 w-full px-30">
      <div className={`${createForm ? 'block' : 'hidden'}`}>
        <ElInput
          title="방 이름"
          value={roomName}
          _onChange={onChangeRoomName}
        />
        <ElInput
          title="방 인원"
          value={peopleNum}
          _onChange={onChangePeopleNum}
        />
      </div>
      {children}
    </form>
  );
};

export default ChatListForm;

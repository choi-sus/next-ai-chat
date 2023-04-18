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
        placeholder="방 이름은 2~10글자 사이로 입력해 주세요."
      />
      <ElInput
        title="방 인원"
        name="peopleNum"
        value={roomInfo.peopleNum
          .replace(/[^0-9.]/g, '')
          .replace(/(\..*)\./g, '$1')}
        _onChange={onChangeRoomInfo}
        placeholder="방 인원은 2명~5명만 가능합니다."
      />
      {children}
    </form>
  );
};

export default ChatListForm;

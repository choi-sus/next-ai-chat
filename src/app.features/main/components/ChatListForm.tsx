import React from 'react';

import { ElInput } from '@/components';

import { numberReplace } from '../modules/function';
import type { RoomInfoState } from '../types/RoomInfoState';

interface ChatListFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  roomInfo: RoomInfoState;
  onChangeRoomInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatListForm = ({
  children,
  roomInfo,
  onChangeRoomInfo,
}: ChatListFormProps) => {
  return (
    <form>
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
        value={numberReplace(roomInfo.peopleNum)}
        _onChange={onChangeRoomInfo}
        placeholder="방 인원은 2명~5명만 가능합니다."
      />
      {children}
    </form>
  );
};

export default ChatListForm;

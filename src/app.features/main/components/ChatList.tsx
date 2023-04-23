import { useContext } from 'react';

import { ElButton } from '@/components';
import { ModalContext } from '@/layout/screen/ScreenLayout';

interface ChatListProps {
  roomName: string;
  index: number;
  _onClick: () => void;
}

const ChatList = ({ roomName, index, _onClick }: ChatListProps) => {
  const { openModal } = useContext(ModalContext);

  return (
    <div
      onClick={_onClick}
      className="flex items-center justify-between border-b-2 border-[#222222] px-30 py-25"
    >
      <h4 className="text-24 text-white">{roomName}</h4>
      <ElButton
        sx
        type="button"
        margin=""
        _onClick={(e) => {
          e.stopPropagation();
          openModal(String(index));
        }}
      >
        수정
      </ElButton>
    </div>
  );
};

export default ChatList;

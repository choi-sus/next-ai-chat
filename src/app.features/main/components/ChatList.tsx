import { useContext } from 'react';

import { ElButton } from '@/components';
import { ModalContext } from '@/layout/screen/ScreenLayout';

const ChatList = ({
  roomName,
  index,
  onClick,
}: {
  roomName: string;
  index: number;
  onClick: () => void;
}) => {
  const { openModal } = useContext(ModalContext);

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between border-b-2 border-[#222222] px-30 py-25"
    >
      <h4 className="text-24 text-[#fff]">{roomName}</h4>
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

import Close from 'public/images/icon-close.svg';
import { useContext } from 'react';

import { ModalContext } from '@/layout/screen/ScreenLayout';

import ChatListForm from './ChatListForm';

interface ModalProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  roomInfo: { roomName: string; peopleNum: string };
  onChangeRoomInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isModal: string;
  useAddRoom: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Modal = (props: ModalProps) => {
  const { closeModal } = useContext(ModalContext);

  return (
    <div
      className={`absolute flex h-full w-full justify-center  ${
        props.isModal === 'add'
          ? 'top-0 items-end bg-bgDefault'
          : 'top-[-80px] z-20 h-[100vh] items-center bg-bgInner'
      } `}
    >
      <div
        className={`${
          props.isModal === 'add' ? 'bottom-0' : 'bg-bgPaper px-30 py-30'
        } mx-30 w-full`}
      >
        {props.isModal !== 'add' && (
          <div className="flex justify-end">
            <Close onClick={closeModal} />
          </div>
        )}
        <ChatListForm {...props} />
      </div>
    </div>
  );
};

export default Modal;

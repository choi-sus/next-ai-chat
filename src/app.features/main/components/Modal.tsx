import Close from 'public/images/icon-close.svg';
import { useContext } from 'react';

import { ModalContext } from '@/layout/screen/ScreenLayout';

import ChatListForm from './ChatListForm';

interface ModalProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  roomName: string;
  onChangeRoomName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  peopleNum: string;
  onChangePeopleNum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createForm?: boolean;
  isModal: string;
  useAddRoom: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Modal = (props: ModalProps) => {
  const { closeModal } = useContext(ModalContext);

  return (
    <div
      className={`absolute top-0 h-full w-full ${
        props.isModal === 'add' ? 'bg-bgDefault' : 'bg-bgInner'
      }`}
    >
      <div
        className={`${
          props.isModal === 'add' ? 'bottom-0' : 'bg-bgPaper py-30'
        } absolute  px-30`}
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

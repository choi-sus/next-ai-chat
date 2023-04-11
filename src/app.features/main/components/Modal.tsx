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
  return (
    <div
      className={`${
        props.isModal === 'add' ? 'h-full' : 'absolute bg-bgInner'
      }`}
    >
      <div className={`${props.isModal === 'add' ? 'bottom-0' : ''} absolute`}>
        <ChatListForm {...props} />
      </div>
    </div>
  );
};

export default Modal;

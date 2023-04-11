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
      className={`absolute top-0 h-full w-full ${
        props.isModal === 'add' ? 'bg-bgDefault' : 'bg-bgInner'
      }`}
    >
      <div
        className={`${
          props.isModal === 'add' ? 'bottom-0 px-30' : ''
        } absolute`}
      >
        <ChatListForm {...props} />
      </div>
    </div>
  );
};

export default Modal;

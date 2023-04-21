import Close from 'public/images/icon-close.svg';
import { useContext } from 'react';

import { ModalContext } from '@/layout/screen/ScreenLayout';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isModal, closeModal } = useContext(ModalContext);

  if (!isModal) {
    return null;
  }

  return (
    <div
      className={`absolute  flex h-full w-full justify-center ${
        isModal === 'add' ? 'modal-bg-add' : 'modal-bg-edit'
      }`}
    >
      <article
        className={`mx-30 w-full ${
          isModal === 'add' ? 'modal-paper-add' : 'modal-paper-edit'
        }`}
      >
        {isModal !== 'add' && (
          <div className="flex justify-end">
            <Close onClick={closeModal} />
          </div>
        )}
        {children}
      </article>
    </div>
  );
};

export default Modal;

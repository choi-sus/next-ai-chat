'use client';

import { useContext } from 'react';

import { useNavigation } from '@/hooks';
import { HEADER_SVG_LIST } from '@/layout/modules/constants';
import { ModalContext } from '@/layout/screen/ScreenLayout';
import PAGES_HREF from '@/types/PageHref';

const Header = ({ pathname }: { pathname: string }) => {
  const nav = useNavigation();
  const { isModal, openModal, closeModal } = useContext(ModalContext);

  return (
    <header
      className={`${
        pathname === 'main' ? 'justify-start' : 'justify-between'
      } fixed top-0 z-10 flex w-full max-w-[768px] items-center bg-bgDefault px-30 py-25`}
    >
      <div onClick={() => nav.push(PAGES_HREF.MAIN)}>
        {HEADER_SVG_LIST[pathname][0]}
      </div>
      {HEADER_SVG_LIST[pathname][1] ? (
        <div
          onClick={() => {
            isModal ? closeModal() : openModal('add');
          }}
          className={`${isModal === 'add' && 'rotate-45 duration-100'}`}
        >
          {HEADER_SVG_LIST[pathname][1]}
        </div>
      ) : (
        <h2>타이틀</h2>
      )}
    </header>
  );
};

export default Header;

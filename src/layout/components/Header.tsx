'use client';

import { useContext } from 'react';

import { useNavigation } from '@/hooks';
import { HEADER_SVG_LIST } from '@/layout/modules/constants';
import { ModalContext } from '@/layout/screen/ScreenLayout';
import PAGES_HREF from '@/types/PageHref';

import { useGetRoomName } from '../hooks';

const Header = () => {
  const nav = useNavigation();

  const { isModal, openModal, closeModal } = useContext(ModalContext);

  const path = nav.path().split('/');

  const roomName = useGetRoomName(path);

  return (
    <header
      className={`${
        path[1] === 'main' ? 'justify-between' : 'justify-start'
      } fixed top-0 z-10 flex items-center bg-bgDefault px-30 py-25`}
    >
      <div onClick={() => nav.push(PAGES_HREF.MAIN)}>
        {HEADER_SVG_LIST[path[1]][0]}
      </div>
      {HEADER_SVG_LIST[path[1]][1] ? (
        <div
          onClick={() => {
            isModal ? closeModal() : openModal('add');
          }}
          className={`${isModal === 'add' && 'rotate-45 duration-100'}`}
        >
          {HEADER_SVG_LIST[path[1]][1]}
        </div>
      ) : (
        <h2 className="ml-20 text-24 leading-29 text-white">{roomName}</h2>
      )}
    </header>
  );
};

export default Header;

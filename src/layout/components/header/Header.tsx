'use client';

import { useContext } from 'react';

import { useNavigation } from '@/hooks';
import { SVG_COMPONENT_LIST } from '@/layout/modules/constants';
import { ModalContext } from '@/layout/screen/ScreenLayout';
import PAGES_HREF from '@/types/PageHref';

const Header = ({ pathname }: { pathname: string }) => {
  const nav = useNavigation();
  const { openModal } = useContext(ModalContext);

  return (
    <header
      className={`${
        pathname === 'main' ? 'justify-start' : 'justify-between'
      } fixed top-0 z-10 flex w-full items-center bg-bgDefault px-30 py-25`}
    >
      <div onClick={() => nav.push(PAGES_HREF.MAIN)}>
        {SVG_COMPONENT_LIST[pathname][0]}
      </div>

      {SVG_COMPONENT_LIST[pathname][1] ? (
        <div onClick={() => openModal('add')}>
          {SVG_COMPONENT_LIST[pathname][1]}
        </div>
      ) : (
        <h2>타이틀</h2>
      )}
    </header>
  );
};

export default Header;

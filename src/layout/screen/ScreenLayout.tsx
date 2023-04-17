'use client';
import { RequestCookie } from 'next/dist/server/web/spec-extension/cookies';
import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

import { useNavigation } from '@/hooks';
import PAGES_HREF from '@/types/PageHref';

import { Container, Header } from '../components';

export const ModalContext = createContext({
  isModal: '',
  openModal: (value: string) => {},
  closeModal: () => {},
});

const ScreenLayout = ({
  children,
  apiKey,
}: {
  children: React.ReactNode;
  apiKey?: RequestCookie;
}) => {
  const nav = useNavigation();

  useLayoutEffect(() => {
    if (!apiKey) {
      return nav.push(PAGES_HREF.LOGIN);
    }
  }, []);

  const [isModal, setIsModal] = useState<string>('');

  const openModal = useCallback((value: string) => {
    setIsModal(value);
  }, []);

  const closeModal = useCallback(() => {
    setIsModal('');
  }, []);

  return (
    <React.Fragment>
      <ModalContext.Provider value={{ isModal, openModal, closeModal }}>
        {nav.path() !== '/' && <Header pathname={nav.path()} />}
        <Container>{children}</Container>
      </ModalContext.Provider>
    </React.Fragment>
  );
};

export default ScreenLayout;

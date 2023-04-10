'use client';

import React, { createContext, useCallback, useState } from 'react';

import { useNavigation } from '@/hooks';

import { Container, Header } from '../components';

export const ModalContext = createContext({
  isModal: false,
  openModal: () => {},
  closeModal: () => {},
});

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigation();

  const [isModal, setIsModal] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModal(false);
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

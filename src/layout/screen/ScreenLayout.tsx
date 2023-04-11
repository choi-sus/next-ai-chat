'use client';

import React, { createContext, useCallback, useState } from 'react';

import { useNavigation } from '@/hooks';

import { Container, Header } from '../components';

export const ModalContext = createContext({
  isModal: '',
  openModal: (value: string) => {},
  closeModal: () => {},
});

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigation();

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

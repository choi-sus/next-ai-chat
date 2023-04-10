'use client';

import React, { createContext, useCallback, useMemo, useState } from 'react';

import { useNavigation } from '@/hooks';

import { Container, Header } from '../components';

export const ModalContext = createContext({
  isModal: false,
  openModal: () => {},
  closeModal: () => {},
});

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const value = useMemo(
    () => ({
      isModal,
      openModal,
      closeModal,
    }),
    [isModal],
  );

  const nav = useNavigation();

  return (
    <React.Fragment>
      <ModalContext.Provider value={value}>
        {nav.path() !== '/' && <Header pathname={nav.path()} />}
        <Container>{children}</Container>
      </ModalContext.Provider>
    </React.Fragment>
  );
};

export default ScreenLayout;

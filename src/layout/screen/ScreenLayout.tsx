'use client';

import React, { createContext, useCallback, useState } from 'react';

import { useNavigation } from '@/hooks';

import { Container, Header } from '../components';

interface ModalContextType {
  isModal: string;
  openModal: (value: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isModal: '',
  openModal: () => {},
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
    <ModalContext.Provider value={{ isModal, openModal, closeModal }}>
      {nav.path() !== '/' && <Header />}
      <Container>{children}</Container>
    </ModalContext.Provider>
  );
};

export default ScreenLayout;

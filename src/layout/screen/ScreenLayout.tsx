'use client';

import React from 'react';

import { useNavigation } from '@/hooks';

import { Container, Header } from '../components';

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigation();

  return (
    <React.Fragment>
      {nav.path() !== '/' && <Header pathname={nav.path()} />}
      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default ScreenLayout;

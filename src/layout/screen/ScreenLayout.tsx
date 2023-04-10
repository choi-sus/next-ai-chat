'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { Container, Header } from '../components';

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      {pathname !== '/' && <Header pathname={pathname} />}
      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default ScreenLayout;

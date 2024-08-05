import { Container } from '@mantine/core';
import React from 'react';
import DraftMode from '~/app/(root)/_components/draftMode';
import Footer from '~/app/(root)/_components/footer';
import Header from '~/app/(root)/_components/header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <Container>
      <Header />

      {children}

      <DraftMode />
      <Footer />
    </Container>
  );
}

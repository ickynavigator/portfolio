import '@mantine/code-highlight/styles.css';

import React from 'react';
import Footer from '~/app/(root)/_components/footer';
import Header from '~/app/(root)/_components/header';
import DraftMode from '~/components/draftMode';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <Header />

      {children}

      <DraftMode />
      <Footer />
    </>
  );
}
